FROM bucharestgold/centos7-s2i-nodejs:10.x
USER root
# this is required for fabricjs module
RUN yum -y install cairo-devel
USER 1001
WORKDIR /opt/app-root/src
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080 3000
CMD ["npm","run", "serve"]