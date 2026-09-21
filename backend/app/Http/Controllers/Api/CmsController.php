<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CmsContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CmsController extends Controller
{
    /**
     * Get all CMS content sections.
     */
    public function index(): JsonResponse
    {
        $sections = CmsContent::all()->pluck('data', 'section_key');

        return response()->json([
            'success' => true,
            'sections' => $sections,
        ]);
    }

    /**
     * Get a specific section.
     */
    public function show(string $key): JsonResponse
    {
        $content = CmsContent::where('section_key', $key)->first();

        if (!$content) {
            return response()->json([
                'success' => false,
                'message' => "Section '{$key}' not found",
            ], 404);
        }

        return response()->json([
            'success' => true,
            'section' => $content->data,
        ]);
    }

    /**
     * Save or update a specific section.
     */
    public function update(Request $request, string $key): JsonResponse
    {
        $data = $request->input('data', $request->all());

        $content = CmsContent::updateOrCreate(
            ['section_key' => $key],
            [
                'data' => $data,
                'updated_by' => $request->user()?->email ?? 'admin',
            ]
        );

        return response()->json([
            'success' => true,
            'message' => "Section '{$key}' updated successfully",
            'section' => $content->data,
        ]);
    }

    /**
     * Bulk save all sections.
     */
    public function bulkUpdate(Request $request): JsonResponse
    {
        $payload = $request->input('sections', []);

        foreach ($payload as $key => $data) {
            CmsContent::updateOrCreate(
                ['section_key' => $key],
                [
                    'data' => $data,
                    'updated_by' => $request->user()?->email ?? 'admin',
                ]
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'All sections updated successfully',
        ]);
    }
}
