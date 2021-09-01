/**
 * Component for uploading a file using Filestack Picker
 * and Drag + Drop.  Does not store the file contents in form.  Instead,
 * uploads file to S3 storage container and returns the S3 storage details
 */

import _ from 'lodash'
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { client as filestack } from 'filestack-react'
import { FILESTACK } from '../../../config/constants'
import styles from './FilestackFilepicker.module.scss'

class FilestackFilePicker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      dragged: false,
      fileName: '',
      uploadProgress: null
    }
    this.updateUploadProgress = this.updateUploadProgress.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.generateFilePath = this.generateFilePath.bind(this)
    this.onClickOrKeyPress = this.onClickOrKeyPress.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  componentDidMount () {
    this.filestack = filestack.init(FILESTACK.API_KEY)
  }

  updateUploadProgress (uploadProgress) {
    this.setState({ uploadProgress })
  }

  // Called when file is successfully stored in S3 container
  onSuccess (file, filePath) {
    const {
      filename,
      container,
      source,
      originalPath
    } = file

    // Dragging and dropping does not seem to reveal the name of the container
    const cont = container || FILESTACK.SUBMISSION_CONTAINER

    // In case a url was used, we need to pass the url as is, instead of the s3 url
    const fileUrl = source === 'url' ? originalPath : `https://s3.amazonaws.com/${cont}/${filePath}`

    this.setState({ fileName: filename, uploadProgress: null })

    this.props.onUploadSuccess(fileUrl)
  }

  // Prepare the file name
  generateFilePath () {
    const { userId, challengeId } = this.props
    return `${challengeId}-${userId}-SUBMISSION_ZIP-${Date.now()}.zip`
  }

  // Show FileStack picker modal when user clicks or navigates through keyboard
  onClickOrKeyPress () {
    const { fileExtensions, onError } = this.props
    const path = this.generateFilePath()

    this.filestack.picker({
      accept: fileExtensions,
      fromSources: [
        'local_file_system',
        'googledrive',
        'dropbox',
        'onedrive',
        'github',
        'url'
      ],
      maxSize: 500 * 1024 * 1024,
      onFileUploadFailed: () => this.setState({ dragged: false }),
      onFileUploadFinished: (file) => {
        this.setState({ dragged: false })
        this.onSuccess(file, path)
        // Reset any old errors
        onError('')
      },
      startUploadingWhenMaxFilesReached: true,
      storeTo: {
        container: FILESTACK.SUBMISSION_CONTAINER,
        path,
        region: FILESTACK.REGION
      }
    }).open()
  }

  // Upload the file to S3
  onDrop (e) {
    e.preventDefault()
    this.setState({ dragged: false })

    const path = this.generateFilePath()
    const filename = e.dataTransfer.files[0].name
    const { fileExtensions, onError } = this.props

    if (!fileExtensions.some(ext => filename.endsWith(ext))) {
      return onError(`Wrong file type! Only files with extension(s) ${fileExtensions.join(', ')} are supported`)
    }

    // Reset any previous errors
    onError('')

    this.setState({ fileName: e.dataTransfer.files[0].name })

    this.setState({ uploadProgress: 0 })

    this.filestack
      .upload(e.dataTransfer.files[0], {
        onProgress: ({ totalPercent }) => {
          this.setState({ uploadProgress: totalPercent })
        },
        progressInterval: 1000
      }, {
        container: FILESTACK.SUBMISSION_CONTAINER,
        path,
        region: FILESTACK.REGION
      })
      .then(file => this.onSuccess(file, path), () => {
        this.props.onError('An error occurred uploading your submission. Please try again. If problem persists, contact support')
      })
  }

  render () {
    const {
      fileExtensions,
      title,
      mandatory,
      error
    } = this.props

    const {
      dragged,
      fileName,
      uploadProgress
    } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.desc}>
          <p>
            {title}
          </p>
          {
            mandatory && (
              <p className={styles.mandatory}>
                *mandatory
              </p>
            )
          }
        </div>
        <div
          className={cn(styles.filePicker, { [styles.error]: error, [styles.drag]: dragged })}
        >
          {
            !fileName && (
              <>
                <p>
                  Drag and drop your
                  {fileExtensions.join(' or ')}
                  {' '}
                  file here.
                </p>
                <span>
                  or
                </span>
              </>
            )
          }
          {
            fileName && (
              <p className={styles.fileName}>
                {fileName}
              </p>
            )
          }
          {
            _.isNumber(uploadProgress) && uploadProgress < 100 ? (
              <p className={styles.fileName}>
                Uploading:
                {uploadProgress}
                %
              </p>
            ) : null
          }
          <button className={styles.primaryButton}>Pick a File</button>
          <div
            className={styles.dropZoneMask}
            onClick={this.onClickOrKeyPress}
            onKeyPress={this.onClickOrKeyPress}
            onDragEnter={() => this.setState({ dragged: true })}
            onDragLeave={() => this.setState({ dragged: false })}
            onDragOver={e => e.preventDefault()}
            onDrop={this.onDrop}
          />
        </div>
        {
          error && (
            <div className={styles.errorContainer}>
              {error}
            </div>
          )
        }
      </div>
    )
  }
}

FilestackFilePicker.defaultProps = {
  error: '',
  mandatory: true
}

FilestackFilePicker.propTypes = {
  mandatory: PropTypes.bool,
  title: PropTypes.string.isRequired,
  fileExtensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  challengeId: PropTypes.string.isRequired,
  error: PropTypes.string,
  onError: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func.isRequired
}

export default FilestackFilePicker
