<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Inquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InquiryController extends Controller
{
    /**
     * Store a newly created contact inquiry from the React frontend.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:120',
            'email' => 'required|email|max:150',
            'company' => 'nullable|string|max:150',
            'phone' => 'nullable|string|max:40',
            'service_type' => 'nullable|string|max:80',
            'budget_range' => 'nullable|string|max:80',
            'timeline' => 'nullable|string|max:80',
            'message' => 'required|string|max:5000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $inquiry = Inquiry::create([
            'name' => $request->input('name'),
            'email' => strtolower(trim($request->input('email'))),
            'company' => $request->input('company'),
            'phone' => $request->input('phone'),
            'service_type' => $request->input('service_type', 'general_inquiry'),
            'budget_range' => $request->input('budget_range'),
            'timeline' => $request->input('timeline'),
            'message' => $request->input('message'),
            'status' => 'new',
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->header('User-Agent'), 0, 500),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Thank you. Your inquiry has been safely received. A Sovereign2Fresh Empire tech lead will review your submission and reply within 24 hours.',
            'data' => [
                'id' => $inquiry->id,
                'name' => $inquiry->name,
                'email' => $inquiry->email,
                'created_at' => $inquiry->created_at->toISOString(),
            ],
        ], 201);
    }

    /**
     * List inquiries (authenticated admin route).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Inquiry::query()->latest();

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        if ($request->has('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('company', 'like', "%{$search}%");
            });
        }

        $inquiries = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $inquiries,
        ]);
    }

    /**
     * Show single inquiry details.
     */
    public function show(int $id): JsonResponse
    {
        $inquiry = Inquiry::find($id);

        if (!$inquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Inquiry not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $inquiry,
        ]);
    }

    /**
     * Update inquiry status.
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:new,contacted,in_progress,resolved,archived',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $inquiry = Inquiry::find($id);
        if (!$inquiry) {
            return response()->json([
                'success' => false,
                'message' => 'Inquiry not found',
            ], 404);
        }

        $inquiry->update(['status' => $request->input('status')]);

        return response()->json([
            'success' => true,
            'message' => 'Status updated successfully',
            'data' => $inquiry,
        ]);
    }
}
