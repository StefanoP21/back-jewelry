# Back-Jewelry

### Conventionals Commits

> Mas información: https://www.conventionalcommits.org/en/v1.0.0/

La especificación de Commits Convencionales es una especificacion establecida sobre los mensajes de los commits. Proporcionando un conjunto sencillo de reglas para crear un historial explícito y de facil lectura. Esta especificacion encaja con SemVer(semantic version), al describir los "features" , "fixes" y "breaking changes" realizados en los commits.

> Los mensajes de los commits deberan de tener la siguiente estructura:

    				<tipo>[ambito]: <descripción>

### Los commits contienes los siguientes elementos estructurales:

1. Tipo: Define la naturaleza del cambio. Algunos ejemplos comunes son:

   - fix: corregir errores
   - feat: nuevas funcionalidades
   - docs: cambios en documentacion (docs/)
   - test: probar nuevas funcionalidades
   - refactor: refactorizar codigo, sin alterar funcionalidad, no se debe de involucrar la solucion de errores o bugs
   - style: cambios que no afectan al codigo ( formateo , white-space , etc)
   - perf: cambios de codigo que ayudan a tener un mejor performance
   - chore: todo cambio en files que no tengan que ver con el codigo fuente del framework
   - revert: revertir un commit

2. Ámbito:
   Indica la sección o componente de la infraestructura afectada. Puede ser el nombre del módulo, recurso, o un área específica del proyecto.
3. Descripción:
   Proporciona una breve descripción del cambio. Sea claro y conciso.

### Ejemplo de commits

Scope hace referencia a la carpeta de primer nivel en donde se hace el cambio .

    	    <tipo>[ambito]: <descripción>

- Nueva Característica:

        feat(vpc): agregar nuevo módulo para la creación de una VPC.

- Corrección de Errores:

        fix(category): se solucionó la creación de la entidad.

- Documentación:

        docs(readme): actualizar documentación para incluir ejemplos de uso.

- Estilo:

        style(format): aplicar reglas de formato a todos los archivos.

- Pruebas:

        test(network): agregar pruebas de integración para módulos de red.

### NOTA

1. Si el commit no tiene concordancia , tanto en ambito como tipo , el PR no sera aceptado ,de esta manera evitaremos merge en proyectos que no correspondan.
2. Cuando el tipo y el ambito poseen el mismo nombre , no es necesario colocar el ambito (ej:docs)
3.
