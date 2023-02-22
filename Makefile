# set default shell
SHELL := $(shell which bash)
ENV = /usr/bin/env
DKC = docker-compose
DK = docker

UID = $(shell id -u)
GID = $(shell id -g)

cmd = bash
# default shell options
.SHELLFLAGS = -c

META_BIN = meta

opt =

dkc_file = -f docker-compose.yml

.SILENT: ;               # no need for @
.ONESHELL: ;             # recipes execute in same shell
.NOTPARALLEL: ;          # wait for this target to finish
.EXPORT_ALL_VARIABLES: ; # send all vars to shell

########################################################################
default: help

.PHONY: help
help: ## display help for make commands
	grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

.PHONY: all
all: ## all main commands
	$(MAKE) rm
	$(MAKE) pull
	$(MAKE) build
	$(MAKE) vendor
	$(MAKE) build_apps
	$(MAKE) up


########################################################################
### Docker application commands

.PHONY: vendor
vendor: ## install all applications dependencies $(MAKE) vendor_front
	$(MAKE) vendor_api

.PHONY: vendor_front
vendor_front: volumes ## install frontend dependencies
	echo "Frontend: installing NodeJS NPM packages"
	$(MAKE) run_front cmd="make install_dev"

.PHONY: vendor_api
vendor_api: volumes ## install API dependencies
	echo "API: installing NodeJS NPM packages"
	$(MAKE) run_api cmd="npm i"

.PHONY: build_apps
build_apps: ## build all applications $(MAKE) build_front
	$(MAKE) build_api
	

.PHONY: build_front
build_front: volumes ## build frontend
	echo "Frontend: building"
	$(MAKE) run_front cmd="npm run build:development"

.PHONY: build_api
build_api: volumes ## build API
	echo "API: building"
	$(MAKE) run_api cmd="make build"

.PHONY: run_front
run_front: volumes ## run frontend docker container (CLI)
	$(MAKE) run svc=front

.PHONY: run_api
run_api: volumes ## run API docker container (CLI)
	$(MAKE) run svc=api

### Docker commands

.env: # create dotenv file for docker compose
	cp -v .env.dist .env

.PHONY: volumes
volumes: .env ## create volumes
	mkdir -v -p \
	logs/api \
	npm_cache/backend \
	npm_cache/frontend

.PHONY: pull
pull:  ## pull docker source images
	$(ENV) $(DK) pull alpine:latest

.PHONY: build
build: volumes ## build docker images
	$(ENV) $(DKC) $(dkc_file) build $(opt) $(svc)

.PHONY: ps
ps: volumes ## list all running docker containers
	$(ENV) $(DKC) $(dkc_file) ps $(opt) $(svc)

.PHONY: stop
stop: volumes ## stop all docker containers
	$(ENV) $(DKC) $(dkc_file) stop $(opt) $(svc)

.PHONY: rm
rm: stop ## stop and destroy all docker containers
	$(ENV) $(DKC) $(dkc_file) rm -f -v $(opt) $(svc)

.PHONY: down
down: volumes ## stop and destroy all docker containers, Named Volumes and networks
	$(ENV) $(DKC) $(dkc_file) down -v --remove-orphans
	# sudo rm -rf db_data

## Docker logs commands

.PHONY: config
config: volumes ## list docker compose configuration
	$(ENV) $(DKC) $(dkc_file) config $(opt) $(svc)

.PHONY: config_trace
config_trace: ## list docker compose configuration (with jaeger tracing)
	$(MAKE) config dkc_file="$(dkc_file_trace)"

.PHONY: log
log: volumes ## display docker containers logs (use variable svc=<service> to display only logs for this service)
	$(ENV) $(DKC) $(dkc_file) logs $(opt) $(svc)

.PHONY: log_trace
log_trace: ## display docker containers logs (use variable svc=<service> to display only logs for this service) (with jaeger tracing)
	$(MAKE) log dkc_file="$(dkc_file_trace)"

.PHONY: logf
logf: volumes ## display and follow  docker containers logs output (use variable svc=<service> to display only logs for this service)
	$(ENV) $(DKC) $(dkc_file) logs -f $(opt) $(svc)

.PHONY: log_front
log_front: volumes ## display api logs
	$(MAKE) logf svc=front

.PHONY: log_api
log_api: volumes ## display API logs
	$(MAKE) logf svc=api

.PHONY: log_db
log_db1: volumes ## display Mongodb primary server logs
	$(MAKE) logf svc=db

## docker run commands

.PHONY: up
up: ## run all docker containers as daemons (in background)
	$(MAKE) _upd
	$(MAKE) ps

.PHONY: _upd
_upd: volumes
	$(ENV) $(DKC) $(dkc_file) up -d $(opt) $(svc)

.PHONY: run
run: volumes ## run a standalone docker container in foreground  (CLI) (use variable svc=<service> to choose which service and cmd=<command> to choose wich command to execute default = bash)
	$(ENV) $(DKC) $(dkc_file) run --rm $(opt) $(svc) $(cmd)

## mongo commands

.PHONY: restore
restore: 
	mongorestore --uri mongodb://app:app@localhost:27017 --db fdj-dev db_dump/sports
