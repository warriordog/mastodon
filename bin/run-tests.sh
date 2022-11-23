#!/bin/bash

# https://github.com/rails/webpacker/issues/1494
export RAILS_ENV=test
bundle exec rails webpacker:compile

# Run tests
rspec
