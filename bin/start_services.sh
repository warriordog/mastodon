#!/bin/bash

# Starts all external service dependencies required by Mastodon.
# Note - you do not need to call this if using run-dev.sh or run-test.sh.

sudo service postgresql start
sudo service redis-server start
