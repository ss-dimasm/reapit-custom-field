import React, { FC, useCallback } from 'react'

import { Button, ButtonGroup, FormLayout, InputWrapFull, Subtitle } from '@reapit/elements'
import { SavedFormTypeOnLocalStorage } from './form-modal'
import useLocalStorageReactLifeCycle from '../../../hooks/use-local-storage-react-lifecycle'

type DashboardFormContentProps = {
  selectedForm: SavedFormTypeOnLocalStorage
  closeFormModal: () => void
}

const DashboardFormContent: FC<DashboardFormContentProps> = ({ selectedForm, closeFormModal }) => {
  const [prev, changeMyCustomFormVal] = useLocalStorageReactLifeCycle<typeof selectedForm[]>({ key: 'my-custom-form' })

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, type: 'Yes' | 'No') => {
    e.preventDefault()
    if (type === 'Yes') {
      const removedCandidate = prev!.filter((field) => field?.id !== selectedForm?.id)
      if (removedCandidate) {
        changeMyCustomFormVal(removedCandidate)
      }
    } else {
      console.log('forget it')
    }

    closeFormModal()
  }, [])

  console.log('should rerender', prev)
  return (
    <>
      <form>
        <FormLayout>
          <InputWrapFull>
            <Subtitle hasCenteredText>
              Want to delete <span className="el-subtitle el-has-bold-text ">{selectedForm?.name}</span> form?
            </Subtitle>
          </InputWrapFull>
          <InputWrapFull>
            <ButtonGroup alignment="right">
              <Button intent="low" onClick={(e) => handleClick(e, 'No')}>
                No
              </Button>
              <Button intent="danger" onClick={(e) => handleClick(e, 'Yes')}>
                Yes
              </Button>
            </ButtonGroup>
          </InputWrapFull>
        </FormLayout>
      </form>
    </>
  )
}

export default DashboardFormContent
