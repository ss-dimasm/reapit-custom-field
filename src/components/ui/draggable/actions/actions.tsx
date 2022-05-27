import { FlexContainer } from '@reapit/elements'
import React, { FC } from 'react'
import { useDrag } from 'react-dnd'
import fieldIcon from '../icons'
import { textWrapper, wrapper } from './__styles__'

export type AVAILABLE_ACTION_TYPES = 'submit-action'

export type ActionsTypeProps = {
  id: AVAILABLE_ACTION_TYPES
  name: string
  fieldType: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  category: 'action'
}

const Actions: FC<ActionsTypeProps> = ({ id, name, fieldType, category }) => {
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

export default Actions
