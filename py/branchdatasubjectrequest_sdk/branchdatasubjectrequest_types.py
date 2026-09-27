# Typed models for the BranchDataSubjectRequest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class GdprRequired(TypedDict):
    subject_request_type: str


class Gdpr(GdprRequired, total=False):
    request_id: str
    request_status: str
    subject_identities: list


class GdprCreateDataRequired(TypedDict):
    subject_request_type: str


class GdprCreateData(GdprCreateDataRequired, total=False):
    request_id: str
    request_status: str
    subject_identities: list


class Status(TypedDict, total=False):
    export_url: str
    request_id: str
    request_status: str
    request_type: str


class StatusCreateData(TypedDict, total=False):
    export_url: str
    request_id: str
    request_status: str
    request_type: str
