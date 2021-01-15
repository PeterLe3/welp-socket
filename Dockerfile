FROM node

#Create app directory
WORKDIR /usr/src/app

#Install app dependencies
#A wildcard is used to ensure both package.json and package-lock.json are copied 
COPY package*.json ./

RUN npm install
#If you are building code for prod
#RUN npm install --only=production

#Build app source
COPY . .

RUN npm run build
WORKDIR ./dist
EXPOSE 4000


CMD ["node","src/app.js"]

