FROM node:12-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM builder AS local
CMD ["npm", "run", "start"]

FROM builder AS ci
RUN npm run build
CMD ["npm", "run", "test"]

FROM builder AS cd
RUN npm run build
CMD ["npm", "run", "serve"]
