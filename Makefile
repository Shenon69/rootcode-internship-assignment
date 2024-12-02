IMAGE_NAME = rootmedia
HOST_PORT = 3000
CONTAINER_PORT = 3000

help:
	@echo "Available commands:"
	@echo "  make build         - Build the Docker image"
	@echo "  make run HOST_PORT=<port> - Run the Docker container on the specified host port"
	@echo "  make help          - Show this help message"

build:
	docker build -f Dockerfile -t $(IMAGE_NAME) .

run:
	docker run -it -p $(HOST_PORT):$(CONTAINER_PORT) $(IMAGE_NAME)
