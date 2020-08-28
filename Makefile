#!make

run:
	@echo "Launching the server..."
	@docker-compose up

close:
	@echo "Closing the server..."
	@docker-compose down

purge:
	@echo "Purging server containers, images, networks, volumes..."
	@docker-compose down -v --rmi all

workspace:
	@echo "Shelling into the server..."
	@docker-compose exec server bash
