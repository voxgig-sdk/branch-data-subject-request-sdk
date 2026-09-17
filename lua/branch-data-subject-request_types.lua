-- Typed models for the BranchDataSubjectRequest SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Gdpr
---@field request_id? string
---@field request_status? string
---@field subject_identities? table
---@field subject_request_type string

---@class GdprCreateData
---@field request_id? string
---@field request_status? string
---@field subject_identities? table
---@field subject_request_type string

---@class Status
---@field export_url? string
---@field request_id? string
---@field request_status? string
---@field request_type? string

---@class StatusCreateData
---@field export_url? string
---@field request_id? string
---@field request_status? string
---@field request_type? string

local M = {}

return M
