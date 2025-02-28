# Étape 1 : Build de l'application React
FROM node:18.17 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /src

# Copier uniquement les fichiers de dépendances pour optimiser le cache
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source après l'installation des dépendances
COPY . .


# Désactiver Sentry pendant le build pour éviter les erreurs
ENV SENTRY_AUTH_TOKEN=""

# Construire l'application React
RUN npm run build

# Étape 2 : Utiliser Nginx pour servir l'application
FROM nginx:1.25.3

# Supprimer la configuration par défaut de Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copier la configuration Nginx personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copier les fichiers de build React vers le dossier Nginx
COPY --from=build /src/dist /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
