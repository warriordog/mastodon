#!/bin/bash

# NODE_ENV is *probably* not needed, but there is some code that checks it so we set for consistency.
export RAILS_ENV=test
export NODE_ENV=test

# Optimize concurrency for testing mode
export WEB_CONCURRENCY=1  # Don't set to zero - Mastodon requires cluster mode
export MAX_THREADS=2
export SIDEKIQ_CONCURRENCY=2
export DB_POOL=20

# Start services in case system has rebooted.
# WSL does not always include an init system.
echo "[run-tests] Starting dependencies..."
sudo service postgresql start
sudo service redis-server start

# Compile assets so that webpack will work
echo "[run-tests] Precompiling assets..."
bundle exec rails assets:precompile

# Just in case - don't want to load cached data from an incompatible version
echo "[run-tests] Clearing cache..."
bin/tootctl cache clear

echo "[run-tests] Starting tests..."
rspec
