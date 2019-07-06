<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Comment;
use DB;
use Validator;
use App\Posts;

class CommentsController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }
 
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request -> all(),[
            'body'=>'required'
        ]);
        if ($validate ->fails()) {
            return response()->json(['errors'=>$validate->errors()],400);
        }
        $comment = new Comment;
        $comment->body = $request->input('body');
        $comment->user_id = auth()->user()->id;
        $comment->posts_id = $request->input('posts_id');
        $comment->save();
        
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
        $validate = Validator::make($request -> all(),[
            'body'=>'required'
        ]);
        if ($validate ->fails()) {
            return response()->json($validate->errors());
        }
        $user_id=auth()->user()->id;
        $posts_id = $request->input('posts_id');
        $comment = comment::find($id);
        $comment->body = $request->input('body');
        if($comment->save()){
            return response()->json($comment);
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
        $comment = comment::find($id);
        if($comment->delete()){
            return response()->json(['success'=>true]);
        }else {
            return response()->json(['success'=>false]);
        };
    }
}
