FROM node:7.10.0

ADD package.json     /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
ADD src/ /opt/app

EXPOSE 81
CMD ["node", "/opt/app/server.js"]
