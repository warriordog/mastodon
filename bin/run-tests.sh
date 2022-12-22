#!/bin/bash

# Compile assets to fix test errors
# https://stackoverflow.com/questions/52639256/webpackermanifestmissingentryerror
export RAILS_ENV=test
bundle exec rake assets:precompile

# Run tests
rspec
