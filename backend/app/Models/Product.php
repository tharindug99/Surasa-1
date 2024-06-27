<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;



    public function getAvatarAttribute($avatar){
        return $avatar ? asset("/storage/products/".$avatar) : null;
    }

//    protected $fillable = ['category_id', 'name', 'price', 'description', 'avatar'];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function dailyMenuItems()
    {
        return $this->hasMany(DailyMenuItem::class);
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

}
