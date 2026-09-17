<?php
declare(strict_types=1);

// BranchDataSubjectRequest SDK utility: result_body

class BranchDataSubjectRequestResultBody
{
    public static function call(BranchDataSubjectRequestContext $ctx): ?BranchDataSubjectRequestResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
