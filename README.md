# Planificación de materias ITBA
## Integración de Sistemas de Información 

## Formulario

### Propuesta
Un problema relevante que surge a partir de la matriculación es que demasiados alumnos quedan afuera de las materias por el cupo asignado. 
Sucede que cada DD define este cupo, basado normalmente en estimaciones derivadas de cursadas previas de la materia. 
Sin embargo, entre el aumento en la cantidad de alumnos en el último tiempo, y el hecho de que hay múltiples materias de comisión única, 
este cálculo suele quedar escueto, dejando a muchos alumnos a los que les corresponde cursar esa materia, fuera de la misma. 
Como posible solución, se nos ocurre que al finalizar cada cuatrimestre, luego de los exámenes finales, 
los alumnos se vean obligados a completar un formulario donde especifiquen qué materias querían cursar el siguiente cuatrimestre.

### Requisitos
* Node.js

### Guía para correr el proyecto
Pararse sobre el directorio `planificacion-materias-backend` y correr:
```
npm install
```

Para levantar el servidor, ejecutar:
```
npm start
```

En otra terminal, pararse sobre el directorio `planificacion-materias-frontend` y correr:
```
npm install
```

Para levantar el servidor, ejecutar:
```
npm start
```

El backend utilizará el puerto 8080, mientras que el frontend, el 3000.

## Aplicación Excepciones

### Guía para correr el proyecto
Pararse sobre el directorio `exceptions-app` e installar el paquete Streamlit:
```
pip install streamlit
```

Luego, utilizar el proximo comando para correr la app:
```
streamlit run app.py
```

