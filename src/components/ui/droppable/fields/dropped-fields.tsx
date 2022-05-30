import React, { useCallback, useRef } from 'react'

import type { Identifier, XYCoord } from 'dnd-core'

import { Button, Icon, Input, InputGroup, InputWrap, Label } from '@reapit/elements'
import { useFieldContext } from '../../../../context/field-context'
import { AddedFieldType } from '../../home-page/form-builder'
import { useDrag, useDrop } from 'react-dnd'

interface DragItem {
  index: number
  id: string
  type: string
}

interface DragItem {
  index: number
  id: string
  type: string
}

type DroppedFieldsProps = {
  index: number
  moveCard?: (dragIndex: number, hoverIndex: number) => void
} & AddedFieldType

const DroppedFields: React.FC<DroppedFieldsProps> = (props) => {
  const {
    id,
    options: { name, fieldType, icon, category },
  } = props

  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // useDrop
  const [, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'single-card',
    collect: (monitor) => {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover: (item: DragItem, monitor) => {
      if (!wrapperRef.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = props.index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = wrapperRef.current?.getBoundingClientRect()

      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      reorderAddedFieldIndex(dragIndex, hoverIndex)

      item.index = hoverIndex
    },
  })

  const [, drag] = useDrag({
    type: 'single-card',
    item: () => {
      return { id, index: props.index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const { openFieldModal, setCurrentFieldState, reorderAddedFieldIndex, currentFieldState } = useFieldContext()

  const setContextModal = useCallback(() => {
    openFieldModal && openFieldModal()
    setCurrentFieldState && setCurrentFieldState(props)
  }, [])

  const renderFields = useCallback(
    (category: AddedFieldType['options']['category']) => {
      if (category === 'field') {
        return (
          <>
            <div style={{ position: 'relative', width: '98%' }}>
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#ffffff00',
                  zIndex: 10,
                }}
              />
              <InputGroup>
                <Input id={id} type={fieldType} placeholder="here" />
                {icon}
                <Label htmlFor={id}>{name}</Label>
              </InputGroup>
            </div>
          </>
        )
      }

      return <Button type={fieldType}>{name}</Button>
    },
    [currentFieldState],
  )

  drag(drop(wrapperRef))

  return (
    <div ref={wrapperRef} style={{ position: 'relative', userSelect: 'none' }} onClick={setContextModal}>
      <InputWrap>{renderFields(category)}</InputWrap>
      <div style={{ position: 'absolute', top: '50%', right: '0' }}>
        <Icon icon="moreSystem" />
      </div>
    </div>
  )
}

export default DroppedFields
