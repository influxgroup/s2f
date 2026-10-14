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
            'file' => 'required|image|mimes:jpeg,png,jpg,webp,svg,gif|max:10240', // Max 10MB
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
    }
}
