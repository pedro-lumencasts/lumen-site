# Lumen — Website Build Sheet

Documento vivo. Se actualiza a medida que vamos cerrando secciones.
Fuente de copy: `messaging-and-site-copy.docx` (Tim).

---

## ⚠️ Decisiones abiertas (resolver antes de avanzar mucho)

| # | Decisión | Estado |
|---|---|---|
| D1 | **Qué orden de secciones manda.** El doc tiene dos: "NEW VARIATION" (12 secciones, incluye AI) y la versión de abajo con tachados (11 secciones, sin AI, otro orden de Pricing/Who-this-is-for). Este build sheet usa NEW VARIATION como base. | Abierta |
| D2 | **¿Entra la sección de AI?** Solo existe en la variante nueva. Es de las más fuertes del doc y conecta con el hallazgo de "delegar sin perder coherencia". | Abierta — construida, se puede sacar |
| D3 | **Nombre / dominio.** El doc todavía dice Lumencasts; Tim propone opciones con "fuego". Afecta logo, favicon, wordmark en el nav. | Abierta — no bloquea diseño. El wordmark vive en `lib/brand.ts`, cambiarlo es una línea |
| D4 | **CTA principal.** ~~"Book a call" vs "Try one video"~~ | ✅ **CERRADA** — **Try one video**. Definido en `lib/brand.ts` |
| D5 | **Datos reales pendientes.** Turnaround por tipo de video, tabla de tokens, retention graphs. Marcados como `[PLACEHOLDER]` abajo. | Abierta — la calculadora ya está armada, faltan los números |
| D6 | **Hero.** ~~v1 / v2 / v3~~ | ✅ **CERRADA** — **v1 (scroll-morph)**. Su paleta ya era el sistema de tokens, así que no hubo recoloreo |

---

## Arquitectura del sitio

**Todo en una sola homepage con scroll largo**, salvo lo marcado como página aparte.
Razón: el doc está escrito como una sola narrativa de venta, no como un sitio multi-página.

### Leyenda de tags
- `HOME` — vive en la homepage
- `PÁGINA` — merece página propia
- `TABS` — necesita interfaz de pestañas
- `ESTÁTICO` — solo copy y visual, sin interacción
- `INTERACTIVO` — requiere estado/lógica
- `DATOS` — necesita información real que todavía no tenemos

---

## Mapa de secciones

### 00 · Nav
`HOME` · `ESTÁTICO`
No está en el doc — inventado. Wordmark + 4 links de sección + CTA primario.
**Estado:** ✅ **En React** → `components/sections/SiteNav.tsx`
Fijo arriba, transparente sobre el hero, sólido con blur al scrollear. Links ocultos en mobile.

---

### 01 · Hero
`HOME` · `INTERACTIVO`
Eyebrow · H1 · Sub · Support ("Editing you don't have to double-check") · CTA doble.
**Estado:** ✅ **En React** → `components/sections/Hero.tsx` (elegida **v1 scroll-morph**)
**Cambio vs. el mockup:** el mockup secuestraba la rueda del mouse (`preventDefault` + scroll virtual), lo que dejaba al visitante atrapado en una página de scroll largo. En React la misma coreografía la maneja el scroll real, con wrapper alto + sticky (mismo patrón que 03 y 05). El loop de animación se pausa cuando el hero sale de pantalla.

---

### 02 · The work (antes/después)
`HOME` · `INTERACTIVO` · `DATOS`
Header: "Watch the difference before you read about it."
Mismo footage, edición común vs. la nuestra. Long-form, clip y short-form.
Retention graphs donde el cliente lo permita, con la caída marcada.
**Datos que faltan:** footage real de clientes + permiso para los retention graphs.
**Estado:** ✅ **Diseñada** → `section-02-the-work.html`
Dirección elegida: drag antes/después (mecanismo de la v2 del hero, mudado acá). Tabs por formato (long / clip / short) + retention graph con la caída marcada.

---

### 03 · The difference (retención / Time On Brand)
`HOME` · `ESTÁTICO`
Header: "Watch time. Watch time. Watch time. It's what we do."
**Estado:** ✅ **Diseñada** → `section-03-the-difference.html`
Dirección elegida: WavyBlock — tipografía gigante apilada que entra en ola con el scroll. Las líneas son la narrativa de retención ("Nobody watches one reel and buys" → "Then they trust you"), no palabras sueltas.

---

### 04 · AI
`HOME` · `INTERACTIVO` · sujeto a **D2**
Header: "Yes, we use AI. Just not for the parts that matter."
**Estado:** ✅ **Diseñada** → `section-04-ai.html`
Dirección propuesta: switcher "Machine assembly" vs "Editor's cut" sobre el mismo timeline. En modo máquina los cortes son parejos y hay un scanner corriendo; en modo editor los clips se vuelven desiguales, seis se descartan y cada uno que queda muestra el motivo ("hold the reaction", "cut before the ums"). Cierra con el bloque del rol supervisor.

---

### 05 · What we edit (formatos)
`HOME` · `ESTÁTICO` (o `TABS` liviano)
Header: "Every format you publish to."
Lista de 9 formatos + párrafo de "mandanos lo que grabaste".
**Estado:** ✅ **Diseñada** → `section-05-what-we-edit.html`
Dirección elegida: dos partes. (A) efecto tipo Gemini — cinco caminos que salen de "one recording" y se abren en formatos a medida que scrolleás. (B) grilla dinámica de 9 formatos que se expande al pasar el mouse.

---

### 06 · Who this is for
`HOME` · `ESTÁTICO`
Header: "This works if you're already making videos."
Incluye el anti-pitch (si todavía no sabés qué filmar, no somos para vos). Sección corta, casi un divisor.
**Estado:** ✅ **En React** → `components/sections/Section06WhoFor.tsx`
Dos tarjetas lado a lado: "YOU'RE A FIT" (borde acento) vs "NOT YET" (neutra). El anti-pitch queda visible sin sonar defensivo.

---

### 07 + 08 · Para expertos / Para agencias
`HOME` · **`TABS`** ← acá sí hacen falta pestañas
Son dos audiencias mirando la misma oferta. El doc mismo dice que la agencia "gets answered in one section rather than shaping the site".
Tab A: "You're publishing to get hired." → CTA: See what a month looks like
Tab B: "Capacity that scales with your month." → CTA: Talk about capacity
**Estado:** ✅ **En React** → `components/sections/Section0708Audiences.tsx`
Switcher con el mismo patrón visual que los tabs de 02 y 04, para que se lea como el mismo sistema.

---

### 09 · Pricing (tokens)
`HOME` · `INTERACTIVO` · `DATOS`
Header: "One price list. No plans to pick."
Tabla de costo en tokens por tipo de video + umbrales de volumen.
**Idea fuerte:** calculadora — el visitante cuenta lo que publica por mes y ve su tarifa bajar sola al cruzar un umbral. Es exactamente lo que la copy describe.
**Datos que faltan:** `[PLACEHOLDER]` costo por tipo de video, umbrales, tarifas, precios de add-ons.
**Estado:** ✅ **En React** → `components/sections/Section09Pricing.tsx`
La calculadora está construida y el contador funciona. **Ningún número está inventado**: costos y tarifas se muestran como `—` hasta que lleguen los datos reales. Para cargarlos, editar `VIDEO_TYPES[].tokens` y `TIERS[]` en ese archivo.

---

### 10 · Call to action
`HOME` · `ESTÁTICO`
Header: "Start with one video."
Sin suscripción, sin compromiso. CTA doble: Try one video / Build your order.
**Estado:** ✅ **En React** → `components/sections/Section10CTA.tsx`

---

### 11 · Questions (FAQ)
`HOME` · `INTERACTIVO`
8 preguntas, formato acordeón.
**Datos que faltan:** `[PLACEHOLDER]` turnaround por tipo de video (pregunta "How fast?").
**Estado:** ✅ **En React** → `components/sections/Section11FAQ.tsx`
Acordeón de una sola pregunta abierta a la vez, con altura animada.

---

### 12 · Close
`HOME` · `ESTÁTICO`
Header: "Built To Binge." (o el que quede tras D3)
"Send us one video. You'll see it in the edit."
**Estado:** ✅ **En React** → `components/sections/Section12Close.tsx`
El header sale de `BRAND_TAGLINE` en `lib/brand.ts`, así que el cambio de nombre es una línea.

---

### 13 · Footer
`HOME` · `ESTÁTICO`
No está en el doc — inventado.
**Estado:** ✅ **En React** → `components/sections/SiteFooter.tsx`
Wordmark + promesa, dos columnas de links, línea legal `[PLACEHOLDER]`.

---

### Páginas aparte (fuera de la homepage)
| Página | Origen | Estado |
|---|---|---|
| **See the work** (portfolio completo) | CTA primario del hero | ⬜ |
| **Build your order** (configurador de tokens) | CTA secundario, aparece 3 veces | ⬜ |

---

## Reglas de voz (del doc, aplicables a todo lo que escribamos)

**Nunca usar:** unlock, elevate, transform, seamless, effortless, world-class, cutting-edge, next level, "in today's fast-paced digital landscape". Sin signos de exclamación. Sin "we're passionate about".

**Nunca afirmar:** cheapest, unlimited, fastest in the industry, AI-powered.

**Registro:** un operador hablándole a otro. Frases cortas. Sustantivos concretos.

---

## Workflow

Por cada sección, en orden:
1. Te muestro 2–3 direcciones de diseño distintas (como hicimos con el hero)
2. Elegís una, o mezclás
3. La construyo como archivo HTML aparte
4. Marco la sección como ✅ acá y anoto qué se eligió
5. Al final, ensamblamos todo en una sola página

**Orden sugerido:** cerrar Hero → 02 The work → 03 The difference → 04 AI → 05 Formatos → 06 Who → 07/08 Tabs → 09 Pricing → 10 CTA → 11 FAQ → 12 Close → 00 Nav + 13 Footer al final (se diseñan mejor cuando ya existe el resto).

---

## Decisiones tomadas

| Sección | Dirección elegida | Componente React |
|---|---|---|
| 00 Nav | Fijo, sólido al scrollear | `SiteNav.tsx` |
| 01 Hero | **v1 scroll-morph** (scroll real, no secuestrado) | `Hero.tsx` |
| 02 The work | Drag antes/después + tabs por formato + retention graph | `Section02Work.tsx` |
| 03 The difference | WavyBlock tipográfico con scroll | `Section03Difference.tsx` |
| 04 AI | Timeline máquina vs. editor (switcher) | `Section04AI.tsx` |
| 05 What we edit | Fan-out de caminos + grilla dinámica | `Section05Formats.tsx` |
| 06 Who this is for | Dos tarjetas: fit / not yet | `Section06WhoFor.tsx` |
| 07+08 Audiencias | Tabs expertos / agencias | `Section0708Audiences.tsx` |
| 09 Pricing | Calculadora de volumen (sin números aún) | `Section09Pricing.tsx` |
| 10 CTA | Doble CTA | `Section10CTA.tsx` |
| 11 Questions | Acordeón | `Section11FAQ.tsx` |
| 12 Close | Tipografía gigante | `Section12Close.tsx` |
| 13 Footer | Wordmark + links | `SiteFooter.tsx` |

**Sistema visual — ya no es provisional.** Con el hero v1 elegido, la paleta v1 queda confirmada:
fondo `#15151A`, superficie `#1F1F26`, texto `#ECEAE4`, dim `#8B8B93`, acento `#E8483C`, línea
`#2E2E37`. Tipos: Sora (display) · Inter (cuerpo) · IBM Plex Mono (timecodes y etiquetas). Todo
vive en `@theme` dentro de `app/globals.css`.

**Identidad en un solo lugar:** `lib/brand.ts` concentra el nombre (`BRAND_NAME`), el tagline del
cierre (`BRAND_TAGLINE`), los links del nav y los CTAs. El rename de D3 es una línea.

---

## Qué falta

1. **Páginas aparte:** *See the work* y *Build your order* (los CTAs apuntan a `#start` como
   placeholder hasta que existan).
2. **Datos reales (D5):** tabla de tokens + umbrales, turnaround por tipo de video, retention data.
3. **Assets reales:** todas las imágenes son stock de Unsplash — hace falta footage de clientes.
4. **Confirmar D1** (orden de secciones) y **D2** (si la sección de AI entra).

---

## Prueba de estructura — `/v2`

Segunda ruta con el **mismo contenido en otro orden**, siguiendo el flujo
argumental de thebirdhouse.co. No es un fork: importa los mismos componentes que
la home, así que arreglar una sección arregla las dos.

| # | Sección | De dónde sale |
|---|---|---|
| 1 | Headline | `Hero` |
| 2 | Credibility | `SectionCredibility` (nueva) + `Section02Work` como demostración |
| 3 | Why us + CTA | `Section03Difference` + `Section06WhoFor` + `CTABand` + `SectionProducer` |
| 4 | What we do | `Section05Formats` + `Section0708Audiences` |
| 5 | Testimonials | `SectionTestimonials` (nueva) |
| 6 | Our process | `SectionProcess` (nueva) + `Section04AI` + `CTABand` |
| 7 | Pricing | `Section09Pricing` |
| 8 | About us | `SectionAbout` (nueva) |
| 9 | FAQ | `Section11FAQ` |

**Decisiones:** "Who this is for" y las tarjetas Experts/Agencies se absorben en
3 y 4 en vez de ir sueltas. Pricing conserva sección propia — el costo publicado
por tokens es la ventaja con agencias, y enterrarlo en el FAQ como hace la
referencia la tiraría. Dos CTA intermedios, uno tras el argumento y otro tras el
proceso.

**Lo que falta y no se inventó:** la credibilidad de la referencia son números
duros ("100+ empresas", "10 mil millones de impresiones") y testimonios en video
con resultados. No tenemos ninguno. Esas secciones renderizan la *forma* con los
valores vacíos — cada `—` y cada `[PLACEHOLDER]` es algo que hay que salir a
conseguir. Los testimonios están deliberadamente vacíos: nada de citas ni nombres
inventados.
