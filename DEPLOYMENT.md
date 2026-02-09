# 🚀 Guía de Despliegue Seguro en Vercel

## Pre-requisitos

- Cuenta de Vercel (gratis): https://vercel.com/signup
- Repositorio Git (GitHub, GitLab o Bitbucket)
- Node.js instalado localmente

## 📝 Pasos para Desplegar

### 1. Preparar el Proyecto

```bash
# Verificar que todo está funcionando localmente
npm install
npm run build

# Verificar seguridad
npm audit
```

### 2. Configurar Git (si aún no está)

```bash
git init
git add .
git commit -m "chore: prepare for secure deployment"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

### 3. Desplegar en Vercel

#### Opción A: Desde la Web (Recomendado para principiantes)

1. Ve a https://vercel.com
2. Haz clic en "Add New Project"
3. Importa tu repositorio de GitHub
4. Configuración del proyecto:
   - **Framework Preset**: Angular
   - **Build Command**: `npm run build` (se detecta automáticamente)
   - **Output Directory**: `dist/flujograma-vet/browser` (se detecta automáticamente)
   - **Install Command**: `npm install`
5. Variables de entorno: No necesarias (no hay)
6. Haz clic en "Deploy"

#### Opción B: Desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Desplegar (desde la raíz del proyecto)
vercel

# Para producción
vercel --prod
```

### 4. Verificar Configuración de Seguridad

Después del despliegue, verifica en tu navegador:

#### Test de Headers HTTP

Abre DevTools → Network → Selecciona el documento principal → Headers

✅ Debe mostrar:
```
strict-transport-security: max-age=31536000; includeSubDomains
x-content-type-options: nosniff
x-frame-options: DENY
x-xss-protection: 1; mode=block
content-security-policy: [policy completa]
```

#### Herramientas de Testing

```bash
# Scan de seguridad online
# https://securityheaders.com (pega tu URL de Vercel)

# Test de SSL
# https://www.ssllabs.com/ssltest/
```

### 5. Dominios Personalizados (Opcional)

Si tienes un dominio propio:

1. Ve a tu proyecto en Vercel → Settings → Domains
2. Agrega tu dominio: `ejemplo.com`
3. Configura los DNS según las instrucciones de Vercel
4. Vercel provee SSL automático (Let's Encrypt)

**Actualizar después:**
- `security.txt`: Cambiar URL canónica
- `robots.txt`: Actualizar sitemap URL

### 6. Configuración Post-Despliegue

#### Actualizar Contact Info

Edita estos archivos con tus datos reales:

```bash
# public/.well-known/security.txt
Contact: mailto:contrerasjob123@gmail.com
Canonical: https://TU-DOMINIO.vercel.app/.well-known/security.txt

# public/robots.txt
Sitemap: https://TU-DOMINIO.vercel.app/sitemap.xml
```

#### Habilitar Protecciones de Vercel

En Vercel Dashboard → Settings:

- ✅ **Attack Challenge Mode**: Auto (protección DDoS)
- ✅ **Edge Config**: No necesario
- ✅ **Preview Deployments**: Solo para branches específicas
- ✅ **Deployment Protection**: Password para previews (opcional)

### 7. Monitoreo y Mantenimiento

#### Vercel Analytics (Opcional - Gratis)

```bash
# Instalar
npm install @vercel/analytics

# En main.ts o app.component.ts
import { inject } from '@vercel/analytics';
inject();
```

#### GitHub Actions para CI/CD (Opcional)

Crea `.github/workflows/security-audit.yml`:

```yaml
name: Security Audit

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * 0' # Weekly

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm audit --audit-level=moderate
```

## 🔒 Configuración de Seguridad Adicional

### Vercel Firewall (Pro Plan - Opcional)

Si necesitas protección adicional:

- Rate limiting personalizado
- Geo-blocking
- IP allowlist/blocklist
- Bot protection avanzada

**Nota**: El plan gratuito ya incluye protección DDoS básica.

### Variables de Entorno (para futuras funcionalidades)

Si agregas APIs o servicios externos:

```bash
# Local
echo "API_KEY=tu_clave_secreta" > .env.local

# Vercel
vercel env add API_KEY
# Selecciona: Production, Preview, Development
```

**Importante**: Nunca comitees `.env` o `.env.local`

## 📊 Checklist de Despliegue

Antes de marcar como "producción":

- [ ] Build pasa sin errores (`npm run build`)
- [ ] Tests pasan (cuando los agregues)
- [ ] `npm audit` sin vulnerabilidades críticas
- [ ] Headers de seguridad verificados
- [ ] SSL/HTTPS funcionando
- [ ] Todos los enlaces funcionan
- [ ] DevTools sin errores en consola
- [ ] Responsive en móvil verificado
- [ ] Performance aceptable (Lighthouse > 90)
- [ ] SEO básico configurado
- [ ] `security.txt` con contacto real
- [ ] `robots.txt` actualizado

## 🆘 Troubleshooting

### Error: Build Failed

```bash
# Verificar localmente primero
npm run build

# Revisar logs en Vercel Dashboard
# Common issues:
- TypeScript errors → Fix en tu IDE
- Missing dependencies → npm install
- Wrong build command → Revisar vercel.json
```

### Headers no aparecen

- Verifica que `vercel.json` está en la raíz
- Espera 1-2 minutos después del deploy
- Clear cache del navegador (Ctrl+Shift+R)

### CSP Bloqueando Recursos

Si ves errores en consola:

1. Abre DevTools → Console
2. Identifica qué fuente fue bloqueada
3. Actualiza CSP en `vercel.json` → headers → Content-Security-Policy

## 📚 Recursos

- [Vercel Docs](https://vercel.com/docs)
- [Angular Deployment](https://angular.dev/tools/cli/deployment)
- [Security Headers](https://securityheaders.com)
- [SSL Labs Test](https://www.ssllabs.com/ssltest/)

---

**¿Listo para desplegar?** 🚀

```bash
git add .
git commit -m "feat: add security configuration"
git push origin main
vercel --prod
```

**Nota**: El primer despliegue puede tomar 2-3 minutos. Los siguientes son más rápidos.
