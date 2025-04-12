### OPTIMIZACIÓN

## REGLAS PARA LAS LLAMADAS (GETs)

- **Solo hacer select de los campos necesarios.**
- **No modificar orden de los parámetros de búsqueda.**


## Obtener datos de usuario (userProfile)

```sql
SELECT userName, name, bio, icon, role, email, location, skills, linkdin, twitter, instagram, github
FROM user_profile
WHERE id = [user_id];
```

## Obtener todos los roles

```sql
SELECT id, name, img
FROM roles;
```

## Obtener todos los grupos (cacheada + staletime)

Obtener todos los grupos (groups) + group_roles por ID del grupo. Necesario para mostrar toda la información de las cards. Realizar filtrado + ordenación de roles, cupos disponibles, etc desde el front.

```sql
SELECT
  g.id,
  g.owner,
  g.icon,
  g.name,
  g.target,
  g.schedule,
  g.language,
  g.state,
  g.created_at AS "createdAt",
  COALESCE(roles_json.roles, '[]'::json) AS "groupRoles"
FROM
  groups g
JOIN LATERAL (
  SELECT json_agg(
    json_build_object(
      'userName', gr.user_name,
      'role', gr.role
    )
    ORDER BY gr.role ASC
  ) AS roles
  FROM group_roles gr
  WHERE gr.group_id = g.id
  LIMIT 8
) roles_json ON true
```

Obtenemos el ID del rol en la lista, no su nombre, por lo que realizamos la equivalencia en el front con el enum en lugar de obtener el nombre realizando un join de la tabla roles

Obviamos el LEFT JOIN ya que no necesitamos y no deberían existir grupos sin roles, así eliminamos datos innecesarios de la consulta

Utilizamos LATERAL para una mejor agrupación de los datos

## Obtener los datos del grupo

Obtener grupo por ID + group_roles (en group_roles se ha utilizado como relación el nombre del usuario para no hacer join por id de la tabla users).
Misma operación de ordenación desde el front.

-Obtener información del grupo y cupos

```sql
SELECT
  g.id,
  g.owner,
  g.icon,
  g.name,
  g.description,
  g.requirements,
  g.target,
  g.schedule,
  g.language,
  g.state,
  g.created_at AS "createdAt",
  COALESCE(roles_json.roles, '[]'::json) AS "groupRoles"
FROM
  groups g
JOIN LATERAL (
  SELECT json_agg(
    json_build_object(
      'userName', gr.user_name,
      'role', gr.role
    )
    ORDER BY gr.role ASC
  ) AS roles
  FROM group_roles gr
  WHERE gr.group_id = g.id
  LIMIT 8
) roles_json ON true
``

-Con el campo de userName de los cupos (group_roles), realizar una consulta a user_profile para obtener los datos necesarios para la lista de miembros

```sql
SELECT userName, name, icon, role, bio

```

-Solicitudes

userName
rol
message
createdAt

## Obtener comentarios del grupo

Obtener comentarios del grupo (group_comments) por ID de grupo.

## Obtener applies del grupo:

```sql
SELECT userName, role, message, createdAt
FROM applies
WHERE groupId = [groupID del grupo];
```

Si por diseño, los cupos/usuarios/roles, comentarios y applies quedan ocultos en la vista inicial, separar las llamadas (en total 4), si no, agrupar de la mejor forma.

## Obtener applies de un usuario

```sql
SELECT ap.role, ap.createdAt, ap.state, ap.group.id, gp.name
FROM applies ap
JOIN groups gp ON ap.groupId = gp.id
WHERE ap.userId = [id];
```

Los valores de enums como horarios, estados, objetivos, que se necesitan para filtrar, creación de grupos etc., se obtienen de los tipos exportados en schema.ts:

```typescript
export type LanguageType;
export type TargetType;
export type ScheduleType;
export type ApplyStateType;
export type GroupStateType;
```

## MUTACIONES (PUTs, POSTs)

Se ha reducido el número de índices para mejorar la velocidad de escritura. Se usará useOptimistic desde el front para simular una escritura instantánea, por lo que no tenemos la necesidad de agregar índices compuestos ni vistas materializadas.
