<?php

namespace App\Exceptions\Api;

use Flugg\Responder\Exceptions\Http\HttpException;
use Symfony\Component\HttpFoundation\Response;

/**
 * @author Enzo Innocenzi <enzo@innocenzi.dev>
 */
class ThemeNotConfiguredException extends HttpException
{
    /**
     * The HTTP status code.
     *
     * @var int|mixed
     */
    protected $status = Response::HTTP_UNPROCESSABLE_ENTITY;

    /**
     * The error code.
     *
     * @var string|null
     */
    protected $errorCode = 'theme_not_configured';
}
