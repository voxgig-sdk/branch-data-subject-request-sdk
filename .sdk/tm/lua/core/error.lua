-- BranchDataSubjectRequest SDK error

local BranchDataSubjectRequestError = {}
BranchDataSubjectRequestError.__index = BranchDataSubjectRequestError


function BranchDataSubjectRequestError.new(code, msg, ctx)
  local self = setmetatable({}, BranchDataSubjectRequestError)
  self.is_sdk_error = true
  self.sdk = "BranchDataSubjectRequest"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function BranchDataSubjectRequestError:error()
  return self.msg
end


function BranchDataSubjectRequestError:__tostring()
  return self.msg
end


return BranchDataSubjectRequestError
