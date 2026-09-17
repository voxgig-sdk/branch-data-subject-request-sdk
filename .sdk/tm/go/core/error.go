package core

type BranchDataSubjectRequestError struct {
	IsBranchDataSubjectRequestError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewBranchDataSubjectRequestError(code string, msg string, ctx *Context) *BranchDataSubjectRequestError {
	return &BranchDataSubjectRequestError{
		IsBranchDataSubjectRequestError: true,
		Sdk:              "BranchDataSubjectRequest",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *BranchDataSubjectRequestError) Error() string {
	return e.Msg
}
