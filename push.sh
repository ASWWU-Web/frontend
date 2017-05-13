#!/bin/bash
npm run build
scp -r app/* aswwu.com:/var/www/html/jobs/app/
scp dist/app.bundle.js aswwu.com:/var/www/html/jobs/dist/
