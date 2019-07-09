#!/usr/bin/env bash

input="in/numeros.txt"
output="out/mensagens-sh.txt"

DATE=`date '+%Y-%m-%d %H:%M:%S'`
echo $DATE > $output

while read -r line
do
  echo "####################### $line" >> $output
  RESPONSE=`curl https://jsonplaceholder.typicode.com/comments?postId=$line`
  echo $RESPONSE | jq 'length' >> $output
  echo $RESPONSE | jq '.[].body' >> $output
done < "$input"