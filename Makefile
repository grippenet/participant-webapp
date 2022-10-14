DOCKER_OPTS ?= --rm
DOCKER_ENV ?= env.default
DOCKER_TAG ?= github.com/influenzanet/web-app
# TEST_ARGS = -v | grep -c RUN
GIT_VERSION := $(shell git describe --tags --abbrev=0)
VERSION ?= $(GIT_VERSION)

help:
	@echo "Service building targets"
	@echo "  docker: build docker container for web-app"
	@echo "Env:"
	@echo "  DOCKER_OPTS : default docker build options (default : $(DOCKER_OPTS))"
	@echo "  VERSION : default docker build options (default : git tag version)"

docker:
	docker build -t $(DOCKER_TAG):$(VERSION)  -f Dockerfile $(DOCKER_OPTS) --build-arg ENV_FILE=$(DOCKER_ENV) .
