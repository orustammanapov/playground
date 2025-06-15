# Makefile for running Open WebUI Docker container

IMAGE = ghcr.io/open-webui/open-webui:main
CONTAINER_NAME = open-webui
PORTS = -p 3000:8080
VOLUME = -v open-webui:/app/backend/data

.PHONY: run stop remove logs

run:
	docker run -d $(PORTS) $(VOLUME) --name $(CONTAINER_NAME) $(IMAGE)

stop:
	docker stop $(CONTAINER_NAME)

remove:
	docker rm -f $(CONTAINER_NAME)

logs:
	docker logs -f $(CONTAINER_NAME)

