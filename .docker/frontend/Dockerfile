FROM node:lts-alpine as build-stage

LABEL maintainer="Gabe Dunn <gabe.dunn@shaw.ca>"

WORKDIR /app

# copy package.json and yarn.lock to leverage caching
COPY package*.json *.lock ./

# install dependencies
RUN yarn

# copy over the working files
COPY ./ ./

# build the app
RUN yarn build

# run a second stage to serve the static files
FROM nginx:stable-alpine as production-stage

# copy the files from the build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# start the nginx server
CMD ["nginx", "-g", "daemon off;"]
