FROM node:10.18.0-jessie AS node

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build 

RUN mkdir -p dist/en-US

RUN cp build dist/en-US/mt12-bbs-ui -rf

RUN mkdir -p dist/zh-Hans

RUN npm run build-zh-Hans

RUN cp build dist/zh-Hans/mt12-bbs-ui -rf

FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY --from=node /usr/src/app/dist/en-US/mt12-bbs-ui .

COPY --from=node /usr/src/app/dist/zh-Hans/mt12-bbs-ui ./zh-Hans

COPY nginx.config /etc/nginx/conf.d/default.conf

EXPOSE 80