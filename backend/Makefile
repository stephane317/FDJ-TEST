# set default shell
SHELL := $(shell which bash)
ENV = /usr/bin/env
# default shell options (-e is needed to break errors with ONESHELL)
.SHELLFLAGS = -e -c

MK_OPT = --no-print-directory

opt =
DEPLOY_ENV =
DEPLOY_VERSION = current

KUBECTL_AUTH =
K8S_NAMESPACE = integration
K8S_API_DEPLOYMENT = int-fdj-api
K8S_API_CONTAINER = api
K8S_API_INIT_CONTAINER = init-api

VERSION = $(shell git describe --tag --always)

FROM_CACHE = false
DK_BUILD_DIR =.
DK_FILE = Dockerfile
# DK_IMAGE = registry.gitlab.com/fdj/it/back-end/api
DK_SRC_TAG = 12.20
DK_TAG = $(VERSION)
LATEST_VERSION = false

.SILENT: ;               # no need for @
.ONESHELL: ;             # recipes execute in same shell
.NOTPARALLEL: ;          # wait for this target to finish
.EXPORT_ALL_VARIABLES: ; # send all vars to shell

########################################################################
default: help

help: ## display help for make commands
	grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
.PHONY: help

.PHONY: all
all: ## all main commands
	$(MAKE) $(MK_OPT) deps
	$(MAKE) $(MK_OPT) build

########################################################################
### dependencies commands

.PHONY: deps
deps: ## install all dependencies
	$(MAKE) $(MK_OPT) deploy_deps
	$(MAKE) $(MK_OPT) install_dev

.PHONY: install_dev
install_dev: ## install nodejs dependencies (with development dependencies)
	npm install

.PHONY: install
install: ## install nodejs dependencies (only production)
	npm install --production

.PHONY: install_ci
install_ci: ## install nodejs dependencies in CI environment
	npm ci

########################################################################
### check commands

.PHONY: lint
lint: ## lint files
	npm run lint

.PHONY: fmt
fmt: ## fix coding style
	npm run prettier

########################################################################
### test commands

.PHONY: test
test: ## run all test
	npm run test:only

.PHONY: test_cover
test_cover: ## run all test with code coverage
	npm run test:cover -- --logHeapUsage --runInBand --colors $(opt)

########################################################################
### build commands

.PHONY: build
build: ## build static files
	npm run build

########################################################################
### docker commands

.PHONY: _dk_pull
_dk_pull:
	echo "Pulling image $(DK_IMAGE):$(DK_TAG)"
	docker pull $(DK_IMAGE):$(DK_TAG) || true

.PHONY: _dk_tag
_dk_tag:
	echo "Tagging image $(DK_IMAGE):$(DK_TAG) to $(DK_IMAGE):$(DK_NEW_TAG)"
	docker tag $(DK_IMAGE):$(DK_TAG) $(DK_IMAGE):$(DK_NEW_TAG)

.PHONY: _dk_push
_dk_push:
	echo "Pushing image $(DK_IMAGE):$(DK_TAG)"
	docker push $(DK_IMAGE):$(DK_TAG)

.PHONY: _dk_build
_dk_build:
	set -eu; \
	echo "Building $(DK_IMAGE):$(DK_TAG) from parent image node:$(DK_SRC_TAG)"; \
	options="" ; \
	if [ "$(FROM_CACHE)" == "true" ]; then \
		options="--cache-from $(DK_IMAGE):$(DK_TAG)" ; \
	fi ; \
	$(ENV) docker build \
		-t $(DK_IMAGE):$(DK_TAG) \
		--build-arg SRC_TAG=$(DK_SRC_TAG) \
		--build-arg FDJ_API_VERSION=$(VERSION) \
		-f $(DK_FILE) \
		$(opt) \
		$(DK_BUILD_DIR) ;

.PHONY: docker_pull
docker_pull: ## pull docker image
	$(MAKE) $(MK_OPT) _dk_pull

.PHONY: docker_pull_latest
docker_pull_latest: ## pull latest docker image
	$(MAKE) $(MK_OPT) _dk_pull DK_TAG=latest

.PHONY: docker_build
docker_build: git_version ## build docker image
	$(MAKE) $(MK_OPT) _dk_build

.PHONY: docker_tag
docker_tag:
	set -eu; \
	if [ "$(LATEST_VERSION)" == "true" ]; then  \
		$(MAKE) $(MK_OPT) _dk_tag DK_NEW_TAG=latest ;\
	fi

.PHONY: docker_push
docker_push: ## push docker image
	set -eu; \
	$(MAKE) $(MK_OPT) _dk_push ;\
	if [ "$(LATEST_VERSION)" == "true" ]; then  \
		$(MAKE) $(MK_OPT) _dk_push DK_TAG=latest ;\
	fi

########################################################################
### kubectl commands

.PHONY: _k8s_lastest_rollout
_k8s_lastest_rollout:
	echo "Latest $(K8S_DEPLOYMENT) deployment rollout revision in namespace $(K8S_NAMESPACE)"
	kubectl $(KUBECTL_AUTH) rollout history -n $(K8S_NAMESPACE) deployment/$(K8S_DEPLOYMENT) | sed '/^$$/d' | tail -n 1 | cut -f 1 -d ' '

.PHONY: _k8s_rollout_status
_k8s_rollout_status:
	kubectl $(KUBECTL_AUTH) rollout status -w --timeout=20m -n $(K8S_NAMESPACE) deployment/$(K8S_DEPLOYMENT)

.PHONY: k8s_lastest_rollout
k8s_lastest_rollout: ## get latest kubernetes deployment rollout revision
	$(MAKE) $(MK_OPT) _k8s_lastest_rollout K8S_DEPLOYMENT=$(K8S_API_DEPLOYMENT)
	$(MAKE) $(MK_OPT) _k8s_lastest_rollout K8S_DEPLOYMENT=$(K8S_API_DEPLOYMENT)-cronjobs

.PHONY: k8s_rollout_status
k8s_rollout_status: ## watch for kubernetes deployment rollout status
	$(MAKE) $(MK_OPT) _k8s_rollout_status K8S_DEPLOYMENT=$(K8S_API_DEPLOYMENT)
	$(MAKE) $(MK_OPT) _k8s_rollout_status K8S_DEPLOYMENT=$(K8S_API_DEPLOYMENT)-cronjobs

.PHONY: k8s_update_image
k8s_update_image: ## update docker image on kubernetes deployment
	if [ "$(DEPLOY_VERSION)" == "current" ]; then \
		version=$(VERSION) ; \
	elif [ -n "$(DEPLOY_VERSION)" ]; then \
		version=$(DEPLOY_VERSION) ; \
	else \
		version=latest ; \
	fi ; \
	echo "Namespace : $(K8S_NAMESPACE)" ;\
	echo "Deployments :" ;\
	echo "  API : $(K8S_API_DEPLOYMENT)" ;\
	echo "Deploying Docker Image : $(DK_IMAGE):$$version" ;\
	kubectl $(KUBECTL_AUTH) -n $(K8S_NAMESPACE) set image deployment $(K8S_API_DEPLOYMENT) $(K8S_API_INIT_CONTAINER)=$(DK_IMAGE):$$version $(K8S_API_CONTAINER)=$(DK_IMAGE):$$version
	kubectl $(KUBECTL_AUTH) -n $(K8S_NAMESPACE) set image deployment $(K8S_API_DEPLOYMENT)-cronjobs $(K8S_API_CONTAINER)=$(DK_IMAGE):$$version

########################################################################
### ansistrano deploy commands

.PHONY: git_version
git_version:
	sh get_version.sh

.PHONY: deploy_k8s
deploy_k8s: ## deploy application on kubernetes
	$(MAKE) $(MK_OPT) k8s_lastest_rollout
	$(MAKE) $(MK_OPT) k8s_update_image
	$(MAKE) $(MK_OPT) k8s_lastest_rollout
	$(MAKE) $(MK_OPT) k8s_rollout_status

.PHONY: deploy_staging
deploy_staging: ## deploy application in staging namespace on staging kubernetes cluster
	$(MAKE) $(MK_OPT) deploy_k8s K8S_NAMESPACE=staging K8S_API_DEPLOYMENT=staging-fdj-api

.PHONY: deploy_integration
deploy_integration: ## deploy application in integration namespace on staging kubernetes cluster
	$(MAKE) $(MK_OPT) deploy_k8s K8S_NAMESPACE=integration K8S_API_DEPLOYMENT=int-fdj-api

.PHONY: deploy_production
deploy_production: ## deploy application in production namespace on production kubernetes cluster
	$(MAKE) $(MK_OPT) deploy_k8s K8S_NAMESPACE=production K8S_API_DEPLOYMENT=prod-fdj-api

.PHONY: deploy_preproduction
deploy_preproduction: ## deploy application in preproduction namespace on production kubernetes cluster
	$(MAKE) $(MK_OPT) deploy_k8s K8S_NAMESPACE=preproduction K8S_API_DEPLOYMENT=preprod-fdj-api

.PHONY: githooks
githooks: rm_githooks ## install git hooks
	find git-hooks -maxdepth 1 -type f -exec ln -v -sf ../../{} .git/hooks/ \;
	chmod a+x .git/hooks/*

.PHONY: rm_githooks
rm_githooks: ## uninstall local git hooks
	find .git/hooks -type l -exec rm -v {} \;