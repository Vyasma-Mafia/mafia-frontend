FROM node:14

WORKDIR /usr/src/app

RUN npm install -f

COPY . .

EXPOSE 8080

CMD ["npm", "run", "serve"]