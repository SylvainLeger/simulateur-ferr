# Étape 1 : assembler la page / Stage 1: build the page
FROM python:3.12-alpine AS build
WORKDIR /app
COPY build.py .
COPY src ./src
RUN python build.py

# Étape 2 : la servir avec nginx / Stage 2: serve it with nginx
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/index.html /usr/share/nginx/html/index.html
EXPOSE 8080
