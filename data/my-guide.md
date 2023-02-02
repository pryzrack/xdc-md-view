# Contenido

[[ Enlazando archivos | link_files ]]

[[ Tablas | tables ]]

## Enlazando Archivos

Puedes crear un enlace entre dos archivos markdown utilizando `[[ descripción | archivo ]]` **doble corchetes**, la descripción y el símbolo `|` son obligatorios.

Markdown | Resultado
---|---
`[[ Inicio \| index ]]` | [[ Inicio \| index ]]

## Links o Enlaces

Todos los enlaces son redirigidos por defecto al bot de navegación <adb_bot1@testrun.org>.

Puedes decorar el texto de la descripción con el símbolo `|` para definir otra función `[ descripción | decorador opcional ](enlace)`. Existen dos decoradores predefinido: `normal` y `feed`, el primero abrirá el link con el navegador del dispositivo y el segundo con el bot de suscripción. Además puedes utilizar un correo como decorador y el enlace te redireccionará allí. Aquí tienes una guía de cómo puedes hacerlo.

Markdown | Resultado | Descripción
---|---|---
`[ Xataka ](https://www.xataka.com/)` | [ Xataka ](https://www.xataka.com/) | Abrirá en enlace con el bot de navegación.
`[ Xataka \| normal ](https://www.xataka.com/)` |  [ Xataka \| normal ](https://www.xataka.com/) | Abrirá el enlace con el navegador del dispositivo.
`[ Xataka \| feed :/sub https://www.xataka.com/index.xml: ](!)` | [ Xataka \| feed :/sub https://www.xataka.com/index.xml: ](!) | Abrirá el enlace con el FeedBot precedido del comando `/sub`.
`[ Xataka \| web2pdf@hispanilandia.net ](https://www.xataka.com/)` | [ Xataka \| web2pdf@hispanilandia.net ](https://www.xataka.com/) | Abrir con una dirección de correo personalizada, en este caso con el bot **web2pdf**.