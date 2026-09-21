<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiEndpointsTest extends TestCase
{
    use RefreshDatabase;

    public function test_health_endpoint_returns_operational(): void
    {
        $response = $this->getJson('/api/v1/health');

        $response->assertStatus(200)
            ->assertJson([
                'status' => 'operational',
                'platform' => 'Sovereign2Fresh Empire API',
            ]);
    }

    public function test_inquiry_submission_succeeds_with_valid_data(): void
    {
        $payload = [
            'name' => 'Alexandre Dubois',
            'email' => 'alex@enterprisecorp.com',
            'company' => 'Enterprise Corp',
            'service_type' => 'cybersecurity',
            'message' => 'Need an enterprise penetration audit and secure code review for our fintech backend.',
        ];

        $response = $this->postJson('/api/v1/inquiries', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('inquiries', [
            'email' => 'alex@enterprisecorp.com',
            'company' => 'Enterprise Corp',
        ]);
    }

    public function test_consultation_booking_succeeds(): void
    {
        $payload = [
            'company_name' => 'ScaleUp Systems Ltd',
            'contact_name' => 'Sarah Connor',
            'email' => 'sarah@scaleup.io',
            'squad_type' => 'dedicated_squad',
            'timeline' => 'Immediate',
            'notes' => 'Looking to augment 2 senior backend developers and 1 DevOps engineer.',
        ];

        $response = $this->postJson('/api/v1/consultations', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('consultations', [
            'email' => 'sarah@scaleup.io',
            'company_name' => 'ScaleUp Systems Ltd',
        ]);
    }

    public function test_newsletter_subscription_succeeds(): void
    {
        $payload = [
            'email' => 'developer@community.org',
        ];

        $response = $this->postJson('/api/v1/subscribe', $payload);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('subscribers', [
            'email' => 'developer@community.org',
        ]);
    }
}
