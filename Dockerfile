# BASE IMAGE with an alias #
FROM node:latest as build

WORKDIR /app

# Install Angular CLI to run Build #
RUN npm install -g @angular/cli

COPY ./package.json .

COPY ./package-lock.json .

RUN npm install --force

COPY . .

RUN ng build

# BASE IMAGE with an alias #
FROM nginx as runtime

# Copy contents from the other container with alias "build" #
# onto the specified path in the current container#
COPY --from=build /app/dist/star-wars /usr/share/nginx/html