# Estapa de construcción node en el contenedor
FROM node:latest as build

# Crear un directorio y ubicarme dentro de él
WORKDIR /app

# Copiar todas las dependencias
COPY package.json ./
COPY package-lock.json ./

# Ejecutar este comando, cuando ya tenga en package.json: 
# decirle al contenedror que lo instale cuando se desgargue de git
RUN npm install

# Copiar todo: src, public, asset. Lo pone todo en la carpeta app
COPY . .

# Compilar la aplicación
RUN npm run build

# Servidor web, sirve páginas
FROM nginx:alpine

RUN rm -rf /etc/nginx/conf.d/*

# Copiar el resultado de la compilación (dist) al directorio del servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar la configuración de Nginx
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Debe ser el mismo con el de Nginx
EXPOSE 3277

CMD ["nginx", "-g", "daemon off;"]