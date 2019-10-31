<?php

namespace App\Http\Controllers\Api;

use App\Exceptions\Api\AccessDeniedException;
use App\Http\Controllers\Controller;
use Flugg\Responder\Http\MakesResponses;
use Illuminate\Contracts\Auth\Access\Gate;

/**
 * This abstract controller offers methods for common API actions.
 *
 * @author Enzo Innocenzi <enzo@innocenzi.dev>
 */
abstract class ApiController extends Controller
{
    use MakesResponses;

    /**
     * Authorize a given action for the current user.
     *
     * @param mixed       $ability
     * @param mixed|array $arguments
     *
     * @return \Illuminate\Auth\Access\Response
     *
     * @throws \Illuminate\Auth\Access\AuthorizationException
     */
    public function authorize($ability, $arguments = [])
    {
        [$ability, $arguments] = $this->parseAbilityAndArguments($ability, $arguments);

        if (app(Gate::class)->denies($ability, $arguments)) {
            throw new AccessDeniedException($ability);
        }
    }
}
