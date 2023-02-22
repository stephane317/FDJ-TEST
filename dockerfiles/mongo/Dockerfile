ARG SRC_TAG=6.0
FROM mongo:${SRC_TAG}

COPY entrypoints/* /docker-entrypoint-initdb.d/

RUN chmod a+x /docker-entrypoint-initdb.d/init.sh

RUN ls -l /docker-entrypoint-initdb.d/
