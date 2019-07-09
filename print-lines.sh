#!/usr/bin/env bash

input="in/numeros.txt"
# while IPS= read -r line # IPS > internal field separator
while read -r line
do
  echo "$line"
done < "$input"