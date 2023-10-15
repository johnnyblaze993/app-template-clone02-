FROM eclipse-temurin:17

# Get wait-for-it script
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

WORKDIR /app
COPY ./build/libs/server-0.1-all.jar /app/server.jar
EXPOSE 8080
CMD ["/wait-for-it.sh", "postgres:5432", "--", "java", "-jar", "/app/server.jar"]


