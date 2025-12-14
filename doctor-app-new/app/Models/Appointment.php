<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
     protected $fillable = [
        'doctor_id',
        'patient_name',
        'start_time',
        'end_time',
        'status',
    ];

 
    protected $casts = [
        'start_time' => 'datetime',
        'end_time'   => 'datetime',
    ];

    
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Doctor::class);
    }
}
