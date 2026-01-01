# Blog Plafonds Tendus

Un projet **Next.js** personnalisé pour gérer un blog avec :
- **SCSS** pour le style.
- **Cloudinary** pour le stockage et l'optimisation des images.
- **React-Quill** pour l'édition d'articles en WYSIWYG.
- **Better Auth** pour sécuriser l'accès admin (seul l'admin peut éditer les devis).

---

## 🚀 Getting Started

### Prérequis
- Node.js (v20 ou supérieur)
- Un compte [Cloudinary](https://cloudinary.com/) pour gérer les images.
- Une base de données MongoDB (pour stocker les articles et les devis).

### Installation
1. Clone ce dépôt :
```bash
   git clone https://github.com/nicov51/blog-plafonds-tendus.git
   cd blog-plafonds-tendus
```   

### dependances
```bash
npm install
```

crer .env.local a la racine
MONGODB_URI=ton_uri_mongodb
CLOUDINARY_CLOUD_NAME=ton_cloud_name
CLOUDINARY_API_KEY=ta_cle_api
CLOUDINARY_API_SECRET=ton_secret_api
NEXT_PUBLIC_BETTER_AUTH_API_KEY=ta_cle_better_auth


### lancer le serveur
```
npm run dev
```

Ouvre http://localhost:3000 dans ton navigateur.

### Editer un article
Connecte-toi en tant qu'admin via Better Auth.
Utilise l'éditeur React-Quill pour rédiger ton article.
Les images sont automatiquement uploadées vers Cloudinary.

### Ressources utiles
Documentation Next.js: https://nextjs.org/docs
Documentation Cloudinary: https://cloudinary.com/documentation
Documentation Tiptap: https://tiptap.dev/docs
Documentation Better Auth: https://betterauth.com/docs


