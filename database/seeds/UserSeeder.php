<?php

use App\Models\Role;
use App\User;
use Illuminate\Database\Seeder;

/**
 * Seeds the database with test users.
 *
 * @author Enzo Innocenzi <enzo@innocenzi.dev>
 */
class UserSeeder extends Seeder
{
    /**
     * Map of test users with test roles.
     *
     * @var array
     */
    private $map = [
        'dev'   => Role::DEVELOPER,
        'admin' => Role::ADMINISTRATOR,
        'guest' => Role::GUEST,
    ];

    /**
     * Run the database seeds.
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        foreach ($this->map as $username => $role) {
            User::firstOrCreate(['username' => $username], [
                'first_name' => $faker->firstName(),
                'last_name'  => $faker->lastName,
                'email'      => "{$username}@localhost",
                'password'   => bcrypt($username),
            ])->assignRole($role);
        }
    }
}
