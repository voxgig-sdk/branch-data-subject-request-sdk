// Typed models for the BranchDataSubjectRequest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Gdpr {
  request_id?: string
  request_status?: string
  subject_identities?: any[]
  subject_request_type: string
}

export interface GdprCreateData {
  request_id?: string
  request_status?: string
  subject_identities?: any[]
  subject_request_type: string
}

export interface Status {
  export_url?: string
  request_id?: string
  request_status?: string
  request_type?: string
}

export interface StatusCreateData {
  export_url?: string
  request_id?: string
  request_status?: string
  request_type?: string
}

