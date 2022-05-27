import React from 'react'

import { Icon } from '@reapit/elements'
import { MdShortText, MdOutlineAccessTime, MdCheckBox, MdOutlineSmartButton } from 'react-icons/md'
import { BsTextLeft } from 'react-icons/bs'

import { AVAILABLE_ACTION_TYPES } from '../actions'
import { AVAILABLE_FIELD_TYPES } from '../text-field'

type FieldIconType = AVAILABLE_ACTION_TYPES | AVAILABLE_FIELD_TYPES

const fieldIcon = (type: FieldIconType) => {
  const ICONS: {
    [val in FieldIconType]: JSX.Element
  } = {
    'submit-action': (
      <span className="el-input-group el-icon">
        <MdOutlineSmartButton />
      </span>
    ),
    'time-field': (
      <span className="el-icon">
        <MdOutlineAccessTime />
      </span>
    ),
    'short-field': (
      <span className="el-icon">
        <MdShortText />
      </span>
    ),
    'long-field': (
      <span className="el-icon">
        <BsTextLeft />
      </span>
    ),
    'date-field': <Icon icon="calendarSystem" />,
    'number-field': <Icon icon="phoneSystem" />,
    'checkbox-field': (
      <span className="el-icon">
        <MdCheckBox />
      </span>
    ),
  }
  return ICONS[type]
}
export default fieldIcon
