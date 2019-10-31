<?php

namespace App\Http\Controllers\Api\Settings;

use App\Exceptions\Api\ThemeNotConfiguredException;
use App\Http\Controllers\Api\ApiController;
use App\Models\Permission;
use Flugg\Responder\Http\MakesResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

/**
 * This controller manages the theme settings of an user.
 *
 * @author Enzo Innocenzi <enzo@innocenzi.dev>
 */
class ThemeController extends ApiController
{
    use MakesResponses;

    const THEMES = ['light', 'dark'];

    /**
     * Sets the theme for the current user.
     *
     * @param string $theme
     *
     * @return Response
     */
    public function set(Request $request)
    {
        $this->authorize(Permission::UPDATE_SETTINGS);

        ['theme' => $theme] = $request->validate([
            'theme' => Rule::in(self::THEMES),
        ]);

        Auth::user()->settings()->set('theme', $theme);

        return $this->success()->respond(Response::HTTP_NO_CONTENT);
    }

    /**
     * Deletes the theme setting entry for the user.
     *
     * @return Response
     */
    public function delete()
    {
        $this->authorize(Permission::UPDATE_SETTINGS);

        if (Auth::user()->settings()->has('theme')) {
            Auth::user()->settings()->forget('theme');
        } else {
            throw new ThemeNotConfiguredException();
        }

        return $this->success()->respond();
    }
}
