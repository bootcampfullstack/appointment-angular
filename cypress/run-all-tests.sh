#!/bin/bash

rm -rf ../temp
mkdir ../temp
cd ../temp
git clone https://github.com/bootcampfullstack/appointment-java.git
cd appointment-java
mvn clean
mvn package -Dspring.profiles.active=test
java -jar -Dspring.profiles.active=test   target/agenda-0.0.1-SNAPSHOT.jar &
java_pid=$!

cd ..
git clone https://github.com/bootcampfullstack/appointment-angular.git
cd appointment-angular
npm install
ng test --browsers=ChromeHeadless --watch=false
ng s &
ng_pid=$!
npx cypress run

kill $java_pid
kill $ng_pid



