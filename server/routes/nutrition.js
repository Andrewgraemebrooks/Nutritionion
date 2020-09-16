/** Express router providing nutrition related routes
 * @module api/nutrition
 * @requires express
 */

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const config = require("../config/config");

// Example input
const exampleInput = encodeURI("1 Large Apple");

// Variables to store the configuration information.
const APP_ID = config.API_ID;
const APP_KEY = config.API_KEY;
const BASE_URL = config.BASE_URL;

/**
 * Route serving as a test.
 * @name /api/nutrition/test
 * @function
 * @param {string} path - Express path
 */
router.get("/test", (req, res) => {
  res.status(200).json({ NutritionRouteWorks: "The nutrition route works" });
});

/**
 * Route to retrieve inputted information.
 * @name /api/nutrition/
 * @function
 * @param {string} path - Express path
 */
router.get("/", (req, res) => {
  fetch(`${BASE_URL}app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${exampleInput}`, {
    method: "GET",
  })
    .then((fetchResponse) => fetchResponse.json())
    .then((fetchResponse) => res.status(200).send(fetchResponse))
    .catch((err) => console.log(err));
});

module.exports = router;
