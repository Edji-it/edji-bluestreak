# Bluestreak (Edji Socket Server)

## Purpose

All socket connections from edji.it run through Bluestreak, which handles live updating to UI

## Quick Start

### Install Packages

```bash
brew install node yarn
```

### Clone the repo

SSH: `git@github.com:codiak/edji-bluestreak.git`

HTTPS: `https://github.com/codiak/edji-bluestreak.git`

### Install more Packages

```bash
yarn install
```

## Heroku

Add remotes
```bash
git remote add prod https://git.heroku.com/bluestreak.git
git remote add dev https://git.heroku.com/bluestreak-dev.git
```

Push to `dev` and `prod`
```bash
git push prod master
git push dev master
```

Swap the default Heroku CLI remote
```bash
git config heroku.remote dev
git config heroku.remote prod
```