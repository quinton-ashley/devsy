#!/usr/bin/env node

const opt = require('minimist')(process.argv.slice(2));
require('..')(opt);
