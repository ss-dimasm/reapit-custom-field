import { css } from '@linaria/core'

export const wrapper = css`
  background-color: var(--color-grey-light);
  border-radius: 5px;
  width: 100%;
  height: 35px;
  margin: 5px 0;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 10px;
  &:hover {
    cursor: pointer;
    background-color: var(--color-grey-medium);
  }
  &:active {
    cursor: grabbing;
    background-color: var(--color-grey-dark);
  }
`

export const textWrapper = css`
  text-align: center;
`
