# Data Subject Request API

The Branch Data Subject Request API supports our customers with two key components of data protection laws like the General Data Protection Regulation 2016/679 (GDPR) and the California Consumer Privacy Act (CCPA) - the right to access personal data and the right to request deletion of personal data (also known as the right be forgotten).

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 2 entities and 2 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### [Gdpr](docs/api/gdpr.html)

Results: Ok.

SDK operations: `create`.

Key fields to recognise:

- `request_id`: The UUID generated for the request made. This can be used to check the status of the request at a later time.
- `request_status`: This is the status of your request. It can be one of &quot;SUCCESS&quot;: The request has been fulfilled. &quot;PENDING&quot;: A correct request has been received and is currently in the queue &quot;IN_PROGRESS&quot;: The request is currently being acted on.
- `subject_request_type`: The type of post request being sent.

### [Status](docs/api/status.html)

Results: Ok.

SDK operations: `create`.

Key fields to recognise:

- `export_url`: The pre-assigned s3 URL link to download the CSV file containing the identity objects requested.
- `request_id`: The UUID generated for the request made. This can be used to check the status of the request at a later time.
- `request_status`: This is the status of your request. It can be one of &quot;SUCCESS&quot;: The request has been fulfilled. &quot;PENDING&quot;: A correct request has been received and is currently in the queue &quot;IN_PROGRESS&quot;: The request is currently being acted on.
- `request_type`: Request type requested by the user

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| [Gdpr](docs/api/gdpr.html) | `create` | `POST /gdpr` | Required |
| [Status](docs/api/status.html) | `create` | `POST /gdpr/status` | Required |

## Connect to the API

- API server: `https://api2.branch.io/v1`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| [Golang](docs/sdks/go.html) | `go/` | Build from source |
| [JavaScript](docs/sdks/js.html) | `js/` | Build from source |
| [Lua](docs/sdks/lua.html) | `lua/` | Build from source |
| [PHP](docs/sdks/php.html) | `php/` | Build from source |
| [Python](docs/sdks/py.html) | `py/` | Build from source |
| [TypeScript](docs/sdks/ts.html) | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### [Go CLI](docs/tools/go-cli.html)

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### [Go MCP server](docs/tools/go-mcp.html)

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `branch-data-subject-request_list`: List records for an entity. No active entity supports this operation.
- `branch-data-subject-request_load`: Load one record for an entity. No active entity supports this operation.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- [`debug`](docs/features/debug.html): Request/response capture ring buffer for debugging
- [`idempotency`](docs/features/idempotency.html): Idempotency keys for safe retries of mutating operations
- [`metrics`](docs/features/metrics.html): Statistics capture: per-operation counters and latency
- [`paging`](docs/features/paging.html): Pagination signals for list operations
- [`ratelimit`](docs/features/ratelimit.html): Client-side rate limiting via a token bucket
- [`retry`](docs/features/retry.html): Automatic retry of transient failures with exponential backoff
- [`test`](docs/features/test.html): In-memory mock transport for testing without a live server
- [`timeout`](docs/features/timeout.html): Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the [first-call guide](docs/guides/first-call.html) for the setup sequence.
- Read the [authentication guide](docs/guides/authentication.html) before using protected routes.
- Use the [API reference](docs/api/index.html) for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

