<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateSanctum
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Check if user is authenticated via Sanctum token
        if (!$request->user('sanctum')) {
            // If this is an Inertia request, redirect to login
            if ($request->header('X-Inertia')) {
                return redirect()->guest(route('login'));
            }
            
            // For API requests, return 401
            return response()->json(['message' => 'Unauthenticated'], 401);
        }

        return $next($request);
    }
}
