import React, { FC, useCallback } from 'react'

import { Button, ButtonGroup, FormLayout, InputGroup, InputWrapFull, useSnack } from '@reapit/elements'
import { useForm } from 'react-hook-form'

import { AddedFieldType } from '../home-page/form-builder'
import { useLocalStorage } from 'react-use'

type FormModalContentProps = {
  addedField: AddedFieldType[]
  closeFormModal: () => void
}

type SavedFormTypeOnLocalStorage = {
  name: string
  fields: AddedFieldType[]
}
// save to localStorage
const FormModalContent: FC<FormModalContentProps> = ({ addedField, closeFormModal }) => {
  const { register, getValues, setValue } = useForm()

  const { success, error } = useSnack()

  const [localStorageVal, setLocalStorageVal] = useLocalStorage<SavedFormTypeOnLocalStorage[]>('my-custom-form', [])

  // TODO: write to localStorage in here
  const onSubmitForm = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setValue(
      'fields',
      addedField.map((field) => field),
    )
    const index = localStorageVal?.findIndex((single) => single.name === getValues('name'))
    if (index === -1) {
      setLocalStorageVal((prev: any) => {
        if (prev) {
          return [...prev, getValues()]
        }
        return [prev]
      })
      success('Success saved custom from data', 5000)
    } else {
      error('You already register another custom form with this name, try to change the custom form name', 5000)
    }
    closeFormModal()
  }, [])

  return (
    <>
      <form>
        <FormLayout>
          <InputWrapFull>
            <InputGroup type="text" {...register('name')} label="Form name" icon="editSolidSystem" />
          </InputWrapFull>
          <InputWrapFull>
            <ButtonGroup alignment="right" className="el-mt6">
              <Button type="submit" intent="primary" onClick={onSubmitForm}>
                Save Form
              </Button>
            </ButtonGroup>
          </InputWrapFull>
        </FormLayout>
      </form>
    </>
  )
}

export default FormModalContent
