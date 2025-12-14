<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\AppointmentController;

Route::options('/{any}', function () {
    return response()->json(['status' => 'ok']);
})->where('any', '.*');

//appointments
Route::post('/appointments', [AppointmentController::class, 'store']);
Route::get('/appointments/booked-slots', [AppointmentController::class, 'bookedSlots']);

//doctors
Route::get('/doctors', [DoctorController::class, 'index']);
Route::get('/doctors/{id}/availability', [DoctorController::class, 'availability']);
Route::get('/doctors/{doctor}/availability', [DoctorController::class, 'availability']);