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
import FormModalContent, { SavedFormTypeOnLocalStorage } from '../ui/form-modal/form-modal'
import { Route, useHistory, useLocation } from 'react-router'
import { Routes } from '../../constants/routes'
import Dashboard from '../ui/home-page/dashboard'
import DashboardFormContent from '../ui/form-modal/dashboard-form-content'

// TODO: create preview page that can simulate the form (with params of id)
// TODO: create dashboard page that can see list of created custom form

type AvailablePageType = 'dashboard' | 'form-builder'

export const HomePage: FC = () => {
  const currentLocation = useLocation()

  const current = currentLocation.pathname === '/' ? 'dashboard' : 'form-builder'

  const [activeNavItemIndex, setActiveNavItemIndex] = useState<AvailablePageType>(current)
  const [selectedForm, setSelectedForm] = useState<SavedFormTypeOnLocalStorage | null>(null)

  const history = useHistory()

  const formBuilderRef = useRef<ForwardRefFormBuilderProps>(null)

  const { Modal: FormModal, openModal: openFormModal, closeModal: closeFormModal } = useModal('modal-root')

  const availableSubPages = useCallback(
    (page: AvailablePageType) =>
      ({
        dashboard: () => {
          history.push(Routes.HOME)
          setActiveNavItemIndex('dashboard')
        },
        'form-builder': () => {
          history.push(Routes.FORM_BUILDER)
          setActiveNavItemIndex('form-builder')
        },
      }[page]),
    [],
  )

  const renderSidebarButtons = useCallback(() => {
    if (activeNavItemIndex === 'form-builder') {
      return (
        <Button fixedWidth intent="primary" onClick={openFormModal}>
          Generate Form
        </Button>
      )
    }
  }, [activeNavItemIndex])

  const renderFormModalContent = useCallback(() => {
    if (currentLocation.pathname === Routes.HOME && selectedForm !== null) {
      return <DashboardFormContent selectedForm={selectedForm} closeFormModal={closeFormModal} />
    } else if (currentLocation.pathname === Routes.FORM_BUILDER && formBuilderRef.current !== null) {
      return <FormModalContent formBuilderRef={formBuilderRef.current} closeFormModal={closeFormModal} />
    }
  }, [selectedForm, currentLocation.pathname])

  return (
    <MainContainer>
      <SecondaryNavContainer>
        <Title hasBoldText>Form Builder</Title>
        <SecondaryNav className="el-mt6 el-mb6">
          <SecondaryNavItem active={activeNavItemIndex === 'dashboard'} onClick={availableSubPages('dashboard')}>
            Dashboard
          </SecondaryNavItem>
          <SecondaryNavItem active={activeNavItemIndex === 'form-builder'} onClick={availableSubPages('form-builder')}>
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
          <Route
            path={Routes.HOME}
            render={() => <Dashboard openFormModal={openFormModal} setSelectedForm={setSelectedForm} />}
            exact
          />
          <Route path={Routes.FORM_BUILDER} render={() => <FormBuilder ref={formBuilderRef} />} exact />
        </Suspense>
      </PageContainer>
      <FormModal title="">{renderFormModalContent()}</FormModal>
    </MainContainer>
  )
}

export default HomePage
