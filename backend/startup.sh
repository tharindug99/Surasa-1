#!/bin/bash

# Set the PHP version you selected in the Azure Portal (e.g., 8.1, 8.2)
PHP_VERSION=8.2

# 1. Copy the custom Nginx config to the correct location
cp /home/site/wwwroot/nginx.conf /etc/nginx/sites-available/default

# 2. Start the PHP-FPM processor in the background
service "php${PHP_VERSION}-fpm" start

# 3. Start Nginx in the foreground
# The 'daemon off;' directive is required to keep the container running
nginx -g 'daemon off;'