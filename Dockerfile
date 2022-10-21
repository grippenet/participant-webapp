# build environment
FROM node:16-slim as build

# default env_file
ARG ENV_FILE=".env.local"
ARG TAG="none"
ARG COMMIT="none"
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install
COPY . .
COPY ${ENV_FILE} /app/.env.local
RUN yarn build

## production environment
FROM nginx:stable-alpine
LABEL fr.grippenet.webapp.tag="${TAG}"
LABEL fr.grippenet.webapp.commit="${COMMIT}"
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# Install include file (csp header configuration)
RUN  mkdir /etc/nginx/inc/ && mv /usr/share/nginx/html/csp.conf /etc/nginx/inc/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
