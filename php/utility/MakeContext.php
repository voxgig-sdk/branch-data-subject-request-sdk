<?php
declare(strict_types=1);

// BranchDataSubjectRequest SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class BranchDataSubjectRequestMakeContext
{
    public static function call(array $ctxmap, ?BranchDataSubjectRequestContext $basectx): BranchDataSubjectRequestContext
    {
        return new BranchDataSubjectRequestContext($ctxmap, $basectx);
    }
}
