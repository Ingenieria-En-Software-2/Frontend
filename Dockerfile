FROM node:16-alpine AS build
WORKDIR /app
RUN npm install -g @angular/cli
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4200
#CMD ["npm", "start"]
CMD ["ng", "serve", "--host", "0.0.0.0"]