FROM node:14-alpine
LABEL MAINTAINER="yhl, yhl@1024hw.org"

ENV TIMEZONE Asia/Shanghai
RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN yarn --prod && \
  yarn cache clean && \
  apk update && \
  apk upgrade && \
  apk add --update tzdata && \
  cp /usr/share/zoneinfo/${TIMEZONE} /etc/localtime && \
  echo "${TIMEZONE}" > /etc/timezone && \
  apk del tzdata && \
  rm -rf /var/cache/apk/*

CMD [ "yarn", "start" ]
