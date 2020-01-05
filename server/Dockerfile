FROM node:10.14.0-alpine as builder
RUN apk update && apk add --update nodejs-npm

ENV TZ=Europe/Dublin
ENV NODE_ENV=production
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /usr/src

COPY . /usr/app/src

WORKDIR /usr/app/src
RUN yarn global add typescript
RUN yarn
RUN sh build.sh

FROM node:10.14.0-alpine as app
ENV NODE_ENV=production
ENV TZ=Europe/Dublin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN yarn add reflect-metadata

COPY --from=builder /usr/app/src/node_modules /usr/app/src/node_modules 
COPY --from=builder /usr/app/src/package.json  /usr/app/src
COPY --from=builder /usr/app/src/dist  /usr/app/src/dist
COPY --from=builder /usr/app/src/.next  /usr/app/src/.next
COPY --from=builder /usr/app/src/pages  /usr/app/src/pages
COPY --from=builder /usr/app/src/public  /usr/app/src/public

WORKDIR /usr/app/src

EXPOSE 3005

ENTRYPOINT yarn start
