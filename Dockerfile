FROM node:12 As development

#becuase ENV cant set directly from commandline so use ARG set default ENV because ARG can set in build time
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build

FROM node:12 as production

COPY --from=development /usr/src/app/build ./build
COPY ./production ./
RUN npm install