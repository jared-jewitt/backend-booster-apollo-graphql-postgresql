export COMPOSE_FILE = docker/docker-compose.development.yml
export COMPOSE_PROJECT_NAME ?= backend-booster-graphql-postgresql

database:
	$(info Launching the database...)
	@docker-compose up -d database

server:
	$(info Launching the server...)
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
