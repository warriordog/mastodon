#!/bin/bash

# NODE_ENV is *probably* not needed, but there is some code that checks it so we set for consistency.
export RAILS_ENV=development
export NODE_ENV=development

# Optimize concurrency for development mode
export STREAMING_CLUSTER_NUM=1
export WEB_CONCURRENCY=1
export MAX_THREADS=1
export SIDEKIQ_CONCURRENCY=1
export DB_POOL=10

# Start services in case system has rebooted.
# WSL does not always include an init system.
echo "[run-dev] Starting dependencies..."
sudo service postgresql start
sudo service redis-server start

# Compile assets so that webpack will work
echo "[run-dev] Precompiling assets..."
bundle exec rails assets:precompile

# Just in case - don't want to load cached data from an incompatible version
echo "[run-dev] Clearing cache..."
bin/tootctl cache clear

echo "[run-dev] Starting foreman..."
foreman start
