FROM node:11
RUN mkdir -p /usr/backend
WORKDIR /usr/backend
COPY package*.json ./
RUN npm install -g pm2
RUN yarn install
COPY . .
RUN yarn run build
EXPOSE 8085 80

ENV PORT 8085
ENV MONGO_URL "mongodb+srv://cuongpv:123456a@A@cluster0-eup7b.mongodb.net/test?retryWrites=true&w=majority"
ENV ISSECURED true
ENV TOKEN_EXPIRED_TIME -1
ENV AUTHORIZATION_PREFIX true
ENV HASKEY "readtometnc2020"
ENV APP_KEY "readtometnc2020@vietnamusa"

CMD [ "pm2", "start", "ecosystem.config.js", "--env", "development", "--no-daemon" ]