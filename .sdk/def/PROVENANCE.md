# API definition provenance

## branch-data-subject-request-openapi.json

- **Source:** https://help.branch.io/llms.txt → the `apidocs` reference pages
  for the **Data Subject Request API**. Branch's documentation site publishes OpenAPI
  **one operation per page**, each page carrying the full
  `openapi`/`info`/`servers`/`security`/`components` header.
- **Publisher:** Branch Metrics
- **Retrieved:** 2026-09-17
- **Format:** OpenAPI 3.0.0
- **Size:** 8796 bytes
- **Coverage:** 2 paths, 2 methods, 7 component schemas —
  assembled from the 2 reference page(s) Branch publishes for this API.

## Why this is its own SDK, and how the file was assembled

Branch publishes **twelve** separate APIs — Aggregate, Attribution, Cohort,
Cross-Events Export, Custom Exports, Daily Exports, Data Subject Request, Deep
Linking, Events, Query, Quick Links and Scheduled Log Exports — each with its
own `info.title` and its own server. They are separate API surfaces, so each
is its own SDK rather than one client claiming "the Branch API".

Branch offers no single downloadable document, so this file is that API's
reference pages' embedded OpenAPI fragments merged: `paths` and
`components` unioned, `info`/`servers`/`security` taken as published.
Nothing is hand-written and no name is rewritten — the fragments for one API
are one document served in pieces. Pages that are overviews or guides carry no
fragment and contribute nothing.

Rebuild with `admin/scripts/branch-merge.sh`; do not hand-edit this file.
