# pngr
Server-side rendering of your webapp, for some reason.

## Usage
docker-compose example
```yaml
services:
  pngr:
    image: jamesrom/pngr
    container_name: pngr
    ports:
      - "80:8081"
    networks:
      - my-network
    environment:
      - LISTEN_PORT=8081                    # optional. default value: 8081
      - WIDTH=1920                          # optional. default value: 1920
      - HEIGHT=1080                         # optional. default value: 1080
      - UPSTREAM_URL=http://my-service:8080 # optional. default value: http://0.0.0.0

  my-service:
    image: "example/my-service:latest"
    container_name: my-service
    ports:
      - "8080:8080"
    networks:
      - my-network
    depends_on:
      - pngr
```

## Features
    * favicon support