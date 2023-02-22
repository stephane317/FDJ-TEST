#!/usr/bin/env sh

gitDir=".git"

if [ -n "$1" ]; then
  versionFile=$1
else
  versionFile=src/version.json
fi

if [ -d $gitDir ]; then
  version=$(git describe --tags --always)
  abbrev_commit=$(git log -1 --pretty=tformat:%h --no-color)
  full_commit=$(git log -1 --pretty=tformat:%H --no-color)
  message=$(git log -1 --pretty=tformat:%s --no-color | sed 's/\"/\\"/g')
  author_name=$(git log -1 --pretty=tformat:%an --no-color)
  author_email=$(git log -1 --pretty=tformat:%ae --no-color)
  author_date=$(git log -1 --pretty=tformat:%aI --no-color)
  author_timestamp=$(git log -1 --pretty=tformat:%at --no-color)
  committer_name=$(git log -1 --pretty=tformat:%cn --no-color)
  committer_email=$(git log -1 --pretty=tformat:%ce --no-color)
  commit_date=$(git log -1 --pretty=tformat:%cI --no-color)
  commit_timestamp=$(git log -1 --pretty=tformat:%ct --no-color)
  deploy_timestamp=$(date -u +%s)
  deploy_date=$(date -Iseconds -d "@${deploy_timestamp}")
  if [ -z "${deploy_date}" ]; then
    deploy_date=$(date -Iseconds -D "@${deploy_timestamp}")
  fi

  cat > $versionFile <<EOL
{
  "version": "${version}",
  "abbrev_commit": "${abbrev_commit}",
  "full_commit": "${full_commit}",
  "message": "${message}",
  "author_name": "${author_name}",
  "author_email": "${author_email}",
  "author_date": "${author_date}",
  "author_timestamp": "${author_timestamp}",
  "committer_name": "${committer_name}",
  "committer_email": "${committer_email}",
  "commit_date": "${commit_date}",
  "commit_timestamp": "${commit_timestamp}",
  "deploy_date": "${deploy_date}",
  "deploy_timestamp": "${deploy_timestamp}"
}
EOL

  if [ $? -eq 0 ]; then
    echo version infos have been saved to ${versionFile}
  fi
else
  echo $gitDir does not exists
fi
