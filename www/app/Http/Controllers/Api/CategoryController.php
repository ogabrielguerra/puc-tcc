<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use App\Category;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Response;
use App\Service\CategoryService;

class CategoryController extends Controller
{
    public function index(){
        return Category::all();
    }
    public function show($id){
        $category = CategoryService::getCategoryById($id);
        return $this->jsonResponseinUtf8($category);
    }

    public function add(Request $request){
        if (!isset($request->name) || empty($request->name)){
            return Response::json(['status'=>'failed', 'reason'=>'name is null'], 400);
        }

        if(count(Category::where('name', '=', $request->name)->get()->toArray())>0){
            return Response::json(['status'=>'Unprocessable Entity.', 'reason'=>'Category already exists.'], 422);
        }

        try {
            $category = new Category;
            $category->name = $request->name;
            $category->save();
            return Response::json(['status'=>'success', 'id'=>$request->id], 200);
        }catch(QueryException | \Exception $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function update(Request $request){
        if (!isset($request->id) || empty($request->id)){
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }

        $updateData['name'] = $request->name;

        try {
            Category::where('id', $request->id)->update($updateData);
            return Response::json(['status'=>'success'], 200);
        }catch(QueryException $e){
            return Response::json(['status'=>'failed', 'reason'=>$e->getMessage()], 422);
        }
    }

    public function delete(Request $request){
        if (!isset($request->id) || empty($request->id)){
            return Response::json(['status'=>'failed', 'reason'=>'id is null'], 400);
        }

        Category::where('id', $request->id)->forceDelete();
        return Response::json(['status'=>'success', 'id'=>$request->id], 200);
    }

}
