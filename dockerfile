FROM node

RUN mkdir -p /root/app

COPY ./src/.vuepress/dist /root/app/dist/
COPY package.json /root/app

WORKDIR /root/app/

RUN npm install

EXPOSE 6666

CMD ["node","/root/app/dist/index.html"]