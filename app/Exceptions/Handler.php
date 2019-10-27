<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param \Exception $exception
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Exception               $exception
     *
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
    {
        $response = parent::render($request, $exception);

        // You can assign custom codes for every kind of exception you
        // want and convert this $exception into $yourException, so
        // you can provide more details to the view in a controlled way.
        // Your converter can map some exceptions to custom error codes,
        // and let other exceptions be 500 errors with a generic error code.

        if (in_array($response->status(), [
            Response::HTTP_INTERNAL_SERVER_ERROR,
            Response::HTTP_SERVICE_UNAVAILABLE,
            Response::HTTP_NOT_FOUND,
            Response::HTTP_FORBIDDEN,
        ])) {
            return Inertia::render('Security/Error', ['code' => $response->status()])
                ->toResponse($request)
                ->setStatusCode($response->status());
        }

        return $response;
    }
}
