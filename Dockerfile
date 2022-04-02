FROM node:14.19.1-alpine3.14 as Builder

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run site

FROM nginx:1.21.6-alpine
WORKDIR /usr/share/nginx/html
COPY --chown=nginx:nginx --from=Builder /app/site/dist /usr/share/nginx/html/