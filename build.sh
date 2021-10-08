#!/bin/sh

# dist
rm -rf dist

# lib
rm -rf lib

# build dist
npm run build-dist

# build lib
npm run build-lib
