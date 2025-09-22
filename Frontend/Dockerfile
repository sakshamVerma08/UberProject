FROM node:trixie-slim AS build

WORKDIR /UberProject/Frontend/


COPY package*.json /UberProject/Frontend/

# Install the dependencies and build the application (static assets) (dist folder)
RUN npm install 
COPY . /UberProject/Frontend/
RUN npm run build

#Stage2: Server the application with Nginx

FROM nginx:stable-perl

COPY --from=build /UberProject/Frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

