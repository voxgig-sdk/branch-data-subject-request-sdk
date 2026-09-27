

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"request_id":{"a":true,"h":"Request Id","n":"request_id","r":false,"sh":"The UUID generated for the request made.","t":"`$STRING`","key$":"request_id","index$":0},"request_status":{"a":true,"h":"Request Status","n":"request_status","r":false,"sh":"This is the status of your request.","t":"`$STRING`","key$":"request_status","index$":1},"subject_identities":{"a":true,"h":"Subject Identities","n":"subject_identities","r":false,"t":"`$ARRAY`","key$":"subject_identities","index$":2},"subject_request_type":{"a":true,"h":"Subject Request Type","n":"subject_request_type","r":true,"sh":"The type of post request being sent.","t":"`$STRING`","key$":"subject_request_type","index$":3}},"name":"gdpr","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /gdpr","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/gdpr","q":{},"r":{},"s":[{"lit":"gdpr"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"gdpr","name__orig":"gdpr","Name":"Gdpr","name_":"gdpr","name-":"gdpr","NAME":"GDPR","index$":0}, {"active":true,"entity":"gdpr","key$":"BasicGdprFlow","kind":"basic","name":"BasicGdprFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"gdpr_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Gdpr', {"POST /gdpr":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["subject_request_type"],"properties":{"subject_request_type":{"type":"string","description":"The type of post request being sent. In this case \"access\"","example":"access","enum":["access","erasure"],"key$":"subject_request_type"},"subject_identities":{"type":"array","items":{"type":"object","required":["identity_type","identity_format"],"properties":{"identity_type":{"type":"string","description":"The type of identity being sent. It can be \"BROWSER_ID\", \"DEVICE_ID\", \"USER_ID\", or \"DEVELOPER_ID\".","enum":[],"example":"DEVICE_ID"},"identity_value":{"type":"string","description":"The value as per the identity_type, IDFA, Google_advertising_id, etc.","example":"XXXX-0000-xxxx"},"identity_format":{"type":"string","description":"To be sent as \"raw\". Branch currently only supports \"raw\".","example":"raw"}},"x-ref":"#/components/schemas/subject_identities_array"},"key$":"subject_identities"}},"x-ref":"#/components/schemas/access_request_body","index$":1}}}},"parameters":[]}})
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
  
