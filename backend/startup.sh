#!/bin/bash

# Copy our custom nginx.conf to the location Nginx uses for its default site
cp /home/site/wwwroot/nginx.conf /etc/nginx/sites-available/default

# Reload the Nginx service to apply the new configuration
service nginx reload