# BranchDataSubjectRequest JavaScript SDK



The JavaScript SDK for the BranchDataSubjectRequest API — an entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Gdpr()` — each with a small set of operations (`create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```js
npm install branch-data-subject-request
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.


### Create a Client

```js
const { BranchDataSubjectRequestSDK } = require('@voxgig-sdk/branch-data-subject-request-js')

const client = new BranchDataSubjectRequestSDK({
  apikey: process.env.BRANCH_DATA_SUBJECT_REQUEST_APIKEY,
})
```

### Create a Gdpr

```js
const created = await client.Gdpr().create({
  subject_request_type: 'example_subject_request_type',
})
console.log(created)
```

### Direct API Access

Use `client.direct()` to call any API endpoint directly:

```js
const result = await client.direct({
  path: '/custom/endpoint/{id}',
  method: 'GET',
  params: { id: 'abc123' },
})

if (result.ok) {
  console.log(result.data)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const gdpr = await client.Gdpr().create({ subject_request_type: "example" })
  console.log(gdpr)
} catch (err) {
  console.error('create failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```js
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```js
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```js
const client = BranchDataSubjectRequestSDK.test()

const gdpr = await client.Gdpr().create({ subject_request_type: 'example_subject_request_type' })
// gdpr is the entity, populated with mock response data
// — call gdpr.data() for the record itself
console.log(gdpr)
```

You can also use the instance method:

```js
const client = new BranchDataSubjectRequestSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```js
const entity = client.Gdpr()

// First call runs the operation and stores its result
await entity.create({ subject_request_type: 'example_subject_request_type' })

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```js
const logger = {
  hooks: {
    PreRequest: (ctx) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new BranchDataSubjectRequestSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
BRANCH_DATA_SUBJECT_REQUEST_TEST_LIVE=TRUE
BRANCH_DATA_SUBJECT_REQUEST_APIKEY=<your-key>
```

Then run:

```bash
cd js && npm test
```


## Reference

### BranchDataSubjectRequestSDK

#### Constructor

```js
new BranchDataSubjectRequestSDK(options?)
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Gdpr(data?)` | `GdprEntity` | Create a Gdpr entity instance. |
| `Status(data?)` | `StatusEntity` | Create a Status entity instance. |
| `tester(testopts?, sdkopts?)` | `BranchDataSubjectRequestSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `BranchDataSubjectRequestSDK.test(testopts?, sdkopts?)` | `BranchDataSubjectRequestSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): BranchDataSubjectRequestSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `create` resolves to a single entity object.

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```js
{
  ok: true,
  status: 200,
  headers: {},
  data: {}
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```js
{
  url: 'string',
  method: 'string',
  headers: {},
  body: undefined
}
```

### Entities

#### Gdpr

| Field | Description |
| --- | --- |
| `request_id` | The UUID generated for the request made. |
| `request_status` | This is the status of your request. |
| `subject_identities` |  |
| `subject_request_type` | The type of post request being sent. |

Operations: create.

API path: `/gdpr`

#### Status

| Field | Description |
| --- | --- |
| `export_url` | The pre-assigned s3 URL link to download the CSV file containing the identity objects requested. |
| `request_id` | The UUID generated for the request made. |
| `request_status` | This is the status of your request. |
| `request_type` | Request type requested by the user |

Operations: create.

API path: `/gdpr/status`



## Entities


### Gdpr

Create an instance: `const gdpr = client.Gdpr()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `request_id` | `string` | The UUID generated for the request made. |
| `request_status` | `string` | This is the status of your request. |
| `subject_identities` | `Array` |  |
| `subject_request_type` | `string` | The type of post request being sent. |

#### Example: Create

```ts
const gdpr = await client.Gdpr().create({
  subject_request_type: 'example_subject_request_type',
})
```


### Status

Create an instance: `const status = client.Status()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `export_url` | `string` | The pre-assigned s3 URL link to download the CSV file containing the identity objects requested. |
| `request_id` | `string` | The UUID generated for the request made. |
| `request_status` | `string` | This is the status of your request. |
| `request_type` | `string` | Request type requested by the user |

#### Example: Create

```ts
const status = await client.Status().create({
})
```

## Features

This SDK ships 8 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`debug`](#debug) | Request/response capture ring buffer for debugging |
| [`idempotency`](#idempotency) | Idempotency keys for safe retries of mutating operations |
| [`metrics`](#metrics) | Statistics capture: per-operation counters and latency |
| [`paging`](#paging) | Pagination signals for list operations |
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### debug

Request/response capture ring buffer for debugging.

| Option | Default |
|---|---|
| `active` | `false` |
| `max` | `100` |
| `redact` | `['authorization', 'cookie', 'set-cookie', 'api-key', 'apikey', 'x-api-key', 'idempotency-key']` |

Set `feature.debug.active` to enable it, then override any of the options above.

### idempotency

Idempotency keys for safe retries of mutating operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `header` | `'Idempotency-Key'` |
| `methods` | `['POST', 'PUT', 'PATCH', 'DELETE']` |
| `ops` | `['create', 'update', 'remove']` |

Set `feature.idempotency.active` to enable it, then override any of the options above.

### metrics

Statistics capture: per-operation counters and latency.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.metrics.active` to enable it, then override any of the options above.

### paging

Pagination signals for list operations.

| Option | Default |
|---|---|
| `active` | `false` |
| `afterVar` | `'after'` |
| `cursorParam` | `'cursor'` |
| `firstVar` | `'first'` |
| `limitParam` | `'limit'` |
| `pageParam` | `'page'` |
| `startPage` | `1` |

Set `feature.paging.active` to enable it, then override any of the options above.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **DebugFeature**: Request/response capture ring buffer for debugging
- **IdempotencyFeature**: Idempotency keys for safe retries of mutating operations
- **MetricsFeature**: Statistics capture: per-operation counters and latency
- **PagingFeature**: Pagination signals for list operations
- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
branch-data-subject-request/
├── src/
│   ├── BranchDataSubjectRequestSDK.js        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
└── test/                   # Test suites
```

Import the SDK from the package root:

```js
const { BranchDataSubjectRequestSDK } = require('@voxgig-sdk/branch-data-subject-request-js')
```

### Entity state

Entity instances are stateful. After a successful `create`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const gdpr = client.Gdpr()
await gdpr.create({ subject_request_type: "example" })

// gdpr.data() now returns the gdpr data from the last `create`
// gdpr.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
