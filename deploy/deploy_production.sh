sudo service docker start
docker login -u "pickaguidedockercloud" -p "lucasanstoast6"
make build push

ssh root@82.223.82.41 "bash -ic deploy-web-production"
