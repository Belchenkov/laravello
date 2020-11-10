up: docker-up

init: docker-clear docker-up

docker-clear:
	docker-compose down --remove-orphans
	sudo rm -rf var/docker

docker-up:
	docker-compose up --build -d
