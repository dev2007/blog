FROM nginx

COPY ./src/.vuepress/dist /usr/share/nginx/html/

EXPOSE 6666