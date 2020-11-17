<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class CardList extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'board_id'
    ];

    public function cards(): HasMany
    {
        return $this->hasMany(Card::class, 'list_id');
    }

    public function board():BelongsTo
    {
        return $this->belongsTo(Board::class, 'board_id');
    }
}
