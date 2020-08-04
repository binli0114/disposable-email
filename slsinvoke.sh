#!/usr/bin/env bash

echo 'Configuring env variables'
export ENVIRONMENT=development SERVICE_VERSION=v1 AWS_PROFILE=mylab

echo 'Testing'

sls invoke local -f shipToES --profile mylab --region us-east-1 -p ./test/mocks/s3events.json

echo 'Done'
