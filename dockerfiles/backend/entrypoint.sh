#!/bin/bash
set -e

USER_ID=${USER_ID:-1000}
USERNAME=${USERNAME:-'node'}
GROUP_ID=${GROUP_ID:-1000}
GROUPNAME=${GROUPNAME:-'node'}
HOMEDIR=${HOMEDIR:-"/home/$USERNAME"}

getent group $GROUP_ID > /dev/null 2>&1 && true
if [ ! $? -eq 0 ]; then
    echo gid $GROUP_ID not found
    getent group $GROUPNAME > /dev/null 2>&1 && true
    if [ ! $? -eq 0 ]; then
        echo group $GROUPNAME not found
        echo create group $GROUPNAME with gid $GROUP_ID
        addgroup --gid $GROUP_ID $GROUPNAME
    else
        echo change group $GROUPNAME gid to $GROUP_ID
        groupmod --gid $GROUP_ID $GROUPNAME
    fi
else
    echo get existing group infos
    GROUPNAME=$(getent group $GROUP_ID | cut -d : -f 1 )
fi

getent passwd $USER_ID > /dev/null 2>&1 && true
if [ ! $? -eq 0 ]; then
    echo uid $USER_ID not found
    getent passwd $USERNAME > /dev/null 2>&1 && true
    if [ ! $? -eq 0 ]; then
        echo user $USERNAME not found
        echo create user $USERNAME with uid $USER_ID , group $GROUPNAME , gid $GROUP_ID and home $HOMEDIR
        adduser --disabled-password --uid $USER_ID --gid $GROUP_ID --home $HOMEDIR $USERNAME
    else
        echo change user $USERNAME uid to $USER_ID , gid to $GROUP_ID and home to $HOMEDIR
        usermod --uid $USER_ID --gid $GROUP_ID --home $HOMEDIR $USERNAME
        mkdir -p $HOMEDIR
        chown -R $USERNAME:$GROUPNAME $HOMEDIR
    fi
else
    echo get existing user infos
    USERNAME=$(getent passwd $USER_ID | cut -d : -f 1 )
    usermod --home $HOMEDIR $USERNAME
    HOMEDIR=$(getent passwd $USER_ID | cut -d : -f 6 )
fi

echo user : $USERNAME
echo uid : $USER_ID
echo group : $GROUPNAME
echo gid : $GROUP_ID
echo home : $HOMEDIR

mkdir -p $APP_DIR
mkdir -p $NPM_CACHE_DIR
mkdir -p $FDJ_LOG_DIR
chown $USERNAME:$GROUPNAME $HOMEDIR
chown $USERNAME:$GROUPNAME $FDJ_LOG_DIR
chown $USERNAME:$GROUPNAME $APP_DIR
chown $USERNAME:$GROUPNAME $NPM_CACHE_DIR

gosu $USERNAME /usr/local/bin/npm config set cache $NPM_CACHE_DIR
echo NPM cache :
gosu $USERNAME /usr/local/bin/npm config get cache

exec gosu $USERNAME "$@"
