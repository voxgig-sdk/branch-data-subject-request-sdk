

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


describe('GdprEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE=TRUE.
  afterEach(liveDelay('BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = BranchDataSubjectRequestSDK.test()
    const ent = testsdk.Gdpr()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'gdpr.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"request_id","req":false,"short":"The UUID generated for the request made.","type":"`$STRING`","index$":0},{"active":true,"name":"request_status","req":false,"short":"This is the status of your request.","type":"`$STRING`","index$":1},{"active":true,"name":"subject_identities","req":false,"type":"`$ARRAY`","index$":2},{"active":true,"name":"subject_request_type","req":true,"short":"The type of post request being sent.","type":"`$STRING`","index$":3}],"name":"gdpr","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /gdpr","json":"{\"operationId\":\"accessErasure\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"subject_identities\":{\"items\":{\"properties\":{\"identity_format\":{\"description\":\"To be sent as \\\"raw\\\". Branch currently only supports \\\"raw\\\".\",\"example\":\"raw\",\"type\":\"string\"},\"identity_type\":{\"description\":\"The type of identity being sent. It can be \\\"BROWSER_ID\\\", \\\"DEVICE_ID\\\", \\\"USER_ID\\\", or \\\"DEVELOPER_ID\\\".\",\"enum\":[\"BROWSER_ID\",\"DEVICE_ID\",\"USER_ID\",\"DEVELOPER_ID\"],\"example\":\"DEVICE_ID\",\"type\":\"string\"},\"identity_value\":{\"description\":\"The value as per the identity_type, IDFA, Google_advertising_id, etc.\",\"example\":\"XXXX-0000-xxxx\",\"type\":\"string\"}},\"required\":[\"identity_type\",\"identity_format\"],\"type\":\"object\"},\"type\":\"array\"},\"subject_request_type\":{\"description\":\"The type of post request being sent. In this case \\\"access\\\"\",\"enum\":[\"access\",\"erasure\"],\"example\":\"access\",\"type\":\"string\"}},\"required\":[\"subject_request_type\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"request_id\":{\"description\":\"The UUID generated for the request made. This can be used to check the status of the request at a later time.\",\"example\":\"XXXX-0000-xxxx\",\"type\":\"string\"},\"request_status\":{\"description\":\"This is the status of your request. It can be one of \\n  \\\"SUCCESS\\\": The request has been fulfilled.\\n  \\\"PENDING\\\": A correct request has been received and is currently in the queue\\n  \\\"IN_PROGRESS\\\": The request is currently being acted on.\\n\",\"example\":\"SUCCESS\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Ok\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"message\\\": \\\"Authentication failed !\\\",\\n        \\\"code\\\": 400\\n    }\\n}\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"400\",\"type\":\"integer\"},\"message\":{\"example\":\"Authentication failed !\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication Failed\"},\"404\":{\"content\":{\"application/xml\":{\"examples\":{\"Result\":{\"value\":\"<html>\\n  <head><title>404 Not Found</title></head>\\n  <body bgcolor=\\\"white\\\">\\n  <center><h1>404 Not Found</h1></center>\\n  <hr><center>openresty/1.13.6.2</center>\\n  </body>\\n</html>\"}},\"schema\":{}}},\"description\":\"Not Found/Incorrect API URL\"},\"429\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"code\\\": 429,\\n        \\\"message\\\": \\\"Rate limit reached.\\\"\\n    }\\n}\"}},\"schema\":{\"properties\":{\"$ref\":\"#/responses/400/content/application~1json/schema/properties\"},\"type\":\"object\"}}},\"description\":\"Rate Limit Reached\"}},\"security\":[{\"Access-Token\":[],\"appId\":[]}],\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/gdpr","segments":[{"lit":"gdpr"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"gdpr","name__orig":"gdpr","Name":"Gdpr","name_":"gdpr","name-":"gdpr","NAME":"GDPR","index$":0}, {"active":true,"entity":"gdpr","key$":"BasicGdprFlow","kind":"basic","name":"BasicGdprFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"gdpr_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0}]}, 'Gdpr')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const gdpr_ref01_ent = client.Gdpr()
    let gdpr_ref01_data = setup.data.new.gdpr['gdpr_ref01']

    gdpr_ref01_data = (await gdpr_ref01_ent.create(gdpr_ref01_data)).data()
    assert(null != gdpr_ref01_data)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/gdpr/GdprTestData.json')

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
    ['gdpr01','gdpr02','gdpr03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'BRANCH_DATA_SUBJECT_REQUEST_TEST_GDPR_ENTID': idmap,
    'BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE': 'FALSE',
    'BRANCH_DATA_SUBJECT_REQUEST_TEST_EXPLAIN': 'FALSE',
    'BRANCH_DATA_SUBJECT_REQUEST_APIKEY': '',
  })

  idmap = env['BRANCH_DATA_SUBJECT_REQUEST_TEST_GDPR_ENTID']

  const live = 'TRUE' === env.BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['BRANCH_DATA_SUBJECT_REQUEST_TEST_GDPR_ENTID']
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
  
