# Build stage
FROM eclipse-temurin:19-jdk AS build
WORKDIR /app

# Copy gradle wrapper and configuration files
COPY gradlew .
COPY gradle gradle
COPY build.gradle .
COPY settings.gradle .

# Copy source code
COPY src src

# Fix line endings of gradlew script for Linux environment (in case it was checked out as CRLF on Windows)
RUN sed -i 's/\r$//' gradlew

# Grant execute permission on the gradlew script and build
RUN chmod +x ./gradlew
RUN ./gradlew build -x test --no-daemon

# Package stage
FROM eclipse-temurin:19-jre
EXPOSE 8080
COPY --from=build /app/build/libs/ad-0.0.1-SNAPSHOT.jar ad.jar
ENTRYPOINT ["java", "-jar", "/ad.jar"]
