#using official node js image version 18
FROM node:18-alpine


# specifying / app as the working directory
WORKDIR /app


# copying the dependency files
COPY package.json package-lock.json ./

#Installing dependencies

RUN npm install 

COPY . . 

# exposing port 4173
EXPOSE 4173


CMD ["npm","run","preview"]