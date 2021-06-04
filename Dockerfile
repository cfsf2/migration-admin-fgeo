# pull official base image
FROM node:13.12.0-alpine

WORKDIR /home/node/app

COPY package*.json ./

USER root

RUN npm install

EXPOSE 3000
# start app
CMD ["npm", "start"]