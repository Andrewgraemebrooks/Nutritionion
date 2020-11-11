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

/**
 * A test route to see if the nutrition API is working.
 */
Route::get('/nutrition/test', function () {
    return response()->json([
        'success' => 'true',
    ]);
});

/**
 * The route that accepts a request for nutritional information and returns the data from the Edamam API.
 */
Route::post('/nutrition', function (Request $request) {
    // GuzzleHttp Client to send a GET request to the Edamam API.
    $client = new Client();
    // The user's input.
    $input = $request->input('userInput');
    $app_id = config('services.edamam.id');
    $app_key = config('services.edamam.key');
    $res = $client->get(
        'https://api.edamam.com/api/nutrition-data?app_id=' . $app_id . '&app_key=' . $app_key . '&ingr=' . $input
    );
    // Return the response as a json.
    return response()->json(json_decode($res->getBody()));
});
