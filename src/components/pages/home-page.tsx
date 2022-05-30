import React, { FC, Suspense, useCallback, useRef, useState } from 'react'

import {
  PageContainer,
  MainContainer,
  SecondaryNavContainer,
  SecondaryNav,
  SecondaryNavItem,
  Button,
  Icon,
  Title,
  SmallText,
  Subtitle,
  useModal,
} from '@reapit/elements'

import FormBuilder, { ForwardRefFormBuilderProps } from '../ui/home-page/form-builder'
import FormModalContent from '../ui/form-modal/form-modal'
import { Route, useHistory } from 'react-router'

// TODO: create preview page that can simulate the form (with params of id)
// TODO: create dashboard page that can see list of created custom form

export const HomePage: FC = () => {
  const [activeNavItemIndex, setActiveNavItemIndex] =
    useState<keyof ReturnType<typeof availableSubPages>>('form-builder')

  const ref = useRef<ForwardRefFormBuilderProps>(null)

  const history = useHistory()

  const { Modal: FormModal, openModal: openFormModal, closeModal: closeFormModal } = useModal('modal-root')

  const availableSubPages = () =>
    ({
      dashboard: () => {
        console.log('asd', this)
        history.push('/dashboard')
        setActiveNavItemIndex('dashboard')
      },
      'form-builder': () => {
        history.push('/form-builder')
        setActiveNavItemIndex('form-builder')
      },
    } as const)

  const renderSidebarButtons = useCallback(() => {
    if (activeNavItemIndex === 'form-builder') {
      return (
        <Button fixedWidth intent="primary" onClick={openFormModal}>
          Generate Form
        </Button>
      )
    }
  }, [activeNavItemIndex])

  return (
    <MainContainer>
      <SecondaryNavContainer>
        <Title hasBoldText>Form Builder</Title>
        <SecondaryNav className="el-mt6 el-mb6">
          <SecondaryNavItem active={activeNavItemIndex === 'dashboard'} onClick={availableSubPages()['dashboard']}>
            Dashboard
          </SecondaryNavItem>
          <SecondaryNavItem
            active={activeNavItemIndex === 'form-builder'}
            onClick={availableSubPages()['form-builder']}
          >
            Form Builder
          </SecondaryNavItem>
        </SecondaryNav>
        <Icon icon="editAppInfographic" iconSize="large" className="el-mb3" />
        <Subtitle>About Form Builder</Subtitle>
        <SmallText hasGreyText>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
          industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </SmallText>
        {renderSidebarButtons()}
      </SecondaryNavContainer>
      <PageContainer>
        <Suspense fallback={<>yioio</>}>
          <Route path="/dashboard" render={() => <>this is the dashboard</>} exact />
          <Route path="/form-builder" render={() => <FormBuilder ref={ref} />} exact />
        </Suspense>
      </PageContainer>
      <FormModal>
        {ref.current !== null && (
          <FormModalContent addedField={ref.current.addedFieldState} closeFormModal={closeFormModal} />
        )}
      </FormModal>
    </MainContainer>
  )
}

export default HomePage
