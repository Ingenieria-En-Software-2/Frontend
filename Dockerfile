FROM node:18.14.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
RUN npm run build
CMD ["npm", "run", "preview"]