#!/bin/bash

sleep 30

# touch ~/.bash_profile

# echo -e "export DB_NAME=DEV\nexport DB_USER=root\nexport DB_PASSWORD=PaSswo#2\nexport DB_HOST=localhost\nexport PORT=8000" > ~/.bash_profile

# source ~/.bash_profile

touch ~/.bash_profile
echo -e "export DB_DATABASE=USER\nexport DB_USERNAME=root\nexport DB_PASSWORD=pAsSWo4#\nexport DB_HOST=localhost\nexport PORT=8000" > ~/.bash_profile
source ~/.bash_profile

sudo yum update -y

# sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs

sudo amazon-linux-extras install epel -y 
sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm -y
sudo yum install mysql-community-server -y
sudo systemctl start mysqld.service

sudo yum install nginx -y

# export PORT=8000

# export DB_HOST="localhost"
# export DB_USER="root"
# export DB_NAME="DEV"
# export DB_PASSWORD="sUckS&23"

export temp=$(sudo cat /var/log/mysqld.log | grep "A temporary password" | awk -F ' ' '{print $NF}')
sudo mysql -u root -p$temp --connect-expired-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'pAsSWo4#';CREATE DATABASE USER;USE USER;"

cd /home/ec2-user && unzip ./webapp.zip

chmod -R 700 .

npm install

sudo mv /tmp/nginx.conf /etc/nginx/nginx.conf
sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

# sudo yum install unzip -y
# cd ~/ && unzip cocktails.zip
# cd ~/cocktails && npm i --only=prod

# sudo mv /tmp/cocktails.service /etc/systemd/system/cocktails.service
# sudo systemctl enable cocktails.service
# sudo systemctl start cocktails.service