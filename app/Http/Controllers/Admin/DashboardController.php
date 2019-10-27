<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Redirect to the dashboard's index.
     *
     * @return Response
     */
    public function index(): Response
    {
        $this->authorize(Permission::ACCESS_ADMIN_PANEL);

        return Inertia::render('Admin/Dashboard/Index');
    }
}
