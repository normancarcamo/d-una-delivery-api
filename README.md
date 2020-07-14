# d-una-delivery-api
API for the delivery app D->una.

1. `git clone https://github.com/normancarcamo/d-una-delivery-api.git`

    you should have docker installed and running

2. `docker-compose up -d --build`
3. check logs: `docker-compose logs` -

    you should see something like this:
  ```bash
    Server running on port 3000.
    MongoDB successfully connected to mongodb://dev:dev@duna_delivery_api_mongo:27017/dev
  ```

## Endpoints:

- /ping

        pong

- /seed

        ok
