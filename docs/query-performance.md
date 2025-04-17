### OPTIMIZACIÓN

## REGLAS PARA LAS LLAMADAS (GETs)

- **Solo hacer select de los campos necesarios.**
- **No modificar orden de los parámetros de búsqueda.**

## Obtener mis datos de usuario

```sql
SELECT user_id AS "userId", name, bio, icon, role, email, location, skills, linkdin, twitter, instagram, github, created_at AS "createdAt"
FROM user_profile
WHERE user_id = [ID del usuario];
```

## Obtener los datos de otro usuario (generalmente por nombre)

```sql
SELECT user_id AS "userId", user_name AS "userName", name, bio, icon, role, email, location, skills, linkdin, twitter, instagram, github, created_at AS "createdAt"
FROM user_profile
WHERE user_name = [Nombre de usuario];
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
  g.owner_name AS "ownerName",
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

## Obtener todos los grupos del usuario

```sql
SELECT
  g.id,
  g.owner_name as "ownerName",
  g.name,
  g.target,
  g.schedule,
  g.language,
  g.status,
  g.created_at as "createdAt",
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
WHERE EXISTS (
  SELECT 1
  FROM group_roles gr
  WHERE gr.group_id = g.id
  AND gr.user_name = 'Arti'
);
```


## Obtener los datos del grupo

No podemos reutilizar los datos de la llamada de getGroups, ya que estará cacheada, y puede que los datos de detalles del grupo no estén actualizados (miembros, estado, etc)

Obtener grupo por ID + group_roles (en group_roles se ha utilizado como relación el nombre del usuario para no hacer join por id de la tabla users).
Misma operación de ordenación desde el front.

-Obtener información del grupo y cupos

```sql
SELECT
  g.id,
  g.owner_name AS "ownerName",
  g.name,
  g.description,
  g.requirements,
  g.target,
  g.schedule,
  g.language,
  g.state,
  g.created_at AS "createdAt",
  COALESCE(
    (
      SELECT json_agg(
        json_build_object(
          'user_name', gr.user_name,
          'role', gr.role
        )
        ORDER BY gr.role ASC
      )
      FROM group_roles gr
      WHERE gr.group_id = g.id
    ),
    '[]'::json
  ) AS "groupRoles"
FROM
  groups g
WHERE
  g.id = [ID del grupo]
```

-Con la lista de user names de la primera llamada y el id del grupo, obtenemos la información de perfil de los usuarios y el rol que desempeña en el grupo

**(Podríamos traspasar esta lógica al front, ya que tenemos la lista de user_names y rol que desempeñan en el grupo. por lo que se podría hacer solo el select de información del usuario y asignar el rol al nuevo objeto de "miembro del grupo)**

```sql
SELECT
    u.user_id AS "userId",
    u.user_name AS "userName",
    u.name,
    u.icon,
    u.bio,
    g.role
FROM
    user_profile u
JOIN
    group_roles g ON u.user_name = g.user_name
WHERE
    g.group_id = [ID del grupo]
AND u.user_name IN ('johndoe',NULL, 'janedoe');
```

## Obtener comentarios del grupo

Obtener comentarios del grupo (group_comments) por ID de grupo.

```sql
SELECT
    user_name AS "userName",
    message,
    created_at AS "createdAt"
FROM
    group_comments
WHERE
    group_id = [ID del grupo]
ORDER BY created_at ASC
```

## Obtener applies del grupo:

```sql
SELECT
    a.user_name AS "userName",
    a.role,
    a.message,
    a.status,
    a.created_at AS "createdAt",
    u.icon
FROM
    applies a
JOIN
    user_profile u ON u.user_name = a.user_name
WHERE
    group_id = 1
```

## Obtener mis applies

```sql
SELECT
    a.role,
    a.message,
    a.status,
    a.created_at AS "createdAt",
    a.group_id AS "groupId",
    g.name
FROM
    applies a
JOIN
    groups g ON a.group_id = g.id
WHERE
    a.user_id = [ID del usuario]
ORDER BY a.created_at DESC
```

### Los valores de enums como horarios, estados, objetivos, que se necesitan para filtrar, creación de grupos etc., se obtienen de los tipos exportados en schema.ts:

```typescript
export type LanguageType;
export type TargetType;
export type ScheduleType;
export type ApplyStateType;
export type GroupStateType;
```

## MUTACIONES (PUTs, POSTs)

Se ha reducido el número de índices para mejorar la velocidad de escritura. Se usará useOptimistic desde el front para simular una escritura instantánea, por lo que no tenemos la necesidad de agregar índices compuestos ni vistas materializadas.
