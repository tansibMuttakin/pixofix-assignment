<?php

namespace App\Events;

use App\Models\File;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Broadcasting\ShouldBroadcastNow;

class FileAction implements ShouldBroadcastNow
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $file;
    public $user;
    public $action;
    public $metadata;
    public $timestamp;

    /**
     * Create a new event instance.
     */
    public function __construct(File $file, User $user, string $action, array $metadata = [])
    {
        $this->file = $file;
        $this->user = $user;
        $this->action = $action;
        $this->metadata = $metadata;
        $this->timestamp = now()->toIso8601String();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        return [
            new PrivateChannel('admin-dashboard.' . $this->user->id),
        ];
    }

    public function broadcastAs()
    {
        return 'FileAction';
    }

}
