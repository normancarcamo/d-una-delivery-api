# d-una-delivery-api
API for the delivery app D->una.

1. you should have docker installed and running
2. run: `docker-compose up -d --build`
4. check logs: `docker-compose logs` -

    you should see something like this:
  ```bash
    Server running on port 3000.
    MongoDB successfully connected to mongodb://dev:dev@duna_delivery_api_mongo:27017/dev
  ```
5. Try making a request to `/ping` and you will get `pong` as response.
