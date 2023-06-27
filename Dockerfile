FROM node:18.14.0
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5173
EXPOSE 4000
CMD ["npm", "run", "captcha"]
