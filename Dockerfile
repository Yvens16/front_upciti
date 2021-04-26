FROM node:10.13
WORKDIR /front
COPY package.json package-lock.json ./
RUN npm install
# Need to rebuild node-sass for the right binary
# From OS X on my machine to Linux on the container
# RUN npm rebuild node-sass
# RUN npm install moment
# RUN npm install react-modal
COPY . ./
CMD ["npm", "start"]