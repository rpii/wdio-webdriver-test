# wdio-webdriver-test
This is a demo of being unable to load webdrivers.

the repo is git@github.com:rpii/wdio-webdriver-test.git

## Setup
run yarn install

yarn test:chrome
yarn test:chrome-headless
yarn test:chrome-headless-linux
yarn test:edge
yarn test:edge-headless
yarn test:edge-headless-linux
yarn test:firefox
yarn test:firefox-headless
yarn test:firefox-headless-linux


firefox is the only one which works.


## Output
log files containing the failure of connecting to the webdriver.
in the ./logs folder

use yarn clean-logs prior to a run

## Linux Setup for Oracle Linux 8.8
    yum install google-chrome
    yum install firefox
    yum install microsoft-edge-stable






