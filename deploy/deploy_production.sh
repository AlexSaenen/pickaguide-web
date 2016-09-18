sudo service docker start
echo "alexander.saenen@epitech.eu" | docker login -u "pickaguidedockercloud" -p "lucasanstoast6"
sudo make build push

ssh root@82.223.82.41 "bash -ic deploy-web-production"
