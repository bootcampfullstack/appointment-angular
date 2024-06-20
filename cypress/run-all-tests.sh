#!/bin/bash

mkdir ../temp
cd ../temp
git clone https://github.com/bootcampfullstack/appointment-java.git
cd appointment-java
mvn clean
mvn package -Dspring.profiles.active=test
start java -jar -Dspring.profiles.active=test   target/agenda-0.0.1-SNAPSHOT.jar
cd ..
git clone https://github.com/bootcampfullstack/appointment-angular.git
cd appointment-angular
npm install
ng test --browsers=ChromeHeadless --watch=false
start ng s
npx cypress run



