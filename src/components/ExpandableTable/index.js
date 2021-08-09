/**
 * Component to render a styled table
 */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import chevronDown from '../../assets/icons/chevron-down.svg'
import chevronUp from '../../assets/icons/chevron-up.svg'
import styles from './ExpandableTable.module.scss'

const ExpandableTable = (props) => {
  const { headerToggle, headerOptions, onToggle, rows, className } = props

  return headerOptions.map((options, index) => {
    const headers = options.map((o, i) => {
      return (
        <th
          style={{ flex: o.width || 0 }}
          key={`th-${o.name}`}
          onClick={() => onToggle(index)}
        >
          {i === 0
            ? <img
              src={headerToggle[index] ? chevronUp : chevronDown}
              className={styles.icon}
            />
            : null}
          {o.name}
        </th>
      )
    })

    return (
      <table id='expandableTable' className={cn(className)} key={uuidv4()}>
        <thead className={styles.expandable}>
          <ExpandableTable.Row>{headers}</ExpandableTable.Row>
        </thead>
        {
          headerToggle[index] &&
          <tbody className={styles.expandable}>{rows[index]}</tbody>
        }
      </table>
    )
  })
}

ExpandableTable.defaultProps = {
  headerOptions: []
}

ExpandableTable.propTypes = {
  headerOptions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired,
  rows: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string
}

ExpandableTable.Row = (props) => {
  return (
    <tr
      className={styles.expandable}
      key={uuidv4()}
      onClick={props.onClick}
      {...props}
    >
      {props.children}
    </tr>
  )
}

ExpandableTable.Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
}

ExpandableTable.Col = (props) => {
  return (
    <td
      key={uuidv4()}
      className={cn(styles.expandable, { [styles.extra]: props.extra, [styles.viewMode]: props.viewMode })}
      style={{ flex: props.width || 0 }}
      {...props}
    >
      {props.children}
    </td>
  )
}

ExpandableTable.Col.propTypes = {
  children: PropTypes.node,
  width: PropTypes.number
}

export default ExpandableTable
