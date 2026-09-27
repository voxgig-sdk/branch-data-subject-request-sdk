

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"export_url":{"a":true,"h":"Export Url","n":"export_url","r":false,"sh":"The pre-assigned s3 URL link to download the CSV file containing the identity objects requested.","t":"`$STRING`","key$":"export_url","index$":0},"request_id":{"a":true,"h":"Request Id","n":"request_id","r":false,"sh":"The UUID generated for the request made.","t":"`$STRING`","key$":"request_id","index$":1},"request_status":{"a":true,"h":"Request Status","n":"request_status","r":false,"sh":"This is the status of your request.","t":"`$STRING`","key$":"request_status","index$":2},"request_type":{"a":true,"h":"Request Type","n":"request_type","r":false,"sh":"Request type requested by the user","t":"`$STRING`","key$":"request_type","index$":3}},"name":"status","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /gdpr/status","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/gdpr/status","q":{},"r":{},"s":[{"lit":"gdpr"},{"lit":"status"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"status","name__orig":"status","Name":"Status","name_":"status","name-":"status","NAME":"STATUS","index$":1}, {"active":true,"entity":"status","key$":"BasicStatusFlow","kind":"basic","name":"BasicStatusFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"status_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Status', {"POST /gdpr/status":{"protocol":"http","requestBody":{"content":{"application/json":{"schema":{"type":"object","required":["subject_request_type"],"properties":{"request_id":{"type":"string","description":"The UUID generated for the request made. This can be used to check the status of the request at a later time.","example":"XXXX-0000-xxxx","key$":"request_id"}},"x-ref":"#/components/schemas/download_status_request_body","index$":1}}}},"parameters":[]}})
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
  
