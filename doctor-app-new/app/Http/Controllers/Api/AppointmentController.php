<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Appointment;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AppointmentController extends Controller
{
     // POST /api/appointments
   public function store(Request $request)
{
    $request->validate([
        'doctor_id'    => 'required|exists:doctors,id',
        'patient_name' => 'required|string',
        'start_time'   => 'required|date_format:Y-m-d H:i:s',
    ]);

    $startTime = Carbon::parse($request->start_time);
    $endTime = $startTime->copy()->addMinutes(30);

    if (!in_array($startTime->minute, [0, 30])) {
        return response()->json([
            'message' => 'Invalid time slot. Must be on the hour or half-hour.'
        ], 422);
    }

    try {
        $appointment = DB::transaction(function () use ($request, $startTime, $endTime) {

            $exists = Appointment::where('doctor_id', $request->doctor_id)
                ->where('start_time', '<', $endTime)  // existing start < 16:30
                ->where('end_time', '>', $startTime)  // existing end > 16:00
                ->lockForUpdate()
                ->exists();


            if ($exists) {
                throw new \Exception('Slot was just booked. Please choose another time.');
            }

            return Appointment::create([
                'doctor_id'    => $request->doctor_id,
                'patient_name' => $request->patient_name,
                'start_time'   => $startTime,
                'end_time'     => $endTime,
                'status'       => 'booked',
            ]);
        });

        return response()->json($appointment, 201);

    } catch (\Exception $e) {
        return response()->json([
            'message' => $e->getMessage()
        ], 409);
    }
}

// GET booked slots for doctor + date
    public function bookedSlots(Request $request)
    {
        $request->validate([
            'doctor_id' => 'required',
            'date' => 'required|date',
        ]);

        $appointments = Appointment::where('doctor_id', $request->doctor_id)
            ->whereDate('start_time', $request->date)
            ->get();

        return response()->json([
            'booked_slots' => $appointments->map(fn ($a) =>
                Carbon::parse($a->start_time)->format('H:i')
            )
        ]);
    }


}
