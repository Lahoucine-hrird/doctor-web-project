<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Doctor;
use App\Models\Appointment;
use Carbon\Carbon;


class DoctorController extends Controller
{
    // GET /api/doctors
    public function index()
    {
        return response()->json(Doctor::all());
    }
    // GET /api/doctors/{id}/availability?date=YYYY-MM-DD
  public function availability($doctorId, Request $request)
{
    $date = $request->query('date');
    $appointments = Appointment::where('doctor_id', $doctorId)
        ->whereDate('start_time', $date)
        ->get();

    return response()->json($appointments);
}

}
