FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

RUN cp -r src/views dist/

EXPOSE 8000

CMD ["node", "dist/index.js"]

