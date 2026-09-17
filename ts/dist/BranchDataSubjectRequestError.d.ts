import { Context } from './Context';
declare class BranchDataSubjectRequestError extends Error {
    isBranchDataSubjectRequestError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { BranchDataSubjectRequestError };
