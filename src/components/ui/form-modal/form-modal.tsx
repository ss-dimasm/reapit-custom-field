import React, { FC, useCallback } from 'react'

import { Button, ButtonGroup, FormLayout, InputGroup, InputWrapFull, useSnack } from '@reapit/elements'
import { useForm } from 'react-hook-form'

import { AddedFieldType, ForwardRefFormBuilderProps } from '../home-page/form-builder'
import { useLocalStorage } from 'react-use'
import { generateRandomId } from '../../../utils/generate'
import dayjs from 'dayjs'

type FormModalContentProps = {
  formBuilderRef: ForwardRefFormBuilderProps
  closeFormModal: () => void
}

export type SavedFormTypeOnLocalStorage = {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  fields: AddedFieldType[]
}

// save to localStorage
const FormModalContent: FC<FormModalContentProps> = ({ formBuilderRef: { addedFieldState }, closeFormModal }) => {
  const { register, getValues, setValue } = useForm()

  const { success, error } = useSnack()

  const [localStorageVal, setLocalStorageVal] = useLocalStorage<SavedFormTypeOnLocalStorage[]>('my-custom-form', [])

  const onSubmitForm = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    // add fields into this hook
    setValue(
      'fields',
      addedFieldState.map((field) => field),
    )

    // set ID
    setValue('id', generateRandomId({ text: getValues('name'), length: 10 }, '-'))
    setValue('createdAt', dayjs().toJSON())
    setValue('updatedAt', dayjs().toJSON())

    const index = localStorageVal?.findIndex((single) => single.name === getValues('name'))
    if (index === -1) {
      setLocalStorageVal((prev: any) => {
        if (prev) {
          return [...prev, getValues() as SavedFormTypeOnLocalStorage]
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
