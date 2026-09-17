
const { test, describe } = require('node:test')
const { equal } = require('node:assert')


const { BranchDataSubjectRequestSDK } = require('..')


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await BranchDataSubjectRequestSDK.test()
    equal(null !== testsdk, true)
  })

})
