FROM node:current-alpine

LABEL maintainer="Gabe Dunn <gabe.dunn@shaw.ca>"

WORKDIR /app

# copy package.json and yarn.lock to leverage caching
COPY package*.json *.lock ./

# install dependencies
RUN yarn

# copy over the working files
COPY ./ ./

# run the serve command
CMD ["yarn", "serve"]
