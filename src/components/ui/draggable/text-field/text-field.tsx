import React, { FC } from 'react'

import { useDrag } from 'react-dnd'

import { FlexContainer } from '@reapit/elements'
import { textWrapper, wrapper } from './__styles__'
import fieldIcon from '../icons'

export type AVAILABLE_FIELD_TYPES =
  | 'short-field'
  | 'long-field'
  | 'checkbox-field'
  | 'date-field'
  | 'time-field'
  | 'number-field'

export type TextFieldProps = {
  id: AVAILABLE_FIELD_TYPES
  name: string
  fieldType: React.HTMLInputTypeAttribute
  category: 'field'
}

const TextField: FC<TextFieldProps> = ({ id, name, fieldType, category }) => {
  const [, drag] = useDrag(() => ({
    type: category,
    item: {
      id,
      options: {
        name,
        fieldType,
        category,
      },
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  return (
    <div className={wrapper} ref={drag}>
      <FlexContainer isFlexAlignCenter>{fieldIcon(id)}</FlexContainer>
      <div className="el-ml4">
        <h1 className={textWrapper}>{name}</h1>
      </div>
    </div>
  )
}

export default TextField
