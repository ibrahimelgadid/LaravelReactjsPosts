<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use Validator;
use File;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $validate = Validator::make($request -> all(),[
            'userAvatar'=>'required|image|mimes:jpeg,png,jpg,gif,svg|nullable',
        ]);
        if ($validate ->fails()) {
            return response()->json(['errors'=>$validate->errors()],400);
        }
            if($request->file('userAvatar')){
                File::delete($user->userAvatar);
                $userAvatarNameAndExt = $request->file('userAvatar')->getClientOriginalName();
                $userAvatarName = pathinfo($userAvatarNameAndExt, PATHINFO_FILENAME);
                $userAvatarExt = pathinfo($userAvatarNameAndExt, PATHINFO_EXTENSION);
                $userAvatarToStore = $userAvatarName.'_'.time().'.'.$userAvatarExt;
                $user->userAvatar = $request->file('userAvatar')->move('images/users', $userAvatarToStore);
                
            }

            if($user->save()){
                return response()->json('images/users/'.$userAvatarToStore);
            };
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
