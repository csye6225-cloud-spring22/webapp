variable "region" {
    type = string
    default = "us-east-1"
}

variable "profile"{
    type = string
    default = "dev"
}


variable "sharedAmi"{
    type = list(string)
    default = ["808076149364"]
}
variable "owners_filter"{
    type = list(string)
    default = ["amazon"]
}

variable "name"{
    type = string
    default = "amzn2-ami-kernel-5.10-hvm-2.0.20230207.0-x86_64-gp2"
}

variable "root_device_type"{
    type = string
    default = "ebs"
}

variable "virtualization_type"{
    type = string
    default = "hvm"
}

variable "instanceType"{
    type = string
    default = "t2.micro"
}
variable "sshUsername"{
    type = string
    default = "ec2-user"
}