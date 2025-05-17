<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens; // If using Sanctum
// use Laravel\Passport\HasApiTokens; // If using Passport

class Admin extends Authenticatable
{
    use HasApiTokens; // Include if using Sanctum/Passport

    protected $fillable = [
        'name',
        'phone_num',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
