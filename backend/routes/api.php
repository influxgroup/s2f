<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ConsultationController;
use App\Http\Controllers\Api\InquiryController;
use App\Http\Controllers\Api\SubscriberController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Sovereign2Fresh Empire
|--------------------------------------------------------------------------
|
| All routes are prefixed with /api automatically.
| Version 1 routes are grouped under /api/v1.
|
*/

Route::prefix('v1')->group(function () {

    // ─── Health & Telemetry ───
    Route::get('/health', function () {
        return response()->json([
            'status' => 'operational',
            'platform' => 'Sovereign2Fresh Empire API',
            'version' => '1.0.0',
            'timestamp' => now()->toIso8601String(),
        ]);
    });

    // ─── Public Lead & Client Endpoints ───
    Route::post('/inquiries', [InquiryController::class, 'store']);
    Route::post('/consultations', [ConsultationController::class, 'store']);
    Route::post('/subscribe', [SubscriberController::class, 'subscribe']);

    // ─── Authentication ───
    Route::post('/auth/login', [AuthController::class, 'login']);

    // ─── Protected Admin Endpoints ───
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/auth/me', [AuthController::class, 'profile']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);

        Route::prefix('admin')->group(function () {
            // Inquiries Management
            Route::get('/inquiries', [InquiryController::class, 'index']);
            Route::get('/inquiries/{id}', [InquiryController::class, 'show']);
            Route::patch('/inquiries/{id}/status', [InquiryController::class, 'updateStatus']);

            // Consultation Bookings Management
            Route::get('/consultations', [ConsultationController::class, 'index']);
            Route::patch('/consultations/{id}/status', [ConsultationController::class, 'updateStatus']);

            // Subscribers
            Route::get('/subscribers', [SubscriberController::class, 'index']);
        });
    });
});
