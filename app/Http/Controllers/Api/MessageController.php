<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\AuditLog;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    /**
     * Display a listing of messages.
     */
    public function index(Request $request)
    {
        $query = Message::query();

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('subject', 'like', "%{$search}%")
                  ->orWhere('message', 'like', "%{$search}%");
            });
        }

        $messages = $query->orderBy('created_at', 'desc')
            ->paginate($request->get('per_page', 15));

        return response()->json($messages);
    }

    /**
     * Store a newly created message (from public form).
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        $message = Message::create($validated);

        return response()->json([
            'message' => 'Message sent successfully',
        ], 201);
    }

    /**
     * Display the specified message.
     */
    public function show(Message $message)
    {
        // Mark as read when viewed
        if ($message->status === 'unread') {
            $message->update(['status' => 'read']);
            AuditLog::log('read_message', "Read message from: {$message->name}");
        }

        return response()->json($message);
    }

    /**
     * Update the specified message status.
     */
    public function updateStatus(Request $request, Message $message)
    {
        $validated = $request->validate([
            'status' => 'required|in:unread,read,archived',
        ]);

        $message->update($validated);

        AuditLog::log('update_message_status', "Updated message status to: {$validated['status']}");

        return response()->json([
            'message' => $message,
            'message_text' => 'Message status updated successfully',
        ]);
    }

    /**
     * Remove the specified message.
     */
    public function destroy(Message $message)
    {
        $message->delete();

        AuditLog::log('delete_message', "Deleted message from: {$message->name}");

        return response()->json([
            'message' => 'Message deleted successfully',
        ]);
    }

    /**
     * Get message statistics.
     */
    public function statistics()
    {
        $stats = [
            'total' => Message::count(),
            'unread' => Message::where('status', 'unread')->count(),
            'read' => Message::where('status', 'read')->count(),
            'archived' => Message::where('status', 'archived')->count(),
        ];

        return response()->json($stats);
    }
}
