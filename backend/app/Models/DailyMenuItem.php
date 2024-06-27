<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DailyMenuItem extends Model
{
    use HasFactory;

    /* protected $fillable = [
         'product_id',
         'description',
         'image',
         'date'
     ];*/

    public function product()
    {
        return $this->belongsTo(Product::class);
    }


}
