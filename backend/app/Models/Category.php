<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ategory extends Model
{
    use HasFactory;

    public function getAvatarAttribute($avatar){
        return $avatar ? asset("/storage/categories/".$avatar) : null;
    }


//    protected $fillable = ['name', 'avatar'];
    public function products(){
        return $this->hasMany(Product::class);
    }
}
