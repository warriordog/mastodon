#!/bin/bash

export RAILS_ENV=development
export NODE_ENV=development

# Optimize concurrency for development mode
export STREAMING_CLUSTER_NUM=1
export WEB_CONCURRENCY=1
export MAX_THREADS=1
export SIDEKIQ_CONCURRENCY=1
export DB_POOL=10

# Compile assets so that webpack will work
echo "[run-dev] Precompiling assets..."
bundle exec rails assets:precompile

echo "[run-dev] Clearing cache..."
bin/tootctl cache clear

echo "[run-dev] Starting foreman..."
foreman start
