

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { BranchDataSubjectRequestSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('StatusEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BranchDataSubjectRequestSDK.test()
    const ent = testsdk.Status()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'status.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"export_url","req":false,"short":"The pre-assigned s3 URL link to download the CSV file containing the identity objects requested.","type":"`$STRING`","index$":0},{"active":true,"name":"request_id","req":false,"short":"The UUID generated for the request made.","type":"`$STRING`","index$":1},{"active":true,"name":"request_status","req":false,"short":"This is the status of your request.","type":"`$STRING`","index$":2},{"active":true,"name":"request_type","req":false,"short":"Request type requested by the user","type":"`$STRING`","index$":3}],"name":"status","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /gdpr/status","json":"{\"operationId\":\"downloadStatusRequest\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"request_id\":{\"description\":\"The UUID generated for the request made. This can be used to check the status of the request at a later time.\",\"example\":\"XXXX-0000-xxxx\",\"type\":\"string\"}},\"required\":[\"subject_request_type\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"export_url\":{\"description\":\"The pre-assigned s3 URL link to download the CSV file containing the identity objects requested.\",\"example\":\"https://branch-exports-usw2.s3.amazonaws.com/unique-csv-file-name-here.csv?Signature={SIGNATURE_HERE}%3D&AWSAccessKeyId={AWS_ACCESS_KEY_ID_HERE}&Expires={EXPIRATION_HERE}\",\"type\":\"string\"},\"request_id\":{\"description\":\"The UUID generated for the request made. This can be used to check the status of the request at a later time.\",\"example\":\"XXXX-0000-xxxx\",\"type\":\"string\"},\"request_status\":{\"description\":\"This is the status of your request. It can be one of \\n  \\\"SUCCESS\\\": The request has been fulfilled.\\n  \\\"PENDING\\\": A correct request has been received and is currently in the queue\\n  \\\"IN_PROGRESS\\\": The request is currently being acted on.\\n\",\"example\":\"SUCCESS\",\"type\":\"string\"},\"request_type\":{\"description\":\"Request type requested by the user\",\"example\":\"ACCESS\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Ok\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"message\\\": \\\"Authentication failed !\\\",\\n        \\\"code\\\": 400\\n    }\\n}\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"400\",\"type\":\"integer\"},\"message\":{\"example\":\"Authentication failed !\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication Failed\"},\"429\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"code\\\": 429,\\n        \\\"message\\\": \\\"Rate limit reached.\\\"\\n    }\\n}\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"429\",\"type\":\"integer\"},\"message\":{\"example\":\"Rate limit reached.\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate Limit Reached\"}},\"security\":[{\"Access-Token\":[],\"appId\":[]}],\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/gdpr/status","segments":[{"lit":"gdpr"},{"lit":"status"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"status","name__orig":"status","Name":"Status","name_":"status","name-":"status","NAME":"STATUS","index$":1}, {"active":true,"entity":"status","key$":"BasicStatusFlow","kind":"basic","name":"BasicStatusFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"status_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Status')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const status_ref01_ent = client.Status()
    let status_ref01_data = setup.data.new.status['status_ref01']

    status_ref01_data = (await status_ref01_ent.create(status_ref01_data)).data()
    assert(null != status_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/status/StatusTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = BranchDataSubjectRequestSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['status01','status02','status03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRANCH_DATA_SUBJECT_REQUEST_TEST_STATUS_ENTID': idmap,
    'BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE': 'FALSE',
    'BRANCH_DATA_SUBJECT_REQUEST_TEST_EXPLAIN': 'FALSE',
    'BRANCH_DATA_SUBJECT_REQUEST_APIKEY': '',
  })

  idmap = env['BRANCH_DATA_SUBJECT_REQUEST_TEST_STATUS_ENTID']

  const live = 'TRUE' === env.BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRANCH_DATA_SUBJECT_REQUEST_TEST_STATUS_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new BranchDataSubjectRequestSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.BRANCH_DATA_SUBJECT_REQUEST_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.BRANCH_DATA_SUBJECT_REQUEST_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
