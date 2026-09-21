<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inquiry extends Model
{
    protected $fillable = [
        'name',
        'email',
        'company',
        'phone',
        'service_type',
        'budget_range',
        'timeline',
        'message',
        'status',
        'ip_address',
        'user_agent',
    ];
}
