import React, { FC, useCallback } from 'react'

import dayjs from 'dayjs'
import { useLocalStorage } from 'react-use'

import { Card, Col, Grid, Loader } from '@reapit/elements'
import { SavedFormTypeOnLocalStorage } from '../form-modal/form-modal'
import { useHistory } from 'react-router'
import { Routes } from '../../../constants/routes'

type DashboardProps = {
  openFormModal: () => void
  setSelectedForm: React.Dispatch<React.SetStateAction<SavedFormTypeOnLocalStorage | null>>
}

const Dashboard: FC<DashboardProps> = ({ openFormModal, setSelectedForm }) => {
  const [localStorageVal] = useLocalStorage<SavedFormTypeOnLocalStorage[]>('my-custom-form', [])

  const history = useHistory()

  const setSelectedFormValue = useCallback((curr: SavedFormTypeOnLocalStorage) => {
    openFormModal()
    setSelectedForm(curr)
  }, [])

  if (!localStorageVal) {
    return <Loader fullPage />
  }

  const renderCustomFormCardList = useCallback(
    (customFormList: typeof localStorageVal) => {
      return customFormList.map((form) => (
        <Col key={form.id}>
          <Card
            hasMainCard
            mainCardHeading={form.name}
            mainCardImgUrl="https://developers.dev.paas.reapit.cloud/default-app-icon.jpg"
            mainCardSubHeading={`Created: ${dayjs(form.createdAt).format('DD/MM/YYYY')}`}
            mainContextMenuItems={[
              {
                icon: 'previewSystem',
                onClick: () => history.push(`${Routes.FORM_PREVIEW.slice(0, -3)}${form.id}`),
              },
              {
                icon: 'editSystem',
                onClick: () => console.log('Throw to edit form'),
              },
              {
                icon: 'trashSystem',
                onClick: () => setSelectedFormValue(form),
                intent: 'danger',
              },
            ]}
          />
        </Col>
      ))
    },
    [localStorageVal],
  )

  // how to trigger rerender HEREEE
  return <Grid className="el-col-gap6 el-row-gap6">{renderCustomFormCardList(localStorageVal)}</Grid>
}

export default Dashboard
