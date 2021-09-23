<!-- TODO: Update with your values. -->
# Karaoke Docs
> Descripción de las decisiones sobre la arquitectura de la aplicación Karaoke.

 <!-- TODO: Update repo links and change license type if needed. -->

[![Made with latest Docsify](https://img.shields.io/npm/v/docsify/latest?label=docsify)](https://docsify.js.org/)


<!-- TODO: You can delete the About and Create a Docsify site sections if you create a new project from this template -->

## Sobre Karaoke

Karaoke consiste en una aplicación web que permite a los usuarios reproducir canciones sincronizadas con la letra. Ofrece un diseño 
atractivo y hace uso de tecnologías como _Jenkins_, _Angular_, _Keycloack_, entre otras. 



## Frameworks utilizados

### Express.
Express es deliberadamente un framework de aplicaciones web muy ligero, por lo que gran parte de sus beneficios y potencial proviene de bibliotecas y características de terceros.


### Angular.

Angular es un framework opensource desarrollado por Google para facilitar la creación y programación de aplicaciones web de una sola página, las webs SPA, separa completamente el frontend y el backend en la aplicación, evita escribir código repetitivo y mantiene todo más ordenado gracias a su patrón MVC.

![enter image description here](https://th.bing.com/th/id/R.170271fc9a82462fee346c7a33a190fe?rik=5jtv%2fbOq3A6ISw&pid=ImgRaw&r=0)
### Swagger.

Es un framework para documentar APIs Rest desde muy diferentes fuentes: Archivos de configuración, XML, C#, Javascript, Ruby, PHP, Java, Scala entre otros, este framework  es utilizado puesto que con el se puede describir, producir, consumir y visualizar la API.
![enter image description here](https://www.scottbrady91.com/img/logos/swagger-banner.png)

## Toolkits.

### Mongo DB Node Driver.

MongoDB Node driver es un controlador el cual cuenta con una API asincrónica quese  puede usar para acceder a los valores de retorno del método a través de Promesas o especificar devoluciones de llamada para acceder a ellos cuando se comunica con MongoDB.
![enter image description here](https://download.logo.wine/logo/MongoDB/MongoDB-Logo.wine.png)
### Keycloack.

Keycloack es un producto de software de código abierto que permite el inicio de sesión único (IdP) con Identity Management y Access Management para aplicaciones y servicios modernos, este toolkit nos permite identificar los métodos de autenticación y haga que evolucionen sin modificar las aplicaciones.
![enter image description here](https://th.bing.com/th/id/OIP.yiFbD9DVA3reJa0EhJHj1gHaHa?pid=ImgDet&rs=1)

## Lenguaje de programación.
En función de la decisión de desarrollar la aplicación web usando Angular, se usó **Type Script** como principal lenguaje de programación en el front-end. Además, como complemento para Express, se hizo uso de **Java Script** para escribir el back-end. 
![Typescript logo](https://th.bing.com/th/id/R.f2ac8107186f5221c7820480534f74bb?rik=Ig8/7gNT4dzB4g&pid=ImgRaw&r=0)
## Cloud Provider: Azure

Se seleccionó Azure como proveedor de servicios en la nube para las máquinas virtuales y para el almacenamiento de las canciones. Esta elección se dió dado que:

- Azure es un proveedor de servicios en la nube ampliamente conocido y con una gran relevancia en la actualidad.
- Azure provee un crédito de 100 dolares a estudiantes universitarios


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
