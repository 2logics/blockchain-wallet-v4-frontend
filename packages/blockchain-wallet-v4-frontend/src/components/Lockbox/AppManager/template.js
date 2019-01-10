import React from 'react'
import styled from 'styled-components'
import { FormattedHTMLMessage } from 'react-intl'
import { equals, prop } from 'ramda'
import {
  Banner,
  Button,
  Icon,
  HeartbeatLoader,
  Text
} from 'blockchain-info-components'

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin: 5px 0;
`
const AppDetails = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  justify-items: center;
  & > :last-child {
    margin-left: 15px;
  }
`
const AppActions = styled.div`
  width: 100%;
  display: flex;
  flex-grow: 2;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  & > :last-child {
    margin-left: 10px;
  }
`
const IconBox = styled.div`
  padding: 5px;
  border-radius: 3px;
  background-color: ${props => props.theme[props.coin]};
`
const InstallButton = styled(Button)`
  border-radius: 20px;
  height: 40px;
  width: 40px;
  &:hover {
    background-color: ${props =>
      !props.disabled && props.theme['brand-quaternary']};
  }
`
const UninstallButton = styled(Button)`
  border-radius: 100px;
  height: 40px;
  width: 30px;
  max-width: 30px;
`
const StatusText = styled(Text)`
  margin-right: 8px;
`
const RequiredBadge = styled(Banner)`
  width: 46px;
  height: 10px;
  padding: 4px;
  margin: -2px 0 0 5px;
  background: none;
  border: 1px solid ${props => props.theme['brand-primary']};
  border-radius: 6px;
  color: ${props => props.theme['brand-primary']};
  & > :first-child {
    font-size: 10px;
  }
`
const NameContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`
const LockboxAppManager = props => {
  const {
    app,
    coin,
    coinState,
    disableUpdates,
    installApp,
    requireBtc,
    uninstallApp
  } = props
  const { name, version } = app
  const coinLower = coin.toLowerCase()

  return (
    <Row>
      <AppDetails>
        <IconBox coin={coinLower}>
          <Icon size='34px' color='white' name={`${coinLower}`} />
        </IconBox>
        <div>
          <NameContainer>
            <Text size='14px' weight={400} color={'gray-5'}>
              {name}
            </Text>
            {equals('btc', coinLower) &&
              requireBtc && (
                <RequiredBadge
                  label='true'
                  type='informational'
                  style={{ margin: '4px 0' }}
                >
                  <FormattedHTMLMessage
                    id='components.lockbox.appmanager.required'
                    defaultMessage='Required'
                  />
                </RequiredBadge>
              )}
          </NameContainer>
          <Text size='11px' weight={300}>
            <FormattedHTMLMessage
              id='components.lockbox.appmanager.successmsg'
              defaultMessage='Version {version}'
              values={{ version }}
            />
          </Text>
        </div>
      </AppDetails>
      {(function () {
        switch (prop('status', coinState)) {
          case 'Updating':
            return (
              <AppActions>
                <HeartbeatLoader
                  style={{ marginRight: '8px' }}
                  height='34px'
                  width='34px'
                />
              </AppActions>
            )
          case 'Error':
            return (
              <AppActions>
                <Icon name='alert-filled' color='error' size='34px' />
                <StatusText weight={400} size='18px'>
                  <FormattedHTMLMessage
                    id='components.lockbox.appmanager.error'
                    defaultMessage='Error'
                  />
                </StatusText>
              </AppActions>
            )
          case 'Success':
            return (
              <AppActions>
                <Icon
                  name='checkmark-in-circle-filled'
                  color='success'
                  size='34px'
                />
                <StatusText weight={400} size='18px'>
                  <FormattedHTMLMessage
                    id='components.lockbox.appmanager.success'
                    defaultMessage='Success'
                  />
                </StatusText>
              </AppActions>
            )
          default:
            return (
              <AppActions>
                <InstallButton
                  nature='empty-secondary'
                  width='80px'
                  onClick={!disableUpdates ? installApp : undefined}
                  disabled={disableUpdates}
                >
                  <FormattedHTMLMessage
                    id='components.lockbox.appmanager.install'
                    defaultMessage='Install'
                  />
                </InstallButton>
                <UninstallButton
                  nature='empty'
                  width='50px'
                  onClick={!disableUpdates ? uninstallApp : undefined}
                  disabled={disableUpdates}
                >
                  <Icon name='trash' size='18px' />
                </UninstallButton>
              </AppActions>
            )
        }
      })()}
    </Row>
  )
}

export default LockboxAppManager
