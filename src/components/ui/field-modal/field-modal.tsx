import React, { FC, useCallback } from 'react'

import { Button, ButtonGroup, FormLayout, InputGroup, InputWrap } from '@reapit/elements'

import { useForm } from 'react-hook-form'
import { AddedFieldType } from '../home-page/form-builder'

const setDefaultFieldValue = (value: AddedFieldType) => ({
  name: value.options.name,
})

type FieldModalContentProps = {
  onSubmitForm: (currentField: AddedFieldType) => void
} & AddedFieldType

const FieldModalContent: FC<FieldModalContentProps> = (props) => {
  const { onSubmitForm } = props

  const { register, getValues } = useForm({
    defaultValues: setDefaultFieldValue({ id: props.id, options: props.options }),
  })

  const onSubmitHandler = useCallback(() => {
    onSubmitForm({
      id: props.id,
      options: {
        ...props.options,
        ...(getValues() as AddedFieldType['options']),
      },
    })
  }, [])

  return (
    <>
      <FormLayout>
        <InputWrap>
          <InputGroup type="text" label="Field Name" {...register('name')} />
        </InputWrap>
      </FormLayout>
      <ButtonGroup alignment="right" className="el-mt4">
        <Button intent="primary" type="submit" onClick={onSubmitHandler}>
          Save
        </Button>
      </ButtonGroup>
    </>
  )
}

export default FieldModalContent
