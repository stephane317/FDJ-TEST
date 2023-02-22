#!/bin/sh

create_user () {
    host='localhost'
    port='27017'
    auth_user=$5
    auth_pass=$6
    auth_db='admin'
    db=$1
    user=$2
    pass=$3
    roles=$4

    if mongosh \
        --host $host \
        --port $port \
        --username="$auth_user" \
        --password="$auth_pass" \
        --authenticationDatabase="$auth_db" \
        "$db" \
        --eval "db.createUser({user: '$user', pwd: '$pass', roles: [$roles]});"; then
        echo "MongoDB user $user created"
    else
        echo "ERROR: MongoDB user $user not created"
    fi
}

if [ -n "${MONGO_APP_USERNAME:-""}" ]; then
    echo "Create MongoDB user ..."
    create_user \
        "$MONGO_APP_DATABASE" \
        "$MONGO_APP_USERNAME" \
        "$MONGO_APP_PASSWORD" \
        "{role: 'clusterMonitor', db: 'admin'},{role: 'readWrite', db: '$MONGO_APP_DATABASE'}" \
        "$MONGO_INITDB_ROOT_USERNAME" \
        "$MONGO_INITDB_ROOT_PASSWORD"
fi
