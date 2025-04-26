<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('admin-dashboard.{id}', function ($user, $id) {
    if (!$user->hasRole('admin') || (int) $user->id !== (int) $id) {
        return false;
    }
    return true;
});
