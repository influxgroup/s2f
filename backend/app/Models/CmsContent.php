<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CmsContent extends Model
{
    use HasFactory;

    protected $table = 'cms_contents';

    protected $fillable = [
        'section_key',
        'data',
        'updated_by',
    ];

    protected $casts = [
        'data' => 'array',
    ];
}
