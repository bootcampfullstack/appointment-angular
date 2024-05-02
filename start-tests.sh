#!/bin/bash

# Comando para compilar e executar o backend Java
start java -jar /d/temp/appointment-java/target/agenda-0.0.1-SNAPSHOT.jar
ng test --browsers=ChromeHeadless --watch=false
start ng s
npx cypress run