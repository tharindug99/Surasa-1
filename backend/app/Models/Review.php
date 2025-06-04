<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // Import Storage facade

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'review_image', 
        'no_of_stars',
        'full_name',
        'comment',
        'status'
    ];

    protected $attributes = [
        'status' => 'pending', // Default status
    ];

    /**
     * Get the full URL for the review image.
     *
     * @param  string|null  $value
     * @return string|null
     */
    public function getReviewImageAttribute($value)
    {
        // $value here is the raw filename from the database
        if ($value) {
            // Check if it's already a full URL (e.g., from external source or previous incorrect save)
            if (filter_var($value, FILTER_VALIDATE_URL)) {
                return $value;
            }
            // Otherwise, assume it's a filename and construct the URL
            return asset('storage/reviews/' . $value);
        }
        return null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    protected static function boot()
    {
        parent::boot();
        static::deleting(function ($review) {
            if ($review->getRawOriginal('review_image')) { // Use getRawOriginal to get filename
                Storage::delete('public/reviews/' . $review->getRawOriginal('review_image'));
            }
        });
    }
}
