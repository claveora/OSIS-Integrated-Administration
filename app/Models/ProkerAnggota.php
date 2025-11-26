<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProkerAnggota extends Model
{
    use HasFactory;

    protected $table = 'proker_anggota';

    protected $fillable = [
        'proker_id',
        'user_id',
        'role',
    ];

    /**
     * Get the proker that owns the anggota.
     */
    public function proker(): BelongsTo
    {
        return $this->belongsTo(Proker::class);
    }

    /**
     * Get the user that owns the anggota.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
