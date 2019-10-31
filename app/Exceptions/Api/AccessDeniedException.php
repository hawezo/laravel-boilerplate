<?php

namespace App\Exceptions\Api;

use Flugg\Responder\Exceptions\Http\HttpException;
use Symfony\Component\HttpFoundation\Response;

/**
 * @author Enzo Innocenzi <enzo@innocenzi.dev>
 */
class AccessDeniedException extends HttpException
{
    /**
     * The HTTP status code.
     *
     * @var int|mixed
     */
    protected $status = Response::HTTP_FORBIDDEN;

    /**
     * The error code.
     *
     * @var string|null
     */
    protected $errorCode = 'access_denied';

    /**
     * Missing permissions that triggered this error.
     *
     * @var array
     */
    protected $missing = [];

    /**
     * Construct the exception class.
     *
     * @param string|array|null $missing
     * @param string|null       $message
     * @param array|null        $headers
     */
    public function __construct($missing = null, string $message = null, array $headers = null)
    {
        parent::__construct($this->status, $message ?? $this->message, null, $headers ?? $this->headers);

        $this->missing = is_array($missing) ? $missing : [$missing];
    }

    /**
     * Retrieve additional error data.
     *
     * @return array|null
     */
    public function data()
    {
        return [
            'missing' => $this->missing,
        ];
    }
}
