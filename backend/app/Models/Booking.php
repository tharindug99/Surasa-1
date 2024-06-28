<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'phone_num',
        'email',
        'facility',
        'start_time',
        'end_time',
        'event_name'
    ];

}
