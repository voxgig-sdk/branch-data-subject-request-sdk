
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { BranchDataSubjectRequestSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = BranchDataSubjectRequestSDK.test()
    equal(testsdk instanceof BranchDataSubjectRequestSDK, true,
      'BranchDataSubjectRequestSDK.test() must return a client synchronously')
  })

})
