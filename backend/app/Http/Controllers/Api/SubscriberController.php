<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscriber;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SubscriberController extends Controller
{
    /**
     * Subscribe an email to insights and blog updates.
     */
    public function subscribe(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:150',
            'source' => 'nullable|string|max:80',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Please provide a valid email address.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $email = strtolower(trim($request->input('email')));
        $existing = Subscriber::where('email', $email)->first();

        if ($existing) {
            if ($existing->status !== 'active') {
                $existing->update(['status' => 'active']);
            }
            return response()->json([
                'success' => true,
                'message' => 'You are already subscribed to Sovereign2Fresh Empire insights!',
                'data' => [
                    'email' => $existing->email,
                    'status' => 'active',
                ],
            ]);
        }

        $subscriber = Subscriber::create([
            'email' => $email,
            'status' => 'active',
            'source' => $request->input('source', 'newsletter_optin'),
            'ip_address' => $request->ip(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you for subscribing to Sovereign2Fresh Empire tech publications.',
            'data' => [
                'email' => $subscriber->email,
                'created_at' => $subscriber->created_at->toISOString(),
            ],
        ], 201);
    }

    /**
     * List subscribers (admin).
     */
    public function index(): JsonResponse
    {
        $subscribers = Subscriber::latest()->paginate(50);

        return response()->json([
            'success' => true,
            'data' => $subscribers,
        ]);
    }
}
