FROM node

RUN npm i npm@latest -g

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "server"]