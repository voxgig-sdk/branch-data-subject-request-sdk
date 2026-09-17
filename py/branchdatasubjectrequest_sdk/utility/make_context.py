# BranchDataSubjectRequest SDK utility: make_context

from branchdatasubjectrequest_sdk.core.context import BranchDataSubjectRequestContext


def make_context_util(ctxmap, basectx):
    return BranchDataSubjectRequestContext(ctxmap, basectx)
