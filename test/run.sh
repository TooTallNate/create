#!/usr/bin/env bash

echo
for file in "`dirname $0`"/*.js; do
  printf "\033[90m   ${file#test/}\033[0m "
  node $@ $file && printf "\033[36m✓\033[0m\n"
  test $? -eq 0 || exit $?
done
echo
