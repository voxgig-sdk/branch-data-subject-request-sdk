# BranchDataSubjectRequest SDK feature factory

from branchdatasubjectrequest_sdk.feature.base_feature import BranchDataSubjectRequestBaseFeature
from branchdatasubjectrequest_sdk.feature.debug_feature import BranchDataSubjectRequestDebugFeature
from branchdatasubjectrequest_sdk.feature.idempotency_feature import BranchDataSubjectRequestIdempotencyFeature
from branchdatasubjectrequest_sdk.feature.metrics_feature import BranchDataSubjectRequestMetricsFeature
from branchdatasubjectrequest_sdk.feature.paging_feature import BranchDataSubjectRequestPagingFeature
from branchdatasubjectrequest_sdk.feature.ratelimit_feature import BranchDataSubjectRequestRatelimitFeature
from branchdatasubjectrequest_sdk.feature.retry_feature import BranchDataSubjectRequestRetryFeature
from branchdatasubjectrequest_sdk.feature.test_feature import BranchDataSubjectRequestTestFeature
from branchdatasubjectrequest_sdk.feature.timeout_feature import BranchDataSubjectRequestTimeoutFeature


_FEATURES = {
    "base": lambda: BranchDataSubjectRequestBaseFeature(),
    "debug": lambda: BranchDataSubjectRequestDebugFeature(),
    "idempotency": lambda: BranchDataSubjectRequestIdempotencyFeature(),
    "metrics": lambda: BranchDataSubjectRequestMetricsFeature(),
    "paging": lambda: BranchDataSubjectRequestPagingFeature(),
    "ratelimit": lambda: BranchDataSubjectRequestRatelimitFeature(),
    "retry": lambda: BranchDataSubjectRequestRetryFeature(),
    "test": lambda: BranchDataSubjectRequestTestFeature(),
    "timeout": lambda: BranchDataSubjectRequestTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
