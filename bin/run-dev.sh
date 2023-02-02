#!/bin/bash

export RAILS_ENV=development

# Compile assets so that webpack will work
bundle exec rails assets:precompile
bin/tootctl cache clear

foreman start
