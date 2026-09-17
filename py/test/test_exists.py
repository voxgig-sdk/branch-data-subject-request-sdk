# BranchDataSubjectRequest SDK exists test

import pytest
from branchdatasubjectrequest_sdk import BranchDataSubjectRequestSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = BranchDataSubjectRequestSDK.test(None, None)
        assert testsdk is not None
