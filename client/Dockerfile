FROM node:16-alpine3.16
LABEL author="david.robert.clegg@gmail.com"

WORKDIR /client
COPY package.json .
COPY . .

EXPOSE 3000
ENTRYPOINT [ "npm", "run", "startInstall" ]