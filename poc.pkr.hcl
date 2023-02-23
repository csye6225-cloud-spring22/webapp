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
  profile = var.profile
  ami_name = "Customized_AMI-${local.timestamp}"
  ami_users = var.sharedAmi

  source_ami_filter {
    filters = {
      name                = var.name
      root-device-type    = var.root_device_type
      virtualization-type = var.virtualization_type
    }
    most_recent = true

    owners =  var.owners_filter
  }
//   ami_name   = "trial"
//   source_ami = "ami-01133559d62203fd3"


  instance_type = var.instanceType
  region        =var.region
  ssh_username  = var.sshUsername
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