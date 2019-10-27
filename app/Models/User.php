<?php

namespace App;

use App\Settings\HasSettings;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\HasMedia\HasMedia as HasMediaInterface;
use Spatie\MediaLibrary\HasMedia\HasMediaTrait as HasMedia;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable implements HasMediaInterface
{
    use Notifiable;
    use HasRoles;
    use HasMedia;
    use HasSettings;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'display_name',
    ];

    /**
     * Gets a display name for this user.
     *
     * @return string
     */
    public function getDisplayNameAttribute(): string
    {
        if ($this->first_name && $this->last_name) {
            return "{$this->first_name} {$this->last_name}";
        }

        if ($this->first_name) {
            return "{$this->first_name}";
        }

        return $this->username ?? __('auth.guest');
    }

    /**
     * Gets a profile picture for this user.
     *
     * @return string
     */
    public function getProfilePictureAttribute(): ?string
    {
        // use laravel-media from spatie
        // return Storage::disk('profile_pictures')->url('todo');
        return null;
    }
}
