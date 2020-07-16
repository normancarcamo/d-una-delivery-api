**Version 1.0.0**

# DUNA Delivery API

This project is intended to be used in the development process
of the delivery app with flutter.

- [Task](#task)
- [Requirements](#requirements)
- [Installation](#installation)
- [Endpoints](#endpoints)
- [Examples](/docs/readme/examples.md)
- [TODO](/docs/readme/todo.md)
- [Contributors](#contributors)
- [License](#License)

## Task

- Build an API to generate random data with recent timestamps like
createdAt, pickedAt, updatedAt, canceledAt, and so on.
- Generate endpoints for auth like: login, logout & recover.
- Generate endpoints for consuming orders, order and update orders information,
such as: cancel order, update delivery man location, rating & feedback orders.
- Generate endpoints to update user information like stats, avatar, etc.

## Requirements

1. node.js + npm - v12.18.x at the moment (lts). Try nvm if you don't want to
waste your time.
2. docker - this was developed in a mac using the v2.2.0.5
3. create a dotenv file, create one using the .env.example as reference, the env variables are used by docker-compose. see [.env.example](/.env) file.

    NOTE: The images for the products & the providers are currently not generated unless you provide an env variable called `PIXABAY_API_KEY`, the logic to download the images is already implemented, so if the variable is set with a valid api key, it will download the images for both entities, if not, there will be an error in the console, but only as a warning, it wont be a blocker for you. Images are needed thoug, so try to sign up on [pixabay.com](https://pixabay.com/) to get an api key and avoid testing the app without images.
    - `ACCESS_TOKEN_SECRET` & `REFRESH_TOKEN_SECRET` used to generate jwt tokens, but if you want a more secure key use `crypto` module from node directly in your terminal:
    ```bash
    crypto.randomBytes(32).toString('hex')
    'cad6759d8c22778143f45fbe8e094fd6b53e1a50ab91f04041e4597c074f9856'
    ```
4. [Mongo compass](https://www.mongodb.com/products/compass) - This is optional, but if you don't have an editor for mongo, this is a good alternative, the good thing is that is the official editor made by the mongo team.

## Installation

1. `git clone https://github.com/normancarcamo/d-una-delivery-api.git`

2. `docker-compose up -d --build`

3. `docker-compose logs -f`

    ctrl + c to cancel the logs (if you want, under the hood nodemon is running, so if you want to see the
output of your changes, open another terminal).

If everything is working ok, you should see something like this:
  ```bash
    Server running on port 3000.
    MongoDB successfully connected to mongodb://dev:dev@duna_delivery_api_mongo:27017/dev
  ```

## Endpoints:

This list represent the current endpoints to work with the flutter app, but for more details, check the `swagger.yml` file because it's being shared across the team, it's always being updated, the endpoints listed here are for development usage, some of them doesn't need all the production logic, that's why this repository was made.

- /auth/login - `POST`

    The main goal of this endpoint is to just being able to login.
The response back should be a Json Web Token with common claims.

- /auth/logout - `POST`

    Log out from the app, revokes the token.

- /auth/recover - `POST`

    Recover the password by sending the email address as payload.

- /orders - `GET`

    Retrieve a list of orders with pagination - 50 per-page.

- /orders/:order - `GET`

    Retrieve an order.

- /orders/:order/cancel - `PUT`

    Cancel an order.

- /seed - `POST`

    You can use this enpoint to generate mock data and save it into mongodb. If you send the param `files` in the payload it will generate json files in a directory called `files` in the current working directory.
    If you send the param `merge` the new data generated will be merged with the current stored.

    examples:

    ```bash
    # If you don't send the request as POST:
    curl http://localhost:3000/seed
    {"error":"Method Not allowed.","status":400}

    # When the request doesn't include payload:
    curl -X POST http://localhost:3000/seed
    {"message":"ok!"}

    # If you want to generate .json files:
    curl -d "files=true" -X POST http://localhost:3000/seed
    {"message":"ok!"}

    # If you want to merge the previous data with the new:
    curl -d "merge=true" -X POST http://localhost:3000/seed
    {"message":"ok!"}
    ```

- /ping - `ALL`

  The main idea of this endpoing is to use to test the api connection.

    ```bash
    # example:
    curl http://localhost:3000/ping
    pong
    ```

## Contributors

- Norman Carcamo <normancarcamo@gmail.com>

## License

© Norman Carcamo, Software Developer

Licensed under the [Apache License](LICENSE).
