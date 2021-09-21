<!-- TODO: Update with your values. -->
# Karaoke Docs
> Descripción de las decisiones sobre la arquitectura de la aplicación Karaoke.

 <!-- TODO: Update repo links and change license type if needed. -->

[![Made with latest Docsify](https://img.shields.io/npm/v/docsify/latest?label=docsify)](https://docsify.js.org/)


<!-- TODO: You can delete the About and Create a Docsify site sections if you create a new project from this template -->

## About

Karaoke consiste en una aplicación web que permite a los usuarios reproducir canciones sincronizadas con la letra. Ofrece un diseño 
atractivo y hace uso de tecnologías como _Jenkins_, _Angular_, _Keycloack_, entre otras. 

This is a template for a simple but elegant docs site built on _Docsify_ which magically turns your markdown in your `docs` directory into a docs site. 

This is a statically-built site - just commit and push and your Github Pages site will re-deploy.

_Docsify.js_ runs as a _Single-Page Application_ on `index.html` - it relies on JavaScript to pull in content from markdown file, within the app shell. This gives a modern progressive web-app experience for instant page loads. But, this **not** SEO-friendly as crawlers don't like to or can't load JavaScript. So use a static site instead if you need to be found on search engines.

If you want learn about _Docsify_ and how to customize a docs like this, follow this tutorial:

<div align="center">
 
[![Teach me - DocsifyJS tutorial](https://img.shields.io/badge/Teach_me-DocsifyJS_tutorial-blue)](https://michaelcurrin.github.io/docsify-js-tutorial/#/)

</div>


## Create a Docsify site
> How to create your own docs site like this one

Click the button below to create your own copy of this repo.

<div align="center">
    <a href="https://github.com/MichaelCurrin/docsify-js-template/generate">
        <img src="https://img.shields.io/badge/Generate-Use_this_template-2ea44f?style=for-the-badge" alt="Use this template">
    </a>
</div>

<br>

Then follow instructions in the original GitHub repo linked below. The `README.md` file covers how to set up docs site like this one.

<div align="center">
    <a href="https://github.com/MichaelCurrin/docsify-js-template">
        <img src="https://img.shields.io/static/v1?label=MichaelCurrin&message=docsify-js-template&color=blue&style=for-the-badge&logo=github" alt="MichaelCurrin - docsify-js-template">
    </a>
</div>


## Tecnología de Bases de Datos: MongoDB

Se optó por utilizar una base de datos no relacional usando el motor de base de datos MongoDB.
Esta decisión se toma debido a las siguientes razones:

- Los datos a almacenar son sencillos y se pueden agrupar en tan solo dos collecciones: Canciones y Usuarios. Además, la relación entre estas dos colecciones es simple. Por lo cual es innecesario optar por un modelo relacional.
- MongoDB es un motor de bases de datos ampliamente conocido y utilizado, lo que genera confianza en su calidad y conveniencia. 
- Es muy sencillo inicializar una base de datos MongoDB y conectarse a ella desde Node.js.
- A pesar de su sencillez, es posible realizar queries en MongoDB, lo que es beneficioso para el realizar el filtrado de canciones por sus características (Artista, Nombre, Letra, ...)

## Diseño de la base de datos

El diseño de la base de datos sigue el formato presentado en el siguiente diagrama relacional:

<div align="center">
    <a href="https://ibb.co/R9Y9rfP">
        <img src="https://i.ibb.co/f2q26ft/Diagramas.png" alt="Diagramas" border="0">
    </a>
</div>


## Organización del Proyecto de Código

Se decidió mantener el código del API y el proyecto del FrontEnd en un mismo repositorio. Esto se decidió debido a:

- Mantener todo el proyecto en un mismo repositorio simplifica el flujo de integracion continua.
- Mantener todo el proyecto en un mismo repositorio simplifica el control de versiones.

La organización en el repositorio se da por carpetas de la siguiente manera: 

- Backend: Carpeta en la cual se encuentra el API desarrollado en Node.js mediante Express.
- KaraokeFrontend: En esta carpeta se encuentra el Frontend del projecto desarrollado con el framework Angular.
- docs: En esta carpeta se encuentra la documentación del proyecto a mostrar en la página del proyecto.

## Installation

_TODO: Add your instructions here or link to an installation.md page._


## Usage

_TODO: Add your instructions here or link to a usage.md page._
