<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use DB;
use App\Comment;
use App\Posts;
use Validator;
use File;
use Storage;


class PostsController extends Controller
{
    public function __construct(){
        $this->middleware('auth',['except'=>['index']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        $posts = Posts::with(['user','comments'])->orderBy('created_at', 'DESC')->get();
        return response()->json($posts);
    }

    public function userPosts(){
        $user_id = auth()->user()->id;
        $user = User::find($user_id);
        return response()->json($user->posts);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Posts $posts)
    {
        $validate = Validator::make($request -> all(),[
            'body'=>'required|unique:posts,body',
            'postImage'=>'image|mimes:jpeg,png,jpg,gif,svg|nullable',
        ]);
        if ($validate ->fails()) {
            return response()->json(['errors'=>$validate->errors()],400);
        }
        
        $post = new Posts;
        $post->body = $request->input('body');
        $post->user_id = auth()->user()->id;;
        if($request->file('postImage')){
            $postImageNameAndExt = $request->file('postImage')->getClientOriginalName();
            $postImageName = pathinfo($postImageNameAndExt, PATHINFO_FILENAME);
            $postImageExt = pathinfo($postImageNameAndExt, PATHINFO_EXTENSION);
            $postImageToStore = $postImageName.'_'.time().'.'.$postImageExt;
            $post->image = $request->file('postImage')->move('images/posts/', $postImageToStore);
        }else{
            $post->image = NULL;
        }
        if($post->save()){
            return response()->json($posts);
        };
        
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $post = Posts::with('comments')->find($id);
    
        return response()->json($post);

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
        $post = Posts::find($id);

        if(auth()->user()->id == $post->user_id){
        $validate = Validator::make($request -> all(),[
            'body'=>'required|unique:posts,body,'.$id,
            'postImage'=>'image|mimes:jpeg,png,jpg,gif,svg|nullable',
        ]);
        if ($validate ->fails()) {
            return response()->json(['errors'=>$validate->errors()],400);
        }
            $post->body = $request->input('body');
            if($request->file('postImage')){
                File::delete($post->image);
                $postImageNameAndExt = $request->file('postImage')->getClientOriginalName();
                $postImageName = pathinfo($postImageNameAndExt, PATHINFO_FILENAME);
                $postImageExt = pathinfo($postImageNameAndExt, PATHINFO_EXTENSION);
                $postImageToStore = $postImageName.'_'.time().'.'.$postImageExt;
                $post->image = $request->file('postImage')->move('images/posts/', $postImageToStore);
                
            }

            if($post->save()){
                return response()->json($post);
            };
        }else {
            return response()->json(
                ['notOwner'=>'You can\'t do this, you aren\'t author'],
                400
            );
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Posts::find($id);
        if(auth()->user()->id == $post->user_id){

            if(File::exists($post->image))
            File::delete($post->image);
            if($post->delete()){
                return response()->json(['success'=>true]);
            };
        }else {
            return response()->json(
                ['notOwner'=>'You can\'t do this, you aren\'t author'],
                404
            );
        }
    }

    public function hasAuthorityToDo(){
        $post = Posts::find($id);
        if(auth()->user()->id == $post->user_id){
            return true;
            exit();
        }else {
            return false;
            exit();
        }
    }
}
