<?php

namespace App\Exceptions;

use Exception;
use Flugg\Responder\Exceptions\ConvertsExceptions;
use Flugg\Responder\Exceptions\Http\HttpException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Support\Facades\App;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class Handler extends ExceptionHandler
{
    use ConvertsExceptions;

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
        // Handles API exceptions first.
        if ($response = $this->isApiException($request, $exception)) {
            return $response;
        }

        // Handles Inertia exceptions second.
        return $this->handleInertiaException($request, $exception);
    }

    /**
     * Renders an exception into an API response.
     *
     * @param \Illuminate\Http\Request $request
     * @param Exception                $exception
     *
     * @return Illuminate\Http\JsonResponse|null
     */
    private function isApiException($request, Exception $exception)
    {
        if ($request->expectsJson() || $exception instanceof HttpException) {
            $this->convertDefaultException($exception);

            return $this->renderResponse($exception);
        }

        return null;
    }

    /**
     * Render an exception into an Inertia response, as long
     * as the application is not in a local environment.
     *
     * @param \Illuminate\Http\Request $request
     * @param Exception                $exception
     *
     * @return \Illuminate\Contracts\Support\Responsable
     */
    private function handleInertiaException($request, Exception $exception)
    {
        $response = parent::render($request, $exception);

        if ($this->shouldRenderInertiaError($response->status())) {
            return Inertia::render('Security/Error', ['code' => $response->status()])
                ->toResponse($request)
                ->setStatusCode($response->status());
        }

        return $response;
    }

    /**
     * Checks if the given HTTP status should render an error page.
     *
     * @param int $status
     *
     * @return bool
     */
    private function shouldRenderInertiaError(int $status)
    {
        return !App::environment('local') && in_array($status, [
            Response::HTTP_INTERNAL_SERVER_ERROR,
            Response::HTTP_SERVICE_UNAVAILABLE,
            Response::HTTP_NOT_FOUND,
            Response::HTTP_FORBIDDEN,
        ]);
    }
}
