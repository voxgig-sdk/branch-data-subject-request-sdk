export interface Gdpr {
    request_id?: string;
    request_status?: string;
    subject_identities?: any[];
    subject_request_type: string;
}
export interface GdprCreateData {
    request_id?: string;
    request_status?: string;
    subject_identities?: any[];
    subject_request_type: string;
}
export interface Status {
    export_url?: string;
    request_id?: string;
    request_status?: string;
    request_type?: string;
}
export interface StatusCreateData {
    export_url?: string;
    request_id?: string;
    request_status?: string;
    request_type?: string;
}
