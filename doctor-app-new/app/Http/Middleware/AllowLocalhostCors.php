<?php

namespace App\Http\Middleware;

use Closure;

class AllowLocalhostCors
{
    public function handle($request, Closure $next)
    {
        $response = $next($request);

        if ($request->header('origin') && str_contains($request->header('origin'), 'localhost')) {
            $response->headers->set('Access-Control-Allow-Origin', $request->header('origin'));
            $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        }

        return $response;
    }
}
