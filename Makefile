DOCKER_OPTS ?= --rm
DOCKER_ENV ?= env-sample.config
DOCKER_TAG ?= github.com/influenzanet/web-app
# TEST_ARGS = -v | grep -c RUN
VERSION := $(shell git describe --tags --abbrev=0)

help:
	@echo "Service building targets"
	@echo "  docker: build docker container for web-app"
	@echo "Env:"
	@echo "  DOCKER_OPTS : default docker build options (default : $(DOCKER_OPTS))"

docker:
	docker build -t $(DOCKER_TAG):$(VERSION)  -f Dockerfile $(DOCKER_OPTS) --build-arg ENV_FILE=$(DOCKER_ENV) .
