Custom fork of Mastodon federated social network server

---

This is a customized version of the [Glitch-soc Mastodon fork](https://github.com/glitch-soc/mastodon) with a few minor changes to improve user experience.
Supported features and tweaks are listed below, and planned changes are listed on [the roadmap](ROADMAP.md).

## Features

- App setting "Use Local Links" to open remote profiles and posts through the local instance
- Full support for quote-posts based on the [Treehouse Systems fork](https://gitea.treehouse.systems/treehouse/mastodon)
- Separate filter categories for "Home feed" and "Lists"

## Other differences from glitch-soc

- Link to official app is removed (there are privacy issues, please use a 3rd party app or mobile web)
- Improved tooling for local development (particularly under a WSL environment)

## Installation

Follow standard [installation instructions for glitch-soc](https://glitch-soc.github.io/docs/).
