packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}
locals {
  timestamp = regex_replace(timestamp(), "[- TZ:]", "")
}


source "amazon-ebs" "trial" {
  profile = "dev"  
  ami_name = "Customized_AMI-${local.timestamp}"

  source_ami_filter {
    filters = {
      name                = "amzn2-ami-kernel-5.10-hvm-2.0.20230207.0-x86_64-gp2"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    most_recent = true

    owners = ["amazon"]
  }
//   ami_name   = "trial"
//   source_ami = "ami-01133559d62203fd3"


  instance_type = "t2.micro"
  region        = "us-east-1"
  ssh_username  = "ec2-user"
}

build {
  sources = [
    "source.amazon-ebs.trial"
  ]
  provisioner "file" {
    source      = "./webapp.zip"
    destination = "/home/ec2-user/webapp.zip"
  }

    provisioner "file" {
      source = "./webapp.service"
      destination = "/tmp/webapp.service"
    }
     provisioner "file" {
      source = "./nginx.conf"
      destination = "/tmp/nginx.conf"
    }

  provisioner "shell" {
    script = "./app.sh"
  }
}