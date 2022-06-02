import React, { FC, useCallback } from 'react'

import { BodyText, Button, FormLayout, Input, InputGroup, InputWrapFull, Label } from '@reapit/elements'
import { SavedFormTypeOnLocalStorage } from '../form-modal/form-modal'
import dayjs from 'dayjs'

type FormPreviewPageProps = {
  form: SavedFormTypeOnLocalStorage
}

const FormPreviewPage: FC<FormPreviewPageProps> = ({ form }) => {
  return (
    <>
      <div>
        <BodyText hasBoldText>Name: {form.name}</BodyText>
        <BodyText hasBoldText>Created: {dayjs(form.createdAt).format('DD/MM/YYYY')}</BodyText>
        <BodyText hasBoldText>Updated: {dayjs(form.updatedAt).format('DD/MM/YYYY')}</BodyText>
      </div>
      <FormLayout>
        {form.fields.map((field) => (
          <InputWrapFull key={field.id}>
            <RenderedFields {...field} />
          </InputWrapFull>
        ))}
      </FormLayout>
    </>
  )
}

type RenderedFieldsProps = {} & SavedFormTypeOnLocalStorage['fields'][0]

const RenderedFields: FC<RenderedFieldsProps> = ({ id, options: { fieldType, name, category } }) => {
  const renderFields = useCallback((category: SavedFormTypeOnLocalStorage['fields'][0]['options']['category']) => {
    if (category === 'field') {
      return (
        <>
          <div style={{ position: 'relative', width: '98%' }}>
            <InputGroup>
              <Input id={id} type={fieldType} placeholder="here" />
              {/* {icon} */}
              <Label htmlFor={id}>{name}</Label>
            </InputGroup>
          </div>
        </>
      )
    }

    return <Button type={fieldType}>{name}</Button>
  }, [])

  return renderFields(category)
}
export default FormPreviewPage
