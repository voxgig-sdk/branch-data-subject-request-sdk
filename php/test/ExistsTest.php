<?php
declare(strict_types=1);

// BranchDataSubjectRequest SDK exists test

require_once __DIR__ . '/../branchdatasubjectrequest_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = BranchDataSubjectRequestSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
