


# Análisis de Debilidades

## Seguridad:

### Pagina en HTTP

Nuestro protocolo de transferencia de datos está dado como un HTTP lo cual implica que la información que estamos subiendo a la red no está cifrada, por lo tanto esta es una de nuestras debilidades y se recomiendan hacer la transición al protocolo HTTPS lo que va a impedir que otros usuarios puedan interceptar la información confidencial que se transfiere entre el cliente y el servidor web a través de Internet.

Para esto es necesario que la página web funcione bajo el protocolo HTTPS es necesario instalar un Certificado SSL.

### Ips hardcoded

Los servicios de hoy tienen una arquitectura en constante cambio debido a sus necesidades de escalabilidad y redundancia. Es un error pensar que un servicio siempre tendrá la misma dirección IP. Cuando cambie, la IP codificada también tendrá que modificarse. Esto tendrá un impacto en el desarrollo, la entrega y la implementación del producto:

Los desarrolladores tendrán que hacer una solución rápida cada vez que esto suceda, en lugar de que un equipo de 

operaciones cambie un archivo de configuración.

Es engañoso utilizar la misma dirección en todos los entornos (dev, sys, qa, prod).

Por último, pero no menos importante, tiene un efecto sobre la seguridad de las aplicaciones. Los atacantes podrían descompilar el código y, por lo tanto, descubrir una dirección potencialmente confidencial. Pueden realizar un ataque de denegación de servicio en el servicio, intentar obtener acceso al sistema o intentar falsificar la dirección IP para evitar los controles de seguridad. Estos ataques siempre pueden ser posibles, pero en el caso de una dirección IP codificada, la resolución del problema llevará más tiempo, lo que aumentará el impacto del ataque.

### Credenciales en Código

Las credenciales de las diferentes aplicaciones externas se encuentran actualmente almacenadas directamente en el código de la aplicación, esto corresponde a una vulnerabilidad de seguridad debido a que si el código es accedido por terceros con intenciones maliciosas, podrían obtener los códigos de autenticación a bases de datos y otros, y podrían robar datos.

### Pruebas de penetración:

Se realiza una prueba de penetración mediante la herramienta nmap. Esta prueba fue efectiva, en cuanto se pudo obtener información en relación a la siguiente vulnerabilidad:

<img src="assets\img\segunda_progra\velnerabilidades.png" width=500 alt="c4_primernivel" border="0">

## Funcionalidad

### Código no cubierto por pruebas:

Dentro del código existen funcionalidades para el código cubierto por las pruebas unitarias por lo tanto se deberían de cubrir estas funcionalidades para que el proyecto contenga una mayor seguridad de funcionamiento

### Arreglar Dropdowns:

En las funcionalidades visuales existen un Dropdown, los cuales tiene un pequeño bug de visualización los cuales a la primera visualización de la página .

<img src="assets\img\segunda_progra\registro_de_usuario.png" width=500 alt="c4_primernivel" border="0">

## Mantenibilidad:

### Backend no sigue los parámetros SOLID:
Para el mejoramiento de la mantenibilidad del proyecto se recomiendo seguir en cuenta los parámetros SOLID puesto que en este momento el código no sigue esto, se analiza una posible migración para cumplir con los parámetros solid:

 -   S – Single Responsibility Principle (SRP)  
 -   O – Open/Closed Principle (OCP)
 -   L – Liskov Substitution Principle (LSP)
 -   I – Interface Segregation Principle (ISP)
 -   D – Dependency Inversion Principle (DIP)

### Código duplicado:

Con ayuda de sonarclud logramos observar que nuestro código tiene diferentes tipos de olores entre ellos podemos observar la implementación de código duplicado en distintos archivos de nuestro programa:

<img src="assets\img\segunda_progra\alfaro6.png" width=500 alt="c4_primernivel" border="0">

### Smells :

Con ayuda de sonarclud logramos observar que nuestro código tiene diferentes tipos de olores entre ellos podemos observar la implementación de smells en distintos archivos de nuestro programa:

<img src="assets\img\segunda_progra\sonar.png" width=500 alt="c4_primernivel" border="0">

## Límites de la aplicación:

### Pruebas de usuarios y consultas concurrentes:

Se realizaron pruebas de consultas concurrentes tanto en Frontend como en el API y en la Base de Datos. Para estas pruebas se utilizó la herramienta de pruebas de estrés K6 y la herramienta locust para probar la base de datos. Las pruebas de estrés consistieron en aumentar progresivamente la cantidad de usuarios virtuales que realizan consultas paralelas hasta que las consultas comenzaban a fallar. Los resultados de estas pruebas se observan a continuación.

| Prueba | Máxima Cantidad de Usuarios Concurrentes (aproximada) |
|--|--|
|FRONTEND - Cargar página de inicio  | 1800 |
| API - Inicio de Sesión  | 1850  |
| API - Obtener Canciones Públicas  | 2300  |
|Base de Datos - Buscar Usuario  | 1600 |

Adicionalmente, se adjunta la evidencia de la realización de algunas de dichas pruebas. Para esto se adjuntan los resultados finales de las pruebas de estrés realizadas con k6, y el script de la prueba realizada con locust.

### Pruebas de estrés: 

 - FRONTEND - Cargar página de inicio

<img src="assets\img\segunda_progra\alfaro1.png" width=500 alt="c4_primernivel" border="0">


 - API - Inicio de Sesión
 
<img src="assets\img\segunda_progra\alfaro2.png" width=500 alt="c4_primernivel" border="0">

 - API - Inicio de Sesión
 
<img src="assets\img\segunda_progra\alfaro3.png" width=500 alt="c4_primernivel" border="0">

 - Base de Datos - Buscar Usuario (script)

<img src="assets\img\segunda_progra\alfaro4.png" width=500 alt="c4_primernivel" border="0">

## Saturación de bases de datos:

La prueba de saturación de la base de datos consistió en la inserción de una gran cantidad de datos hasta que el tiempo de respuesta de la base superara 1 segundo al buscar un dato particular en la colección saturada. Para realizar estas pruebas se diseñó un script de Python personalizado. Los resultados de las pruebas se observan en la tabla a continuación.

| Colección | Datos Máximos | Tiempo de respuesta |
|--|--|--|
| Usuarios  | 1.8 millones| 1.04 segundos  |
| Canciones  | 1 millón  |1.12 segundos |

### Evidencia

 1. Colección de usuarios:

<img src="assets\img\segunda_progra\alfaro5.png" width=500 alt="c4_primernivel" border="0">

## Plan de Mejora:

### Migración a una Arquitectura de Microservicios

Con el tiempo muchísimas herramientas de software llegan a su fin con el paso del tiempo es lo que ha pasado con la arquitectura monolítica , pero aunque en algunos casos específicos este tipo de proyecto son óptimos según las especificaciones del mismo.

Nuestro proyecto ha crecido de manera exponencial por lo tanto el modelo monolítico se ha vuelto difícil de mantener por eso el grupo de trabajo ha decidido migrar a una arquitectura de microservicios para que nuestra aplicación siga creciendo y nosotros como desarrolladores aprovechemos las herramientas para esto como grupo de trabajo hemos investigación de los pros y los contras de una migración a esta arquitectura de trabajo .

### Pros de la migración a una Arquitectura de Microservicios

-   Equipo de trabajo mínimo
    
-   Escalabilidad
    
-   Funcionalidad modular, módulos independientes.
    
-   Libertad del desarrollador de desarrollar y desplegar servicios de forma independiente
    
-   Uso de contenedores permitiendo el despliegue y el desarrollo de la aplicación rápidamente


### Contras de la migración a una Arquitectura de Microservicios:

-   Alto consumo de memoria
    
-   Necesidad de tiempo para poder fragmentar distintos microservicios
    
-   Complejidad de gestión de un gran número de servicios
    
-   Necesidad de desarrolladores para la solución de problemas como latencia en la red o balanceo de cargas
    
-   Pruebas o testeos complicados al despliegue distribuido


## Nuevos Features:

Con la necesidad de mejorar el rendimiento de la aplicación de karaoke como grupo se decide separa dicha aplicación monolítica a una aplicación de microservicios de la cual en el backend existen 6 microservicios que se encargaran del manejo de los datos en el frontend tendremos 7 micro frontends y 3 bases de datos que almacenan la información de de la aplicación, también utilizaremos 4 Apis externas que nos apoyaran con las funcionalidades de la aplicación:

### Frontend

Se crearán 7 nuevas micro aplicación web las cuales cumplirán las funciones de: Nabar de Búsqueda el cual tendrá la obligación de redirigir la aplicación web a los diferentes micro aplicaciones en la web y aparte de esto debe de implementar las búsqueda por filtros, otra de las micro aplicaciones será la vista premium la cual deberá de cumplir con las funcionalidades de CRUD de canciones privadas, una de las nuevas de la funcionalidades es el dashboard el cual se encarga de mostrar las diferentes estadísticas dentro de la aplicación, la microapliacion de login se encarga de la parte visual de acceso y registro de usuarios , la vista principal tiene la obligación de mostrar todas las canciones publicas a usuarios premium o estándar, el stream se encarga de dos funciones una de las nuevas especificación como lo es la puntuación aparte de esto deberá reproducir la música y la letra del karaoke por último la última nueva funcionalidad es la búsqueda de información de wikipedia para esto tenemos una micro aplicación que se encarga de recibir los datos para mostrar la información más relevante del artista mostrada en wikipedia



### Backend

El backend de la aplicación se desarrolló mediante el uso de microservicios. Cada uno de los microservicios diseñados tiene completo control sobre su repositorio de datos. En particular, se tienen los microservicios de autenticación (de usuarios), estadísticas y canciones. Estos tres microservicios se encargan de realizar operaciones sobre su fuente de datos. Por otro lado, se encuentran los microservicios de reconocimiento de voz, de almacenamiento y de wiki. Estos tres microservicios se conectan con apis externos para convertir audio a texto, manejar el almacenamiento de canciones, y obtener datos de los artistas, respectivamente. También, se hace uso de keycloak para autenticación en todos los microservicios. Adicionalmente, la comunicación entre microservicios se da mediante el patrón Event Driven, mediante el Messaging Broker de RabbitMQ.. Los diferentes microservicios se comunicacion por medio de esta herramienta con otros servicios de la siguiente manera.

  

#### Microservicio de canciones:
    
- Le solicita al microservicio de usuarios la clave del almacenamiento del usuario, para generar la URL de cada canción.
    
-   Recibe del microservicio de usuarios un id de la canción a actualizar y su correspondiente token para actualizar el URL.
    

#### Microservicio de autenticación:
    

-   Le solicita al microservicio de almacenamiento que genere la carpeta de almacenamiento del usuario al registrarse.
    
-   Recibe del microservicio de almacenamiento el nombre de usuario y su token de almacenamiento, que debe actualizar en la base de datos.
    

#### Microservicio de estadísticas:
    

-   Recibe del microservicio de reconocimiento de voz los puntajes de las palabras cantadas.
    

####  Microservicio de reconocimiento de voz:
    

-   Envía al microservicio de reconocimiento de voz los puntajes de las palabras cantadas.
    

####  Microservicio de almacenamiento:
    

-   Recibe del microservicio de usuarios, el nombre de la carpeta a crear.
    
-   Envía al microservicio de usuarios el token de la carpeta creada.
    

####  Microservicio de wiki:
    

-   No interactúa con otros microservicios.

Para un mejor entendimiento se adjunta los diagramas de modelo c4 del proyecto con la arquitectura de microservicios

### Diagrama de primer nivel.

<img src="assets\img\segunda_progra\Segunda progra-primer nivel.drawio (1).png" width=300 alt="c4_primernivel" border="0">

### Diagrama de segundo nivel.

<img src="assets\img\segunda_progra\Segunda progra-segundo nivel.drawio (1).png" width=800 alt="c4_primernivel" border="0">

### Diagrama de tercer nivel.

<img src="assets\img\segunda_progra\tercer nivel.png" width=1500 alt="c4_primernivel" border="0">

## Plan de Migración:

Iteración 1: Migración a macroservicios
A partir de la aplicación monolítica, se lograron identificar 2 grupos de componentes cohesivos en cuanto a funcionalidad, los cuales corresponden a:

1.  Módulo de usuarios: Compuesto por componentes de registro en la base de datos, registro en KeyCloak e inicio de sesión.
    
2.  Módulo de canciones: Compuesto por los componentes de gestión de canciones en la base de datos y gestión de canciones en el almacenamiento de Azure.
    
En esta iteración, se debe separar la aplicación monolítica inicial en los dos macroservicios identificados.

Iteración 2: Separación de las fuentes de datos de los macroservicios

Inicialmente, se tiene una fuente de datos para la información de los usuarios y de las canciones. En esta iteración se debe de separar la fuente de datos en dos:

1.  Fuente de datos de usuarios
    
2.  Fuente de datos de canciones
    

Es importante notar que la fuente de datos de canciones no incluye los archivos de música, los cuales se encuentran en un almacenamiento adicional.

Iteración 3: Migración a microservicios

Se deben de dividir los macroservicios en microservicios, con una función específica y que se relacione con una sola fuente de datos o almacenamiento. Para esto, los macroservicios se dividen de la siguiente manera:

-   Macroservicio de usuarios:
    
-   Microservicio de usuarios (se determinó que esta funcionalidad tiene un dominio lo suficientemente limitado para encontrarse en un solo microservicio)
    
-   Macroservicio de canciones:
    
-   Microservicio de gestión de canciones en la base de datos.
    
-   Microservicio de gestión de canciones en almacenamiento.
    


Iteración 4: Uso de contenedores y orquestación de contenedores:

Los diferentes microservicios correrán dentro de contenedores, con la intención de facilitar el deployment y el desarrollo. Además, los diferentes contenedores se deben orquestar de manera adecuada para garantizar una correcta intercomunicación, y por ende una correcta funcionalidad. Se propone inicialmente el uso de Docker y Kubernetes.

Iteración 5: Integración continua:

Para garantizar un desarrollo más ágil, se deben de desarrollar flujos de CI/CD. Estos flujos se deben de encargar de garantizar la disponibilidad de cada uno de los diferentes microservicios, o al menos de buscar que esta sea lo más alta posible.

Iteración 6: Corrección de debilidades identificadas:

-   Migración del backend a Typescript:
    
El proyecto inicial se encuentra codificado en javascript. Este lenguaje es útil para el desarrollo de aplicaciones sencillas; sin embargo, para desarrollar un backend dicho lenguaje presenta limitaciones, ya que dificulta la mantenibilidad, debido a la ausencia de herramientas comunes de los lenguajes orientados a objetos, y dado que es un lenguaje no tipado, lo que facilita los errores por parte de los programadores. En este sentido, se propone migrar el backend a typescript. Para esto, se puede mantener el código inicial, simplemente se deben hacer las modificaciones en cuanto a tipos y demás agregados de typescript.

Se selecciona este lenguaje dado que es altamente tipado y pude usar las mismas librerías que las que se encuentran disponibles para javascript. Adicionalmente, este lenguaje provee la ventaja de que se encuentra equipado con herramientas de orientación a objetos que permiten seguir arquitecturas más complejas.

-   Eliminación de código duplicado: 

En la versión original de la aplicación, se encontró código duplicado. Este es un problema de mantenibilidad, ya que si se desea cambiar algún elemento del código duplicado, se debe cambiar más de una vez. En este sentido, se propone corregir todas las duplicaciones de código mediante el uso de clases y funciones que eviten dicha duplicación.

-   Uso de SOLID:
    
Se propone el uso de SOLID para que la aplicación desarrollada sea más fácil de mantener y de extender. Esta transformación a SOLID es posible al cambiar el lenguaje de programación de javascript a typescript, ya que el segundo incluye interfaces. Además, el uso de SOLID se propone debido a que la aplicación original era sumamente monolítica, y dichos principios de programación son una guía para modificar la estructura interna de la aplicación, de manera que cumpla con atributos de calidad estándares.

-   Variables de entorno en lugar de strings de autenticación en código:
    
Actualmente, se presenta el problema de que los strings de autenticación a servicios y bases de datos externos se encuentran introducidos directamente en el código. Esto es un problema a solventar, ya que los strings de autenticación se ponen en riesgo de que un tercero los acceda. Por lo cual, este problema se solventará mediante el uso de variables de entorno.



##  Uso de arquitectura cebolla:
    

Como se mencionó anteriormente, la aplicación inicial es sumamente monolítica. Por lo cual, uno de los cambios propuestos es el uso de una arquitectura cebolla a lo interno de cada uno de los microservicios, esto dado que es una arquitectura natural al aplicar los principios SOLID. Adicionalmente, es importante aplicar una arquitectura de diseño para que la aplicación sea mantenible y extensible.


## Monitoreo de la salud del sistema y de los componentes

Con el fin de que un sistema se mantenga funcionando por largos periodos de tiempo prolongados es indispensable que este mismo se mantenga bajo un monitoreo constante y  esto aplica también para kubernetes. Con el fin de poder ver que el orquestador realice su trabajo de la mejor manera es totalmente necesario ver el estado de cada “pod” de manera individual y ver que los mismos estén “saludables”. Para la tarea anteriormente descrita existen una serie de herramientas, a continuación se procede a explicar las herramientas que el equipo usó para este proyecto en específico.
Para realizar el monitoreo del sistema se va a utilizar las herramientas brindadas por el repositorio de  kube-prometheus el cual se instalará ayuda de Helm el cual es un package manager para Kubernetes, el cual integra varias funcionalidades para llevar un seguimiento a diferentes parámetros tanto del cluster de kubernetes como de los componentes que lo conforman como los pods en donde se encuentran los microservicios realizados y que se acopla fácilmente a este cluster. La primera de las herramientas es prometheus el cual permite tanto obtener métricas como crear métricas específicas para cada servicio, además de brindar alertas sobre el buen funcionamiento del sistema, luego dichas métricas son expuestas para poder ser consumida por la segunda principal herramienta que integra este repositorio el cual permite consumir dichos datos, además de las ya brindadas por Azure para mostrarlas y organizarlas por gráficos y estadísticas agradables para el usuario, además de permitir clasificarlas y crear nuevos gráficos a conveniencia lo que permitirá monitorear fácilmente el estado y el uso del sistema y sus componentes. Finalmente se utilizará las propias herramientas brindadas por azure para conocer el estado de cada pod.  

## Métodos para lograr alta disponibilidad

Entre los métodos predilectos para lograr alta disponibilidad en un sistema siempre se considera buena idea realizar una división apropiada del trabajo dependiendo de los recursos disponibles.
Cuando se tiene un sistema que esté realizando una serie de procesos o atendiendo request en tiempo real es recomendable mantener un monitoreo sobre la carga con el fin de que esta no sobrepase el límite que se le quiera establecer.
Para ello se ha decido utilizar Kubernetes en este caso en específico los Cluster de Kubernetes de Azure el cual va a orquestar las imágenes de docker que se crearán para cada microservicio, ya que contiene varias herramientas o funciones que permite lograr una alta disponibilidad.
Para el caso de Docker, o en mayor medida orquestadores como kubernetes, los cuales serán las herramientas principales de este proyecto,  permite hacer uso de la función de “pod auto scaling”. La función anteriormente mencionada permite, a grandes rasgos, informar al sistema que, después de cierto gasto de recursos inmediatamente realice una copia de sí mismo para evitar que el “pod” actual se sature.
Para el caso de kubernetes las copias de un mismo pod se consideran escalabilidad horizontal por lo que se denomina al proceso “HPA” (Horizontal Pod Autoscaling) y está disponible de manera integrada con el orquestador.
Otra función que es recomendable utilizar para mantener la alta disponibilidad es el “load balancer” el cual es una herramienta que cumple la función de monitorear el ciclo de trabajo, determinar las cargas y distribuirlas de manera equitativa en el sistema con el fin de darle el funcionamiento más óptimo.


## Réplicas por microservicio necesarias para que el sistema responda en un tiempo específico

Con el fin de siempre tener a un sistema en buen estado es imperativo realizar pruebas del mismo, especialmente si este maneja procesos o “request” en tiempo real.
De las pruebas más importantes que se pueden realizar a un sistema se pueden resaltar las siguientes:
Stress Test: Pruebas donde se presiona a un sistema a su punto máximo por un periodo de tiempo prolongado.
Load Test: Pruebas donde se ve el comportamiento de un sistema a picos súbitos y cortos de request.
	Para el caso de este proyecto se realizaron una serie de “load test” con el fin de corroborar la función de HPA mencionada en el punto anterior y ver si la misma funcionaba de manera correcta para mantener al sistema en un estado óptimo.
	A continuación se muestran las pruebas realizadas:


<img src="assets\img\segunda_progra\Leon1.png" width=1500 alt="c4_primernivel" border="0">

<img src="assets\img\segunda_progra\leon2.png" width=300 alt="c4_primernivel" border="0">

<img src="assets\img\segunda_progra\leon3.png" width=1000 alt="c4_primernivel" border="0">

En las imágenes anteriores se puede ver cómo se realiza, mediante el uso de un script, una prueba de 200 usuarios virtuales (VU) realizando peticiones cada segundo durante 20 segundos, es decir, 200 request por segundo. Se puede ver que en respuesta el sistema se escaló horizontalmente y realizó 4 copias de sí mismo con el fin de mantener el funcionamiento óptimo. 
Con relación a lo anterior, debido a la naturaleza de kubernetes, y la implementación del auto escalado, no es necesario definir las réplicas manualmente ya que Kubernetes, de acuerdo a su naturaleza como orquestador, por sí solo va a realizar las réplicas necesarias para mantener el buen funcionamiento del sistema de acuerdo a los parámetros brindados el cual se colocara en un 90% de uso por réplica, además este realizara el balanceo de cargas entre réplicas para utilizar la menor cantidad de réplicas posible, por lo que se decidió utilizar 2 copias iniciales para aprovechar dicho balanceo de cargas, el cual irá escalando conforme se necesite.

Repositorio de referencias utilizado para la documentación de herramientas: 

> [Link](https://github.com/prometheus-community/helm-charts/tree/main/charts/kube-prometheus-stack)

