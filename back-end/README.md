# Tarea
Construir una pequeña API en TypeScript, usando SQLite que permita agregar:

1. Frutas y sus distintos tipos de Variedades.
2. Cosechas.
3. Agricultores y sus distintos Campos.
4. Clientes.

También debe incluir una ruta que al enviarle un CSV lo lea y cargue su data dentro de la DDBB.

- El mail debe ser único dentro de los agricultores.
- El mail debe ser único dentro de los clientes.
- La combinación Nombre Ubicación de los campos debe ser única.
- El nombre de la fruta debe ser única.
- La combinación fruta variedad debe ser única.

Se valorara:

1. Orden de código.
2. Orden de commits.
3. Validaciones de schema.
4. Separación de concerns.
5. Manejo de errores.

**Nice to Do:**
- Usar una arquitectura de DDD.

---

# Dominio
Leyendo [cosechas.csv](./cosechas.csv) se obtienen las siguientes columnas:

- Mail Agricultor
- Nombre Agricultor
- Apellido Agricultor
- Mail Cliente
- Nombre Cliente
- Apellido Cliente
- Nombre Campo
- Ubicación de Campo
- Fruta Cosechada
- Variedad Cosechada

Esto, junto con el enunciado, puedo identificar los siguientes modelos y sus propiedades:

```typescript
type Field = { name: string, location: string, farmer: Farmer }

type Farmer = { firstName: string, lastName: string, email: string }

type Crop = { client: Client, fruit: Fruit, variety: Variety, field: Field }

type Client = { firstName: string, lastName: string, email: string }

type Fruit = string

type Variety = string
```
