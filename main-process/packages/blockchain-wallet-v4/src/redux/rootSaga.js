import { all, fork } from 'redux-saga/effects'
import data from './data/sagaRegister'
import kvStore from './kvStore/sagaRegister'
import walletOptions from './walletOptions/sagaRegister'
import settings from './settings/sagaRegister'
import wallet from './wallet/sagaRegister'

export default ({ api, networks, options, securityProcess }) =>
  function* coreSaga () {
    yield all([
      fork(data({ api, options, networks })),
      fork(kvStore({ api, networks, securityProcess })),
      fork(walletOptions({ api, options })),
      fork(settings({ api })),
      fork(wallet({ api, networks }))
    ])
  }
