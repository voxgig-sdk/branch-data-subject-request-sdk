import { BranchDataSubjectRequestEntityBase } from '../BranchDataSubjectRequestEntityBase';
import type { BranchDataSubjectRequestSDK } from '../BranchDataSubjectRequestSDK';
import type { Control } from '../types';
import type { Gdpr, GdprCreateData } from '../BranchDataSubjectRequestTypes';
declare class GdprEntity extends BranchDataSubjectRequestEntityBase<Gdpr> {
    constructor(client: BranchDataSubjectRequestSDK, entopts: any);
    make(this: GdprEntity): GdprEntity;
    create(this: any, reqdata?: GdprCreateData, ctrl?: Control): Promise<GdprEntity>;
}
export { GdprEntity };
