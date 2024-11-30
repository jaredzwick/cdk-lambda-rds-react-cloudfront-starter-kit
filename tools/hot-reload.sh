#!/bin/bash
# Kill running sam local start-api process
pkill -f "sam local start-api"
# Build SAM application
sam build
# Start SAM API locally
sam local start-api --warm-containers EAGER & # Run in background