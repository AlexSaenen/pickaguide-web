sudo docker start
make build push

ssh root@82.223.82.41 "deploy-web-production"
