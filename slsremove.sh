#!/usr/bin/env bash

echo 'Configuring env variables'
export ENVIRONMENT=development SERVICE_VERSION=v1 AWS_PROFILE=mylab

echo 'Removing'

sls remove --profile mylab --region ap-southeast-2

echo 'Done'
