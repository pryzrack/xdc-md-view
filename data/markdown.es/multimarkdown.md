> **Nota:** Multimarkdown tiene muchas mas funcionalidades, pero solo muestro las que añadí

# Multimarkdown

Ya has visto en la sección de sintaxis que resulta muy sencillo pillarle el truco a **Markdown** e introducirlo en tu flujo de trabajo.

Y no es para menos, ya que la finalidad de Markdown es precisamente esa, ser lo **suficientemente sencillo como para que te facilite la vida en lugar de complicártela**.

Depende del nivel al que necesites llegar para escribir artículos en tu blog (o documentación offline u otro tipo de contenido), te habrás dado cuenta de que al Markdown original quizá le faltan ciertas características para poder realizar todo aquello que necesitas (tablas, notas de pie de página…)

Es por eso que de hace un tiempo para aquí se están generando nuevas y mejores sintaxis a partir de la original.

Si eres un usuario avanzado que **necesita ir más allá** de lo visto en la sección de sintaxis, presta atención a las mejoras y novedades que te muestro a continuación.

## Índice de contenido

1. [Acerca de Multimarkdown](#about)
1.2 [Referencias cruzadas](#referencia)
1.3 [Tablas](#table)
1.4 [¡Eso es todo!](#end)

## Acerca de Multimarkdown

Multimarkdown (también conocido como MMD), nació de la necesidad de **Fletcher Penney** de escribir documentos académicos utilizando Markdown.

Así que este lenguaje no solo incluye todas las características que has visto anteriormente en la sintaxis de Markdown, sino que **vitamina** esta última añadiendo la capacidad de escribir **notas al pie de página, tablas, o metadatos**.

Ojo, **no todas las aplicaciones soportan Multimarkdown**.

Así que si intentas utilizar este tipo de sintaxis y no obtienes los resultados esperados, comprueba que la aplicación/servicio donde estás escribiendo ofrece dicho soporte.

## Referencias cruzadas {#referencia}

Las referencias cruzadas sirven para añadir **links a partes específicas de tu documento**.

Es lo que has visto por ejemplo en el índice de esta entrada.

Para especificar qué un link de referencia, deberás incluir entre llaves el nombre que quieres que tenga dicho enlace de la siguiente manera `{#EnlaceReferencia}`.

```markdown
## Encabezado que quieres referenciar {#EncabezadoReferencia}
```

Así se generan referencias a partes concretas de un documento con Multimarkdown.

Una vez definido, puedes enlazarlo desde cualquier palabra o texto fácilmente como ya visto en la sintaxis de links, pero en lugar de una URL, tendrás que escribir el `#NombreDeTuReferencia`.

```markdown
Quiero que [este enlace](#referencia) vaya al encabezado de referencias cruzadas.
```
Quiero que [este enlace](#referencia) vaya al encabezado de referencias cruzadas.

## Tablas {#table}

Generar tablas con Multimarkdown es una de las cosas más complicadas que harás con este lenguaje, y aun así verás que es bastante sencillo. Para no complicarte demasiado voy por partes.

Para especificar los **elementos de la cabecera de cada columna** deberás encerrarlos entre barras verticales `|`, es decir:

~~~
| Primera columna | Segunda columna | Tercera columna |
~~~

Ahora deberás **crear una línea adicional debajo para especificar que los encabezados terminan**.

Esto lo harás creando una línea similar a la anterior, pero **en lugar del nombre de la columna, simplemente escribe dos guiones** `--`.

Como **truco**, cada vez que quieras crear una tabla **copia la línea de cabecera y sustituye los nombres por guiones**.

Tenemos que entonces el resultado para generar la cabecera sería el siguiente:

~~~
| Primera columna | Segunda columna | Tercera columna |
| -- | -- | -- |
~~~

Si ahora introdujésemos esa sintaxis sin anular Markdown, verías que la cabecera ya se muestra correctamente.

| Primera columna | Segunda columna | Tercera columna |
| -- | -- | -- |

Ahora falta **añadir el contenido de la tabla*".

Las filas de contenido se crean **exactamente igual que la línea de cabecera**, pero Markdown es capaz de diferenciarlo gracias a la sintaxis que acabas de utilizar en el paso anterior (`| -- | -- | -- |`)

Así que como **truco** te vuelvo a recomendar que: **por cada línea de contenido que quieras añadir a tu tabla, simplemente copies la línea de cabecera y sustituyas los nombres por el contenido**.

Tal que así:

~~~
| Primera columna | Segunda columna | Tercera columna |
| -- | -- | -- |
| Contenido 1-1 | Contenido 1-2 | Contenido 1-3 |
| Contenido 2-1 | Contenido 2-2 | Contenido 2-3 |
| Contenido 3-1 | Contenido 3-2 | Contenido 3-3 |
~~~

De esta forma obtendrás una tabla completamente funcional.

| Primera columna | Segunda columna | Tercera columna |
| -- | -- | -- |
| Contenido 1-1 | Contenido 1-2 | Contenido 1-3 |
| Contenido 2-1 | Contenido 2-2 | Contenido 2-3 |
| Contenido 3-1 | Contenido 3-2 | Contenido 3-3 |

¿Has visto que fácil resulta generar tablas con Multimarkdown cuando se entiende el proceso paso a paso?

## ¡Eso es todo! {#end}
Espero que hayas aprendido y te hayas convertido en un auténtico maestro de Markdown.
