-- BranchDataSubjectRequest SDK exists test

local sdk = require("branch-data-subject-request_sdk")

describe("BranchDataSubjectRequestSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
