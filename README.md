# NEVALUZ — Página principal

Página principal de NEVALUZ, una marca peruana de lámparas artesanales elaboradas a partir de frascos de vidrio recuperado. Este repositorio es independiente de `nevaluz-catalog-avanze`: el catálogo existente conserva su propio ciclo de cambios.

## Dirección del sitio

La experiencia está pensada primero para computadora y sigue una lógica editorial cálida: el hero presenta la emoción antes que la ficha técnica; la historia explica el propósito; el proceso reduce dudas; la colección concentra la decisión en Reno grande, disponible a **S/ 12**; y el cierre dirige a WhatsApp sin formularios innecesarios.

La página usa Cormorant Garamond para el registro emocional y DM Sans para navegación, etiquetas y lectura funcional. La paleta combina carbón profundo, marrón nogal, papel marfil y latón NEVALUZ. Cabaña y Pack Pareja se mantienen como futuras ediciones: sus imágenes están completamente difuminadas y llevan la etiqueta exacta “Próximamente”. Pack Pareja no muestra un precio inventado.

## Desarrollo local

No requiere dependencias de Node. Para abrirlo localmente:

```bash
python3 -m http.server 3000
```

Luego visita `http://localhost:3000`.

## Estructura

- `index.html`: contenido semántico, metadatos y secciones de la home.
- `styles.css`: sistema visual editorial, iluminación, responsive y estados accesibles.
- `script.js`: navegación, scroll progress, revelado, modal de productos y CTA de WhatsApp.
- `assets/nevaluz-brand/`: fotografías y adaptaciones suministradas para la marca.
- `manus-routes.json`: manifiesto de la ruta principal para el Preview.
- `brand-spec.md`: decisiones de marca, copy y disponibilidad.

## Contacto de marca

- WhatsApp: +51 946 374 985
- TikTok: [@nevaluz16](https://www.tiktok.com/@nevaluz16)
