#!make

#include .env
#export $(shell sed 's/=.*//' .env)

.SILENT:

SHELL := /bin/bash
IMAGE=quay.io/riotkit/join-zsp
SUDO=sudo

help: ## This help screen
	@grep -E '^[a-zA-Z\-\_0-9\.@]+:.*?## .*$$' Makefile | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

start@dev: ## Start a development server
	hugo server -D

build: ## Build the application
	hugo

image: ## Build docker image
	${SUDO} docker build . -f ./Dockerfile -t ${IMAGE}:latest

push_image: ## Push docker image
	${SUDO} docker push ${IMAGE}:latest
