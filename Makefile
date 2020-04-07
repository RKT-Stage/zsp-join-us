#!make

#include .env
#export $(shell sed 's/=.*//' .env)

.SILENT:

SHELL := /bin/bash
IMAGE=quay.io/riotkit/join-zsp
SUDO=sudo

help: ## This help screen
	@grep -E '^[a-zA-Z\-\_0-9\.@]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

	@echo ""
	@echo " Environment configuration:"
	@echo "> Main domain: ${MAIN_DOMAIN}${DOMAIN_SUFFIX}"
	@echo "> Debug status (1/0): ${IS_DEBUG_ENVIRONMENT}"
	@echo "> Non-root user that will own git repositories files: ${USER}"
	@echo "> Non-root group id: ${GROUP_ID}"

## Start a development server
start@dev:
	hugo server -D

## Build the application
build:
	hugo

## Build docker image
image:
	${SUDO} docker build . -f ./Dockerfile -t ${IMAGE}:latest

## Push docker image
push_image:
	${SUDO} docker push ${IMAGE}:latest
