<?php
declare(strict_types=1);

// Typed models for the BranchDataSubjectRequest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Gdpr entity data model. */
class Gdpr
{
    public ?string $request_id = null;
    public ?string $request_status = null;
    public ?array $subject_identities = null;
    public string $subject_request_type;
}

/** Request payload for Gdpr#create. */
class GdprCreateData
{
    public ?string $request_id = null;
    public ?string $request_status = null;
    public ?array $subject_identities = null;
    public string $subject_request_type;
}

/** Status entity data model. */
class Status
{
    public ?string $export_url = null;
    public ?string $request_id = null;
    public ?string $request_status = null;
    public ?string $request_type = null;
}

/** Request payload for Status#create. */
class StatusCreateData
{
    public ?string $export_url = null;
    public ?string $request_id = null;
    public ?string $request_status = null;
    public ?string $request_type = null;
}

