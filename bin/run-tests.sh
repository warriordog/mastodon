#!/bin/bash

export RAILS_ENV=test
export NODE_ENV=test

# Optimize concurrency for testing mode
export STREAMING_CLUSTER_NUM=1
export WEB_CONCURRENCY=1
export MAX_THREADS=2
export SIDEKIQ_CONCURRENCY=2
export DB_POOL=15

# Compile assets to fix test errors
# https://stackoverflow.com/questions/52639256/webpackermanifestmissingentryerror
echo "[run-tests] Precompiling assets..."
bundle exec rails assets:

echo "[run-tests] Clearing cache..."
bin/tootctl cache clear

echo "[run-tests] Starting tests..."
rspec
