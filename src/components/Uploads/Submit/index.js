/* global FormData */

/**
 * Wrapper component that holds the Filestack File picker and the Upload indicator
 */

import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import FilestackFilePicker from '../FilestackFilePicker'
import Uploading from '../Uploading'
import { TOPCODER_TERMS } from '../../../config/constants'
import styles from './Submit.module.scss'
import { uploadSubmission as createSubmission } from '../../../services/submissions'

class Submit extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      fileUrl: '',
      filestackErrorMsg: '',
      topcoderErrorMsg: '',
      uploadProgress: null, // has to be a value b/w 0 and 1
      agreed: false,
      isSubmitting: false,
      submissionUploaded: false
    }

    this.getFormData = this.getFormData.bind(this)
    this.reset = this.reset.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.uploadSubmission = this.uploadSubmission.bind(this)
    this.onUploadSuccess = this.onUploadSuccess.bind(this)
  }

  getFormData () {
    const {
      challengeId,
      userId,
      submissionType
    } = this.props

    const formData = new FormData()
    formData.append('url', this.state.fileUrl)
    formData.append('type', submissionType)
    formData.append('memberId', userId)
    formData.append('challengeId', challengeId)
    return formData
  }

  // Set to initial state
  reset () {
    this.setState({
      fileUrl: '',
      filestackErrorMsg: '',
      topcoderErrorMsg: '',
      uploadProgress: null,
      agreed: false,
      isSubmitting: false,
      submissionUploaded: false
    })
  }

  // Upload the submission to Topcoder
  handleSubmit (e) {
    e.preventDefault()
    this.uploadSubmission()
  }

  async uploadSubmission () {
    this.setState({
      topcoderErrorMsg: '',
      uploadProgress: 0,
      isSubmitting: true,
      submissionUploaded: false
    })

    try {
      await createSubmission(this.getFormData())

      this.setState({ uploadProgress: 1 })

      // To give the upload complete effect
      setTimeout(() => {
        this.setState({
          isSubmitting: false,
          submissionUploaded: true
        })
      }, 1000)
    } catch (err) {
      let message

      if (err.response) {
        message = `Server responded with status ${err.response.status} and data ${JSON.stringify(err.response.data)}`
      } else if (err.request) {
        message = `Request failed with status ${err.request.status}`
      } else {
        message = err.message
      }

      this.setState({
        isSubmitting: false,
        topcoderErrorMsg: message
      })
    }
  }

  // Called by filestack file picker module - store the url to which the file was uploaded to
  onUploadSuccess (fileUrl) {
    this.setState({ fileUrl })
  }

  render () {
    const {
      userId,
      challengeId
    } = this.props

    const {
      filestackErrorMsg,
      topcoderErrorMsg,
      uploadProgress,
      agreed,
      fileUrl,
      isSubmitting,
      submissionUploaded
    } = this.state

    return (
      (!isSubmitting && !submissionUploaded && !topcoderErrorMsg) ? (
        <div className={styles.designContent}>
          <form
            method='POST'
            name='submitForm'
            encType='multipart/form-data'
            id='submit-form'
            onSubmit={this.handleSubmit}
          >
            <div className={styles.row}>
              <div className={styles.left}>
                <h2>FILES</h2>
                <p>
                  Please follow the instructions on the Challenge Details page regarding
                  what your submission should contain and how it should be organized.
                </p>
              </div>
              <div className={styles.right}>
                <div className={styles.submissionHints}>
                  <div>
                    <ol>
                      <li>Place your submission files into a &quot;Submission.zip&quot; file.</li>
                      <li>Place all of your source files into a &quot;Source.zip&quot; file.</li>
                      <li>Create a JPG preview file.</li>
                      <li>
                        Create a declaration.txt file. Document fonts, stock art
                        and icons used.
                      </li>
                      <li>
                        Zip the 4 files from the previous steps
                        into a single zip file and upload below.
                      </li>
                    </ol>
                    <p>For detailed information on packaging your submission, please visit the
                      &zwnj;<a href='https://help.topcoder.com/hc/en-us/articles/219122667-Formatting-Your-Submission-for-Design-Challenges' target='_blank' rel='noopener noreferrer'>help center.</a>
                    </p>
                  </div>
                </div>
                <div className={styles.filePickerContainer}>
                  <FilestackFilePicker
                    title='Submission Upload'
                    fileExtensions={['.zip']}
                    challengeId={challengeId}
                    error={filestackErrorMsg}
                    onError={(msg) => this.setState({ filestackErrorMsg: msg })}
                    userId={userId}
                    onUploadSuccess={this.onUploadSuccess}
                  />
                </div>
                <p>
                  If you are having trouble uploading your file, please send
                  your submission to
                  &zwnj;
                  <a
                    href='mailto://support@topcoder.com'
                  >
                    support@topcoder.com
                  </a>
                </p>
              </div>
            </div>
            <div className={cn(styles.row, styles.agree)}>
              <p>
                Submitting your files means you hereby agree to the
                &zwnj;
                <a
                  href={TOPCODER_TERMS}
                  rel='noreferrer noopener'
                  target='_blank'
                >
                  Topcoder terms of use
                </a>
                &zwnj;
                and to the extent your uploaded file wins a topcoder Competition,
                you hereby assign, grant and transfer and agree to assign, grant and
                transfer to topcoder all right and title in and to the Winning Submission
                (as further described in the terms of use).
              </p>
              <div className={styles.tcCheckbox}>
                <input
                  type='checkbox'
                  id='agree'
                  aria-label='I understand and agree'
                  onChange={e => this.setState({ agreed: e.target.checked })}
                  checked={agreed}
                />
                <label htmlFor='agree'>
                  <input type='hidden' />
                </label>
                <div
                  className={styles.tcCheckboxLabel}
                  onClick={e => this.setState(prevState => ({ agreed: prevState.agreed }))}
                >
                  I UNDERSTAND AND AGREE
                </div>
              </div>
              <button
                type='submit'
                disabled={!agreed || !!filestackErrorMsg || !fileUrl}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )
        : (
          <Uploading
            error={topcoderErrorMsg}
            isSubmitting={isSubmitting}
            submissionUploaded={submissionUploaded}
            reset={this.reset}
            retry={this.uploadSubmission}
            uploadProgress={uploadProgress}
          />
        )
    )
  }
}

Submit.propTypes = {
  userId: PropTypes.string.isRequired,
  challengeId: PropTypes.string.isRequired,
  submissionType: PropTypes.string.isRequired
}

export default Submit
