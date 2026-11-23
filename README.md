# ENF-Tex

Aplicación web de recursos de formación en salud.

## Ejecutar en local

Requiere Node.js 20.19+ o 22.12+.

```bash
npm ci
npm run dev
```

Vite muestra la dirección local en la terminal (por defecto, `http://localhost:3000`).

Para comprobar la compilación de producción:

```bash
npm run build
```

## Publicar en GitHub Pages

El workflow de GitHub Actions en `.github/workflows/deploy.yml` compila y publica el sitio al hacer push a `main`. En la configuración del repositorio, selecciona **Settings → Pages → Build and deployment → GitHub Actions**.

Los datos que la aplicación guarda en el navegador permanecen en el almacenamiento local de ese navegador.
