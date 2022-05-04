#!/bin/sh

docker build -t java-runner runner-images/java
docker build -t python-runner runner-images/python
docker build -t node-runner runner-images/node
docker build -t rust-runner runner-images/rust