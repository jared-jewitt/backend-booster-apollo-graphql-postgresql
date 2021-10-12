export COMPOSE_FILE = docker/docker-compose.yml:docker/docker-compose.local.yml
export COMPOSE_PROJECT_NAME ?= backend-booster-graphql-postgresql

up:
	$(info Launching the database + server...)
	@docker-compose up -d database
	@docker-compose up server

down:
	$(info Removing the database + server containers...)
	@docker-compose down

nuke:
	$(info Purging all database + server containers, images, networks, volumes...)
	@docker-compose down -v --rmi all

bash:
	$(info Shelling into the server...)
	@docker-compose exec server bash
