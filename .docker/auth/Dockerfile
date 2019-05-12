FROM node:current-alpine

LABEL maintainer="Gabe Dunn <gabe.dunn@shaw.ca>"

WORKDIR /app

# copy the package.json file from the server folder to imporove caching
COPY ./server/package.json ./server/*.lock ./

# install the dependencies
RUN yarn

# copy the server folder
COPY ./server .

EXPOSE 8000

# run the server. override in compose file to run start:dev
CMD ["yarn", "start"]
