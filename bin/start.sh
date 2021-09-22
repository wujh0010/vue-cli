#!/usr/bin/env bash
# cp ../nginx/nginx.conf /export/servers/nginx/conf/

ln -sf /export/App/nginx/nginx.conf /export/servers/nginx/conf/nginx.conf
sudo ln -sf /export/servers/nginx/sbin/nginx /usr/local/sbin/nginx
mkdir -p /dev/shm/nginx_temp/client_body
sudo nginx -c /export/servers/nginx/conf/nginx.conf
