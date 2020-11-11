<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/nutrition/test', function () {
    return response()->json([
        'success' => 'true',
    ]);
});

Route::post('/nutrition', function (Request $request) {
    $client = new Client();
    $input = $request->input('userInput');
    $app_id = config('services.edamam.id');
    $app_key = config('services.edamam.key');
    $res = $client->get(
        'https://api.edamam.com/api/nutrition-data?app_id=' . $app_id . '&app_key=' . $app_key . '&ingr=' . $input
    );
    return response()->json(json_decode($res->getBody()));
});
