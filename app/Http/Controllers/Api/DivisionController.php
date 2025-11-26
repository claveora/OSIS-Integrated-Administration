<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Division;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class DivisionController extends Controller
{
    /**
     * Display a listing of divisions.
     */
    public function index()
    {
        $divisions = Division::withCount(['users', 'prokers'])->get();
        
        return response()->json($divisions);
    }

    /**
     * Store a newly created division.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $division = Division::create($validated);

        AuditLog::log('create_division', "Created division: {$division->name}");

        return response()->json([
            'division' => $division,
            'message' => 'Division created successfully',
        ], 201);
    }

    /**
     * Display the specified division.
     */
    public function show(Division $division)
    {
        return response()->json($division->load(['users', 'prokers']));
    }

    /**
     * Update the specified division.
     */
    public function update(Request $request, Division $division)
    {
        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
        ]);

        $division->update($validated);

        AuditLog::log('update_division', "Updated division: {$division->name}");

        return response()->json([
            'division' => $division,
            'message' => 'Division updated successfully',
        ]);
    }

    /**
     * Remove the specified division.
     */
    public function destroy(Division $division)
    {
        $name = $division->name;
        $division->delete();

        AuditLog::log('delete_division', "Deleted division: {$name}");

        return response()->json([
            'message' => 'Division deleted successfully',
        ]);
    }
}
