# Frontend

Aswwu's five sites (will) all reside within this repository. Homepage, Mask, Jobs, Pages, and Elections. 

## Homepage

The homepage for the Associated Students of Walla Walla University.
Live version: [aswwu.com](https://aswwu.com)

## The Mask

An online student directory and yearbook created by ASWWU for Walla Walla University with __Angular/Typescript__.
Live version: [aswwu.com/mask](https://aswwu.com/mask/)

## Jobs

An online job site for students to search for and apply for positions at ASWWU.
Live Version: [aswwu.com/jobs](https://aswwu.com/jobs)

## Pages

Currently at [github.com/aswwu-web/pages](https://github.com/aswwu-web/pages)
Live Version: [aswwu.com/pages](https://aswwu.com/pages)

## Elections

An online voting system designed to allow students to vote for positions in either Senate or ASWWU.
Live Version: [aswwu.com/elections](https://aswwu.com/elections)


# Getting Started

## Setup

- `git clone git@github.com:ASWWU-Web/frontend.git`
- `cd frontend`
- `git submodule update --init --recursive`
- `npm install`


## Run in Development

- `cd frontend`
- `npm run start`
- Navigate to `http://localhost:4200/` in your browser. The site will reload when source files are modified.


## Deploy to Production

- Download the GitHub Action build artifact
- unzip the build artifact on your computer to get the `frontend-artifact/` folder
- `cd frontend-artifact/`
- `bash remote_deploy.sh <server_username>@<server_ip_address> frontend-payload/`


# Further help

## Angular CLI

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Contact

Contact [ASWWU.webmaster@wallawalla.edu](mailto:aswwu.webmaster@wallawalla.edu) for additional information about this project.
