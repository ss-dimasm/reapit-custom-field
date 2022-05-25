import React, { FC, useState } from 'react'
import { Title, PageContainer, FlexContainer, BodyText } from '@reapit/elements'
import TextField from '../ui/draggable-fields/text-field/text-field'

export const HomePage: FC = () => {
  const [droppedField, setDroppedField] = useState<any>([])

  const drop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    console.log('onDrop', ev)
    const data = ev.dataTransfer.getData('text')
    console.log('dataTransfer', data)
    setDroppedField((prev: any) => [...prev, document.getElementById(data)])
  }

  console.log(droppedField)
  return (
    <PageContainer>
      <Title>Form Builder</Title>
      <FlexContainer isFlexJustifyBetween>
        <div style={{ width: 'auto' }}>
          <BodyText>Drop Zone</BodyText>
          <div
            style={{ backgroundColor: 'red', width: '100%', height: '500px' }}
            onDrop={drop}
            onDragOver={(e) => e.preventDefault()}
          ></div>
        </div>
        <div style={{ minWidth: '400px' }}>
          <BodyText>Available Field</BodyText>
          <TextField />
        </div>
      </FlexContainer>
    </PageContainer>
  )
}

export default HomePage
