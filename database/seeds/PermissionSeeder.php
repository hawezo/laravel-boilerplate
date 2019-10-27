<?php

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;
use Spatie\Permission\PermissionRegistrar;

/**
 * Seeds permission and roles to the database.
 *
 * @author Enzo Innocenzi <enzo@innocenzi.dev>
 *
 * @see https://www.dieterstinglhamber.me/blog/the-good-the-bad-and-the-ugly-of-seeding-data-in-production/
 */
class PermissionSeeder extends Seeder
{
    /**
     * An associative collection of roles and permissions.
     *
     * @return Collection
     */
    protected function getMap(): Collection
    {
        return Collection::make([
            // Dev
            Role::DEVELOPER => [
                Permission::BYPASS_EVERYTHING,
            ],

            // Administrators
            Role::ADMINISTRATOR => [
                Permission::ACCESS_ADMIN_PANEL,
                Permission::ACCESS_DASHBOARD,
                Permission::UPDATE_SETTINGS,
            ],

            // Guests
            Role::GUEST => [
                Permission::ACCESS_DASHBOARD,
                Permission::UPDATE_SETTINGS,
            ],
        ]);
    }

    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions and roles
        $this->createPermissions();
        $this->createRoles();
    }

    /**
     * Creates permissions.
     */
    protected function createPermissions()
    {
        Permission::updateOrCreate(['name' => Permission::BYPASS_EVERYTHING]);
        Permission::updateOrCreate(['name' => Permission::ACCESS_DASHBOARD]);
        Permission::updateOrCreate(['name' => Permission::ACCESS_ADMIN_PANEL]);
        Permission::updateOrCreate(['name' => Permission::UPDATE_SETTINGS]);
    }

    /**
     * Creates roles.
     */
    protected function createRoles()
    {
        $this->getMap()->each(function (array $do, string $role) {
            Role::updateOrCreate(['name' => $role])
                ->givePermissionTo($do);
        });
    }
}
