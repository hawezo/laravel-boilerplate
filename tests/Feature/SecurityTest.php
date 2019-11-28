<?php

namespace Tests\Feature;

use App\Models\Permission;
use App\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;
use Tests\Traits\ActsAsUser;
use Tests\Traits\UsesInertia;

class SecurityTest extends TestCase
{
    use RefreshDatabase;
    use ActsAsUser;
    use UsesInertia;

    /**
     * Asserts that users are redirected to the login page if not logged in.
     *
     * @test
     */
    public function it_redirects_to_login_unauthenticated_users()
    {
        $this
            ->assertGuest()
            ->followingRedirects()
            ->get('/')
            ->assertOk()
            ->assertIsRoute('login')
        ;
    }

    /**
     * Asserts that authenticated users are redirected to their dashboard,
     * but are blocked when they don't have the required permissions.
     *
     * @test
     */
    public function it_redirects_authenticated_users_to_dashboard_but_blocks_unauthorized()
    {
        $this
            ->seed()
            ->actingAsUser()
            ->followingRedirects()
            ->get('/')
            ->assertForbidden()
            ->assertIsRoute('dashboard')
        ;
    }

    /**
     * Asserts that authenticated users are redirected to their dashboard,
     * and are not blocked when they have the required permissions.
     *
     * @test
     */
    public function it_redirects_authenticated_users_to_dashboard_but_allows_authorized()
    {
        $this
            ->seed()
            ->actingAsUser(Permission::ACCESS_DASHBOARD)
            ->followingRedirects()
            ->get('/')
            ->assertOk()
            ->assertIsRoute('dashboard')
        ;
    }

    /**
     * Asserts that an authenticated user with administration authorization
     * must confirm their password before accessing the admin panel.
     *
     * @test
     */
    public function it_asks_for_password_confirmation()
    {
        $this
            ->seed()
            ->actingAsUser(Permission::ACCESS_ADMIN_PANEL)
            ->followingRedirects()
            ->get('/admin/dashboard')
            ->assertOk()
            ->assertIsRoute('password.confirm')
        ;
    }

    /**
     * Asserts that an authenticated user with administration authorization
     * that has confirmed their password can access the dashboard.
     *
     * @test
     */
    public function it_does_not_ask_for_password_confirmation_if_recently_entered()
    {
        $this
            ->seed()
            ->actingAsUser(Permission::ACCESS_ADMIN_PANEL)
            ->withSession(['auth.password_confirmed_at' => time()])
            ->followingRedirects()
            ->get('/admin/dashboard')
            ->assertOk()
            ->assertIsRoute('admin.dashboard')
        ;
    }

    /**
     * Asserts that users can connect if they use correct credentials.
     *
     * @test
     */
    public function it_let_users_connect_with_correct_credentials()
    {
        /** @var User $user */
        $user = factory(User::class)->create([
            'password' => bcrypt($password = 'test-password'),
        ]);

        $this
            ->seed()
            ->followingRedirects()
            ->post(route('login.attempt'), [
                'username' => $user->username,
                'password' => $password,
            ])
            ->assertForbidden() // because the user hasn't ACCESS_DASHBOARD
            ->assertIsRoute('dashboard')
        ;

        $this->assertAuthenticatedAs($user);
    }

    /**
     * Asserts that users can connect.
     *
     * @test
     */
    public function it_denies_authentication_with_wrong_credentials()
    {
        $this
            ->seed()
            ->followingRedirects()
            ->post(route('login.attempt'), [
                'username' => Str::random(10),
                'password' => Str::random(10),
            ])
            ->assertOk()
            ->assertIsRoute('login')
        ;

        $this->assertGuest();
    }
}
