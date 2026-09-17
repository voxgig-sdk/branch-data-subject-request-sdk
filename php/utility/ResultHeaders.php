<?php
declare(strict_types=1);

// BranchDataSubjectRequest SDK utility: result_headers

class BranchDataSubjectRequestResultHeaders
{
    public static function call(BranchDataSubjectRequestContext $ctx): ?BranchDataSubjectRequestResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
