<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
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
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $exception)
{
	 // detect instance
     if ($exception instanceof UnauthorizedHttpException) {
        // detect previous instance
        if ($exception->getPrevious() instanceof TokenExpiredException) {
            return response()->json(['status' => 'token_expired'], $exception->getStatusCode());
        }
        else if ($exception->getPrevious() instanceof TokenInvalidException) {
            return response()->json(['status' => 'token_invalid'], $exception->getStatusCode());
        }
        else if ($exception->getPrevious() instanceof TokenBlacklistedException) {
            return response()->json(['status' => 'token_blacklisted'], $exception->getStatusCode());
        }
        else if($exception->getPrevious() instanceof UnauthorizedHttpException) {

            return response()->json('Unauthorized', 403);
      
          }
    }
	return parent::render($request, $exception);
}

  
}
