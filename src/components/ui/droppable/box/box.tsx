import React, { CSSProperties, FC } from 'react'
import { useDrop } from 'react-dnd'
import { generateRandomId } from '../../../../utils/generate'
import DroppedFields from '../fields/dropped-fields'
import { ACCEPT_TYPE } from '..'
import fieldIcon from '../../draggable/icons'
import { AddedFieldType } from '../../../pages/home-page'

const style: CSSProperties = {
  height: '80vh',
  padding: '1rem',
  width: '95%',
  color: 'black',
  border: '1px solid red',
  position: 'relative',
}

type DroppableBoxProps = {
  addedField: AddedFieldType[]
  setAddedField: React.Dispatch<React.SetStateAction<AddedFieldType[]>>
}

const DroppableBox: FC<DroppableBoxProps> = ({ addedField, setAddedField }) => {
  const [, drop] = useDrop(() => ({
    accept: ACCEPT_TYPE,
    drop: (item: AddedFieldType) => {
      // set new object
      const itemResult: AddedFieldType = {
        ...item,
        id: generateRandomId({ text: item.id, length: 8 }, '-'),
        options: {
          ...item.options,
          type: item.id as AddedFieldType['options']['type'],
          icon: fieldIcon(item.id as AddedFieldType['options']['type']),
        },
      }
      setAddedField((prevState) => [...prevState, itemResult])
      return itemResult
    },
  }))

  return (
    <div ref={drop} style={{ ...style }}>
      {addedField.map((field) => (
        <DroppedFields key={field.id} {...field} />
      ))}
    </div>
  )
}

export default DroppableBox
