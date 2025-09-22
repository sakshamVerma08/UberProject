FROM node:trixie-slim

WORKDIR /UberProject/Backend/

COPY package*.json /UberProject/Backend/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]


