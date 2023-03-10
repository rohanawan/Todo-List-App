FROM node:16-alpine

USER root

WORKDIR .

COPY package.json .

RUN npm -g install npm@latest

RUN npm install

COPY . .

CMD ["npm", "start"]

# -t means name of your image : means a tag or version . means DockerFile is in current directory
# docker build -t fyp-backend:1.0 .
# docker run -p osPort:dockerPort imageId
# docker rmi -f imageId
# docker rm -f containerId
# docker exec containerId stop
# docker kill --signal=SIGTERM containerId
# docker stop -t time containerId
