ORG = pickaguidedockercloud
NAME = pickaguide_frontweb
CONTAINER = container_frontWeb
REPOSITORY = $(ORG)/$(NAME)
SHA1 = $(shell git log -1 --pretty=oneline | cut -c-10)
BRANCH = $(shell git branch -a --contains $(SHA1) | egrep '(remotes/|\*)' | egrep -v "(HEAD|detached)" | head -1 | sed -e "s/\* //" -e "s/.*\///")
VERSION = $(BRANCH)-$(SHA1)
PORT = 5000
EXPOSE = 5000

all: build

build:
	docker build -t $(REPOSITORY) .

push:
	docker push $(REPOSITORY)

clean:
	docker stop $(CONTAINER) && docker rm $(CONTAINER)

run:
	docker run --name $(CONTAINER) -p $(EXPOSE):$(PORT) -d $(REPOSITORY)

prod:
	npm install
	npm run build-prod
	npm run server-prod

dev-bundle:
	npm install
	npm run webpack-dev

dev-server:
	npm run server-dev
