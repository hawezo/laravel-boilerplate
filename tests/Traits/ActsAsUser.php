<?php

namespace Tests\Traits;

use App\User;

trait ActsAsUser
{
    /**
     * Acts as an user with specific roles and permissions.
     *
     * @param array|string|null $withPermissions
     * @param array|string|null $withRoles
     *
     * @return $this
     */
    protected function actingAsUser($withPermissions = [], $withRoles = [], array $attributes = []): self
    {
        return $this->actingAs(factory(User::class)->create($attributes)
            ->givePermissionTo($withPermissions)
            ->assignRole($withRoles)
        );
    }
}
