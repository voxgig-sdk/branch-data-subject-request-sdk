import { BranchDataSubjectRequestEntityBase } from '../BranchDataSubjectRequestEntityBase';
import type { BranchDataSubjectRequestSDK } from '../BranchDataSubjectRequestSDK';
import type { Control } from '../types';
import type { Status, StatusCreateData } from '../BranchDataSubjectRequestTypes';
declare class StatusEntity extends BranchDataSubjectRequestEntityBase<Status> {
    constructor(client: BranchDataSubjectRequestSDK, entopts: any);
    make(this: StatusEntity): StatusEntity;
    create(this: any, reqdata?: StatusCreateData, ctrl?: Control): Promise<StatusEntity>;
}
export { StatusEntity };
