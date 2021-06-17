FROM openjdk:15

MAINTAINER Harro Fabian Fromme <h-f.fromme@posteo.de>

ADD backend/target/scratchAMapBackend.jar app.jar

CMD [ "sh", "-c", "java -Dserver.port=$PORT -jar /app.jar" ]