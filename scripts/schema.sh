#!/bin/bash  
for i in src/graphql/**/*.graphql;
 do
    cp "$i" "dist/$i"
 done 