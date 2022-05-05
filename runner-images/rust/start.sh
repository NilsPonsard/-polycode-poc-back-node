#!/bin/sh

echo "$CODE" > code.rs

rustc -o code code.rs > /dev/null

./code