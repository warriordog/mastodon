#!/bin/bash

export RAILS_ENV=test

# Compile assets to fix test errors
# https://stackoverflow.com/questions/52639256/webpackermanifestmissingentryerror
bundle exec rails assets:precompile
bin/tootctl cache clear

# Run tests
rspec
