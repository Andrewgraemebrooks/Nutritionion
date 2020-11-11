# Nutritionion

![Nutritionion](media/logo.png)

## What is the project?

Nutritionion is a web application, built in React and Laravel, that allows the user to input any ingredient they wish and receive the nutritional information on the inputted ingredient. The user can build a list of the ingredients to see all the nutritional information of their recipes or grocery list in its entirety.

## Installation

To install, clone the directory using the command:

`git clone https://github.com/Andrewgraemebrooks/Nutritionion.git`

After cloning the files run the following npm command to install dependencies:

`composer install && npm install`

When downloaded the developer must create their own `.env` file here. An example configuration file has been provided `.env.example`. The developer must input their own `APP ID` and `APP KEY` for the [Edamam Nutrition API](https://developer.edamam.com/edamam-nutrition-api). The key and id must be placed in the `EDAMAM_APP_ID` and `EDAMAM_APP_KEY` fields in the .env file.

## Usage

I have included a npm script that runs both the laravel server-side, with `php artisan serve` and the react client-side `npm run watch`. 

Run `npm run concurrently`

The user can then search for any ingredient and the application will fetch the nutritional information for it.

## License

Nutritionion is [MIT-Licensed](LICENSE)
