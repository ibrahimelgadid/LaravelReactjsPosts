<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Hash;

class AuthController extends Controller
{

        /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    
    public function register(Request $request)
    {
        $validate = Validator::make($request -> all(),[
            'email' => 'required|email|unique:users,email',
            'name'=>'required',
            'password'=>'required|min:1',
            'password2'=>'same:password'
        ]);
        if ($validate ->fails()) {
            return response()->json(['errors'=>$validate->errors()],400);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        // $user->password2 = $request->password2;
        $user->password = Hash::make($request->password);
        $user->save();
 
        return response()->json([
            'success' => true,
            'data' => $user
        ], 200);
    }



    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (! $token = auth('')->attempt($credentials)) {
            return response()->json([
                'errors' => ['emailOrPass'=>'Invalid Email or Password'],
            ], 400);
        }

        return $this->respondWithToken($token);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }
}
