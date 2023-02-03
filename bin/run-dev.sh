#!/bin/bash
export RAILS_ENV=development

# Compile assets so that webpack will work
echo [run-dev] Precompiling assets...
bundle exec rails assets:precompile

echo [run-dev] Clearing cache...
bin/tootctl cache clear

echo [run-dev] Starting foreman...
foreman start
