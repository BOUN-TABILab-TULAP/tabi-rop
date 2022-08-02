FROM node:13.10-alpine as build

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.21.1
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/build /app/dist
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]