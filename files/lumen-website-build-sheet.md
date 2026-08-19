# Lumen — Website Build Sheet

Documento vivo. Se actualiza a medida que vamos cerrando secciones.
Fuente de copy: `messaging-and-site-copy.docx` (Tim).

---

## ⚠️ Decisiones abiertas (resolver antes de avanzar mucho)

| # | Decisión | Estado |
|---|---|---|
| D1 | **Qué orden de secciones manda.** El doc tiene dos: "NEW VARIATION" (12 secciones, incluye AI) y la versión de abajo con tachados (11 secciones, sin AI, otro orden de Pricing/Who-this-is-for). Este build sheet usa NEW VARIATION como base. | Abierta |
| D2 | **¿Entra la sección de AI?** Solo existe en la variante nueva. Es de las más fuertes del doc y conecta con el hallazgo de "delegar sin perder coherencia". | Abierta |
| D3 | **Nombre / dominio.** El doc todavía dice Lumencasts; Tim propone opciones con "fuego". Afecta logo, favicon, wordmark en el nav. | Abierta — no bloquea diseño |
| D4 | **CTA principal.** Dos caminos conviven en el doc: "Book a call" (versión vieja) vs "Try one video / Build your order" (versión nueva). Cambia el hero y el cierre. | Abierta |
| D5 | **Datos reales pendientes.** Turnaround por tipo de video, tabla de tokens, retention graphs. Marcados como `[PLACEHOLDER]` abajo. | Abierta |

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
No está en el doc — hay que inventarlo. Mínimo: wordmark, See the work, Pricing, CTA.
**Estado:** ⬜ sin diseñar

---

### 01 · Hero
`HOME` · `INTERACTIVO`
Eyebrow · H1 · Sub · Support ("Editing you don't have to double-check") · CTA doble.
**Estado:** ✅ **3 opciones hechas** — v1 timeline/scroll, v2 monitor/drag, v3 marquesina/carga
**Pendiente:** elegir una

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
**Estado:** ⬜ sin diseñar

---

### 07 + 08 · Para expertos / Para agencias
`HOME` · **`TABS`** ← acá sí hacen falta pestañas
Son dos audiencias mirando la misma oferta. El doc mismo dice que la agencia "gets answered in one section rather than shaping the site".
Tab A: "You're publishing to get hired." → CTA: See what a month looks like
Tab B: "Capacity that scales with your month." → CTA: Talk about capacity
**Estado:** ⬜ sin diseñar

---

### 09 · Pricing (tokens)
`HOME` · `INTERACTIVO` · `DATOS`
Header: "One price list. No plans to pick."
Tabla de costo en tokens por tipo de video + umbrales de volumen.
**Idea fuerte:** calculadora — el visitante cuenta lo que publica por mes y ve su tarifa bajar sola al cruzar un umbral. Es exactamente lo que la copy describe.
**Datos que faltan:** `[PLACEHOLDER]` costo por tipo de video, umbrales, tarifas, precios de add-ons.
**Estado:** ⬜ sin diseñar

---

### 10 · Call to action
`HOME` · `ESTÁTICO`
Header: "Start with one video."
Sin suscripción, sin compromiso. CTA doble: Try one video / Build your order.
**Estado:** ⬜ sin diseñar

---

### 11 · Questions (FAQ)
`HOME` · `INTERACTIVO`
8 preguntas, formato acordeón.
**Datos que faltan:** `[PLACEHOLDER]` turnaround por tipo de video.
**Estado:** ⬜ sin diseñar

---

### 12 · Close
`HOME` · `ESTÁTICO`
Header: "Built To Binge." (o el que quede tras D3)
"Send us one video. You'll see it in the edit."
**Estado:** ⬜ sin diseñar

---

### 13 · Footer
`HOME` · `ESTÁTICO`
No está en el doc — hay que inventarlo.
**Estado:** ⬜ sin diseñar

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

| Sección | Dirección elegida | Archivo |
|---|---|---|
| 02 The work | Drag antes/después + tabs por formato + retention graph | `section-02-the-work.html` |
| 03 The difference | WavyBlock tipográfico con scroll | `section-03-the-difference.html` |
| 04 AI | Timeline máquina vs. editor (switcher) | `section-04-ai.html` |
| 05 What we edit | Fan-out de caminos + grilla dinámica | `section-05-what-we-edit.html` |

**Sistema visual provisional** (hasta que se cierre el hero): paleta v1 — fondo `#15151A`, superficie `#1F1F26`, texto `#ECEAE4`, dim `#8B8B93`, acento `#E8483C`, línea `#2E2E37`. Tipos: Sora (display) · Inter (cuerpo) · IBM Plex Mono (timecodes y etiquetas). Si se elige v2 o v3 para el hero, se recolorean todas las secciones — la estructura no cambia.
