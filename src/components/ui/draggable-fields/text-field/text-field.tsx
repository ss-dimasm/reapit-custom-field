import React from 'react'

import { css } from '@linaria/core'

const wrapper = css`
  background-color: var(--color-grey-light);
  border-radius: 5px;
  width: 100%;
  height: 35px;
  &:hover {
    cursor: pointer;
  }
  &:active {
    cursor: grabbing;
  }
`

const TextField = () => {
  const dragStart = (ev: any) => {
    console.log('dragStart', ev)
    ev.dataTransfer.setData('text', ev)
  }

  return <div className={wrapper} draggable={true} id="here" onDragStart={dragStart} />
}

export default TextField
