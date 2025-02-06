FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --force

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]
