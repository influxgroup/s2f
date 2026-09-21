<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Consultation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConsultationController extends Controller
{
    /**
     * Store a new technical architecture consult request.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string|max:150',
            'contact_name' => 'required|string|max:120',
            'email' => 'required|email|max:150',
            'phone' => 'nullable|string|max:40',
            'squad_type' => 'nullable|string|max:80',
            'timeline' => 'nullable|string|max:80',
            'notes' => 'nullable|string|max:3000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $consultation = Consultation::create([
            'company_name' => $request->input('company_name'),
            'contact_name' => $request->input('contact_name'),
            'email' => strtolower(trim($request->input('email'))),
            'phone' => $request->input('phone'),
            'squad_type' => $request->input('squad_type'),
            'timeline' => $request->input('timeline'),
            'notes' => $request->input('notes'),
            'status' => 'pending',
            'ip_address' => $request->ip(),
            'user_agent' => substr((string) $request->header('User-Agent'), 0, 500),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Your confidential architecture consultation request has been booked. Our senior engineering squad will reach out within 24 hours.',
            'data' => [
                'id' => $consultation->id,
                'company_name' => $consultation->company_name,
                'contact_name' => $consultation->contact_name,
                'created_at' => $consultation->created_at->toISOString(),
            ],
        ], 201);
    }

    /**
     * List all consultation bookings (admin).
     */
    public function index(Request $request): JsonResponse
    {
        $query = Consultation::query()->latest();

        if ($request->has('status')) {
            $query->where('status', $request->query('status'));
        }

        $consultations = $query->paginate(20);

        return response()->json([
            'success' => true,
            'data' => $consultations,
        ]);
    }

    /**
     * Update consultation status.
     */
    public function updateStatus(Request $request, int $id): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|string|in:pending,scheduled,completed,cancelled',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $consultation = Consultation::find($id);
        if (!$consultation) {
            return response()->json([
                'success' => false,
                'message' => 'Consultation not found',
            ], 404);
        }

        $consultation->update(['status' => $request->input('status')]);

        return response()->json([
            'success' => true,
            'message' => 'Consultation status updated',
            'data' => $consultation,
        ]);
    }
}
