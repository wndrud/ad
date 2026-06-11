# Build stage
FROM gradle:8.0-jdk19 AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon -x test

# Package stage
FROM openjdk:19-slim
EXPOSE 8080
COPY --from=build /home/gradle/src/build/libs/ad-0.0.1-SNAPSHOT.jar ad.jar
ENTRYPOINT ["java", "-jar", "/ad.jar"]
