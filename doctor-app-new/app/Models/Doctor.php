<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Doctor extends Model
{
     
    protected $fillable = [
        'name',
        'specialization',
    ];

    // Relationship: Doctor → Appointments
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }
}
