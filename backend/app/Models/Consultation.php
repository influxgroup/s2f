<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Consultation extends Model
{
    protected $fillable = [
        'company_name',
        'contact_name',
        'email',
        'phone',
        'squad_type',
        'timeline',
        'notes',
        'status',
        'ip_address',
        'user_agent',
    ];
}
