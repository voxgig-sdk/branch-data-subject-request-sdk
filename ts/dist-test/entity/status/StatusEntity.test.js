"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('StatusEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.BranchDataSubjectRequestSDK.test();
        const ent = testsdk.Status();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE;
        for (const op of ['create']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'status.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "export_url", "req": false, "short": "The pre-assigned s3 URL link to download the CSV file containing the identity objects requested.", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "request_id", "req": false, "short": "The UUID generated for the request made.", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "request_status", "req": false, "short": "This is the status of your request.", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "request_type", "req": false, "short": "Request type requested by the user", "type": "`$STRING`", "index$": 3 }], "name": "status", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /gdpr/status", "json": "{\"operationId\":\"downloadStatusRequest\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"request_id\":{\"description\":\"The UUID generated for the request made. This can be used to check the status of the request at a later time.\",\"example\":\"XXXX-0000-xxxx\",\"type\":\"string\"}},\"required\":[\"subject_request_type\"],\"type\":\"object\"}}}},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"export_url\":{\"description\":\"The pre-assigned s3 URL link to download the CSV file containing the identity objects requested.\",\"example\":\"https://branch-exports-usw2.s3.amazonaws.com/unique-csv-file-name-here.csv?Signature={SIGNATURE_HERE}%3D&AWSAccessKeyId={AWS_ACCESS_KEY_ID_HERE}&Expires={EXPIRATION_HERE}\",\"type\":\"string\"},\"request_id\":{\"description\":\"The UUID generated for the request made. This can be used to check the status of the request at a later time.\",\"example\":\"XXXX-0000-xxxx\",\"type\":\"string\"},\"request_status\":{\"description\":\"This is the status of your request. It can be one of \\n  \\\"SUCCESS\\\": The request has been fulfilled.\\n  \\\"PENDING\\\": A correct request has been received and is currently in the queue\\n  \\\"IN_PROGRESS\\\": The request is currently being acted on.\\n\",\"example\":\"SUCCESS\",\"type\":\"string\"},\"request_type\":{\"description\":\"Request type requested by the user\",\"example\":\"ACCESS\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Ok\"},\"400\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"message\\\": \\\"Authentication failed !\\\",\\n        \\\"code\\\": 400\\n    }\\n}\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"400\",\"type\":\"integer\"},\"message\":{\"example\":\"Authentication failed !\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Authentication Failed\"},\"429\":{\"content\":{\"application/json\":{\"examples\":{\"Result\":{\"value\":\"{\\n    \\\"error\\\": {\\n        \\\"code\\\": 429,\\n        \\\"message\\\": \\\"Rate limit reached.\\\"\\n    }\\n}\"}},\"schema\":{\"properties\":{\"error\":{\"properties\":{\"code\":{\"example\":\"429\",\"type\":\"integer\"},\"message\":{\"example\":\"Rate limit reached.\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Rate Limit Reached\"}},\"security\":[{\"Access-Token\":[],\"appId\":[]}],\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/gdpr/status", "segments": [{ "lit": "gdpr" }, { "lit": "status" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" } }, "relations": { "ancestors": [] }, "key$": "status", "name__orig": "status", "Name": "Status", "name_": "status", "name-": "status", "NAME": "STATUS", "index$": 1 }, { "active": true, "entity": "status", "key$": "BasicStatusFlow", "kind": "basic", "name": "BasicStatusFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "status_ref01" }, "match": {}, "op": "create", "spec": [], "valid": [], "index$": 0 }] }, 'Status');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const status_ref01_ent = client.Status();
        let status_ref01_data = setup.data.new.status['status_ref01'];
        status_ref01_data = (await status_ref01_ent.create(status_ref01_data)).data();
        (0, node_assert_1.default)(null != status_ref01_data);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/status/StatusTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.BranchDataSubjectRequestSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['status01', 'status02', 'status03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'BRANCH_DATA_SUBJECT_REQUEST_TEST_STATUS_ENTID': idmap,
        'BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE': 'FALSE',
        'BRANCH_DATA_SUBJECT_REQUEST_TEST_EXPLAIN': 'FALSE',
        'BRANCH_DATA_SUBJECT_REQUEST_APIKEY': '',
    });
    idmap = env['BRANCH_DATA_SUBJECT_REQUEST_TEST_STATUS_ENTID'];
    const live = 'TRUE' === env.BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['BRANCH_DATA_SUBJECT_REQUEST_TEST_STATUS_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.BranchDataSubjectRequestSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
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
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=StatusEntity.test.js.map