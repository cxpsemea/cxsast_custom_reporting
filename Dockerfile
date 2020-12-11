FROM node:latest

ARG VERSION
ARG NAME
ARG ARCH
ARG FILE_EXT

RUN echo ${VERSION} && \
    echo ${NAME} && \
    echo ${ARCH} && \
    echo ${FILE_EXT}

RUN node --version && \
    npm --version && \
    apt-get update

WORKDIR /opt/${NAME}

COPY source/config ./config
COPY source/templates ./config/templates
COPY README.md ./README.txt
COPY LICENSE ./LICENSE.txt
COPY CHANGELOG.md ./CHANGELOG.txt

WORKDIR /opt/${NAME}/code

COPY package.json package.json
COPY tsconfig.json tsconfig.json
COPY source ./source

RUN npm install

RUN ./node_modules/.bin/tsc --project ./tsconfig.json

RUN ./node_modules/.bin/pkg --silent --targets latest-${ARCH} ./build/main.js --output ./../${NAME}-${VERSION}-${ARCH}.${FILE_EXT}

WORKDIR /opt/${NAME}

RUN rm -rf code

RUN pwd
RUN ls -la

RUN chmod +x ${NAME}-${VERSION}-${ARCH}.${FILE_EXT}

ENTRYPOINT /opt/${NAME}/${NAME}-${VERSION}-${ARCH}.${FILE_EXT}