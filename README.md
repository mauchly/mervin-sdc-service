# AirBnB Mock System Design

This is an AirBnB mock backend design environment in order to test scaling and deployment capabilities

> Frontend: React

> Backend: Express, Knex, Postgresql, Redis, NGINX

> Compilation: Webpack

> Stress Test: Artillery, Newrelic, Loader.io

Purpose of this application is to design an server architecture that can handle extreme stress in the forms of HTTP requests
- Understand application architecture to optimize speed between client, server, and database
- Understand cost/hardware capacities to deployment on AWS EC2
- Understand different forms of proxy, load balancers, and caching systems in order to meet 10,000 requests per second

## Table of Contents

1. [Requirements](#requirements)
1. [Usage](#usage)
1. [Development](#development)

## Requirements
- Node 6.13.0

```sh
npm install -g webpack
npm install
```

## Usage

```sh
npm build
npm start
```

## Development Journal

https://github.com/mervinpan/mervin-sdc-journal/blob/master/journal.md
