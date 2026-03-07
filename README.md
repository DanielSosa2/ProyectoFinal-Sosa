# ENTREGA FINAL: Actividad Interactiva de Reconocimiento de Vocales por Audio

## Demo del proyecto
🔗 https://danielsosa2.github.io/ProyectoFinal-Sosa/

## Descripción del proyecto

Este proyecto consiste en una actividad interactiva orientada al **reconocimiento auditivo de vocales**. El usuario escucha un audio y debe seleccionar la vocal correcta entre diferentes opciones.

La aplicación fue desarrollada utilizando **HTML, CSS y JavaScript**, y busca simular una pequeña herramienta educativa donde el usuario interactúa con distintos audios y recibe un resultado final basado en sus respuestas.

Durante la actividad se registran **aciertos y errores**, y al finalizar se muestra el desempeño del usuario junto con un **ranking de jugadores almacenado en localStorage**.

## Objetivo
El objetivo del proyecto es aplicar conceptos fundamentales de desarrollo web mediante la creación de una actividad interactiva que incluya:
- Manipulación dinámica del **DOM**
- Manejo de **eventos**
- Consumo de datos desde un **archivo JSON**
- Uso de **localStorage** para persistencia de datos
- Interacción del usuario con contenido multimedia (audio)

## Funcionamiento de la actividad
1. El usuario inicia la actividad.
2. Se reproduce un audio correspondiente a una vocal.
3. El usuario selecciona la opción que considera correcta.
4. El sistema registra si la respuesta es correcta o incorrecta.
5. Se avanza automáticamente a la siguiente actividad.
6. Al finalizar se muestra el resultado total y se actualiza el ranking de jugadores.

## Características implementadas
- Reproducción de audios para identificar vocales
- Interacción mediante botones de respuesta
- Registro de **aciertos y errores**
- Resultado final de la actividad
- Sistema de **ranking de jugadores**
- Persistencia de ranking mediante **localStorage**
- Barra de progreso durante la actividad
- Carga de actividades desde **archivo JSON**
- Mezcla de opciones para evitar patrones repetitivos

## Tecnologías utilizadas
- **HTML5**
- **CSS3**
- **JavaScript**
- **JSON**
- **LocalStorage**


## Estructura del proyecto
- [preguntas.json](preguntas.json) → archivo con las actividades
- [script.js](script.js) → lógica del juego
- [style.css](style.css) → estilos
- [index.html](index.html) → estructura principal
- [assets/audios](assets/audios) → audios de las vocales
- [assets/img](assets/img) → imágenes utilizadas

## Escalabilidad del proyecto
El proyecto está estructurado de forma que permite ampliar fácilmente el contenido agregando nuevas actividades dentro del archivo **preguntas.json**.
Una posible ampliación sería incorporar **nuevos niveles con consonantes u otros sonidos**, agregando nuevos audios y actividades. Debido a que el objetivo principal de la actividad es el reconocimiento auditivo, la ampliación del contenido requiere la grabación de nuevos audios para mantener la coherencia del ejercicio.

## Autor
**Daniel Sosa**


