"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BranchDataSubjectRequestError = void 0;
class BranchDataSubjectRequestError extends Error {
    isBranchDataSubjectRequestError = true;
    sdk = 'BranchDataSubjectRequest';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.BranchDataSubjectRequestError = BranchDataSubjectRequestError;
//# sourceMappingURL=BranchDataSubjectRequestError.js.map