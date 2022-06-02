import React, { useCallback } from 'react'
import { useParams } from 'react-router'
import { useLocalStorage } from 'react-use'
import { SavedFormTypeOnLocalStorage } from '../form-modal/form-modal'
import FormPreviewPage from '../form-preview-page/form-preview-page'

const FormPreview = () => {
  const { id } = useParams<{ id: string }>()
  const [formValue] = useLocalStorage<SavedFormTypeOnLocalStorage[]>('my-custom-form')

  const renderComponent = useCallback((id: string, forms: typeof formValue) => {
    const isTheFormExist = forms?.filter((form) => form.id === id)
    if (isTheFormExist?.length) {
      return <FormPreviewPage form={isTheFormExist[0]} />
    }

    return <h1>form is not exist</h1>
  }, [])

  return <div>{renderComponent(id, formValue)}</div>
}

export default FormPreview
