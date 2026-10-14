<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class MediaController extends Controller
{
    /**
     * Upload an image or media asset from the Admin CMS.
     */
    public function upload(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|mimes:jpeg,png,jpg,webp,svg,gif,ico|max:10240', // Max 10MB, supports SVGs & icons
            'folder' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Image validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $file = $request->file('file');
        $rawFolder = $request->input('folder', 'cms');
        $folder = preg_replace('/[^a-zA-Z0-9_\-\/]/', '', (string) $rawFolder) ?: 'cms';

        $extension = $file->getClientOriginalExtension() ?: 'png';
        $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
        $safeBaseName = Str::slug($originalName) ?: 'asset';
        $filename = $safeBaseName . '-' . Str::random(8) . '.' . $extension;

        // Clean any output buffer so PHP notices never corrupt the JSON payload
        if (ob_get_length()) {
            ob_clean();
        }

        try {
            // Ensure directory exists on public disk
            if (!Storage::disk('public')->exists($folder)) {
                Storage::disk('public')->makeDirectory($folder);
            }

            // Store to public disk: storage/app/public/{folder}/{filename}
            $storedPath = $file->storeAs($folder, $filename, 'public');

            // URL accessible via public web
            $url = asset('storage/' . $storedPath);

            return response()->json([
                'success' => true,
                'message' => 'Image uploaded successfully.',
                'data' => [
                    'url' => $url,
                    'path' => $storedPath,
                    'filename' => $filename,
                    'original_name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                ],
            ], 201);
        } catch (\Throwable $e) {
            // If disk write encounters permission restriction on shared hosting, return inline DataURL
            $mime = $file->getMimeType() ?: 'image/png';
            $dataUrl = 'data:' . $mime . ';base64,' . base64_encode(file_get_contents($file->getRealPath()));

            return response()->json([
                'success' => true,
                'message' => 'Image processed via inline data URL fallback.',
                'data' => [
                    'url' => $dataUrl,
                    'path' => null,
                    'filename' => $filename,
                    'original_name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime_type' => $mime,
                ],
            ], 200);
        }
    }
}
