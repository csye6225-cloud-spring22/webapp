# Webapp


### Implementing RestAPIs endpoints using NodeJS and Express

### Table of contents
* Prerequisites
* Build and Deploy Instructions
* Testing

### Prerequisites
- node should be installed before. Preferred version 18.7.0. If you do not have node installed, kindly visit [Node JS](https://nodejs.org/en/download/) to install it. Confirm npm is installed as well.
- To verify whether you have downloaded node and npm, please run the following commands
  - `node -v`
  - `npm -v`


### Build & Deploy Instructions
- Run the following command in the terminal to install dependent packages.\
`npm install`
- Run the following command in the terminal to start the server.\
`npm start`
### Testing
- Before testing, kindly ensure that you have previously downloaded the packages by running the command.\
`npm install`
- Run the following command to run the unit tests\
`npm test`

## Instructions for Packer

Packer is a free and open source program for producing golden images from a single source configuration for various platforms.

### Prerequisites for packer

- Download packer from this following [link](https://developer.hashicorp.com/packer/downloads)
- Download [AWS CLI](https://aws.amazon.com/cli/) and configure your profile

### Initializing Packer

To initialize packer, give the following command

`packer init .`

### Packer Validation

To validate packer, give the following command

`packer validate .`

For including the var file, apply the following command

`packer validate -var-file=<file-name>.pkrvars.hcl .`

### Packer Build

To build the AMI Package, use the following command

`packer build .`

To include the var file as well, apply the following command

`packer build -var-file=<file-name>.pkrvars.hcl .`
