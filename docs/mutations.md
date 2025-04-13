---

Crear Usuario

1.⁠ ⁠Validación:

Comprobar que el userName no exista.

2.⁠ ⁠Inserción:

Insertar en la tabla users.

3.⁠ ⁠Perfil:

Con el id obtenido, crear el correspondiente user_profile.

---

Login

1.⁠ ⁠Consulta del Usuario:

Buscar al usuario existente por userName.

2.⁠ ⁠Validación de Contraseña:

Si existe, comparar las contraseñas hasheadas.

3.⁠ ⁠Obtener Datos y Setear Token:

Obtener los datos completos del usuario.

Setear el token en las cookies.

---

Crear Grupo

1.⁠ ⁠Inserción en Groups:

Insertar los datos en la tabla groups.

2.⁠ ⁠Creación de Roles:

Con el id obtenido, crear tantos group_roles como número de cupos tenga el grupo.

Asignar a cada group_role el rol correspondiente y el group_id.

3.⁠ ⁠Asignación del Propietario:

Actualizar el user_name del primer group_role libre (la primera fila con el group_id del grupo creado y el rol seleccionado por el usuario) para asignarle al propietario.

4.⁠ ⁠Registro de Usuario al Grupo:

Insertar una nueva fila en users_to_group utilizando el id del grupo obtenido y el user_id del usuario (obtenido desde las cookies).

---

Editar Grupo

1.⁠ ⁠Actualización de Datos del Grupo:

Actualizar la tabla groups con los nuevos datos, utilizando el id del grupo.

2.⁠ ⁠Gestión de Roles:

Eliminación de Roles:

Solo se podrán quitar roles actuales si no están ocupados (es decir, cuando el userName es null).

Al eliminar roles, se deben borrar el número proporcional de filas en group_roles correspondientes, utilizando el group_id y el rol seleccionado.

Adición de Roles:

Insertar nuevas filas en group_roles para los roles agregados.

---

Aceptar Solicitud

1.⁠ ⁠Asignación de Cupo:

Actualizar el user_name del primer group_role libre (donde userName es null) que tenga el rol deseado, asignándole el group_id del grupo.

2.⁠ ⁠Actualización del Apply:

Cambiar el status del apply a ACCEPTED utilizando el id del apply.

3.⁠ ⁠Registro en el Grupo:

Insertar una nueva fila en users_to_group, con el user_id del apply y el group_id del grupo.

4.⁠ ⁠Control de Applies Pendientes:

Si existen más applies con status pending para el mismo rol, verificar si quedan cupos libres en group_roles.

Si no quedan cupos, actualizar el status de todos los applies del grupo para ese mismo rol a REJECTED (ya que no deben existir applies activos para cupos ocupados o inexistentes).

---

Enviar Solicitud

1.⁠ ⁠Verificación de Solicitud Activa:

Comprobar que no exista una solicitud activa del usuario para el grupo (sólo se permite 1 solicitud activa por grupo).

2.⁠ ⁠Inserción:

Si no existe una solicitud activa, insertar una nueva fila en applies con:

user_id (del usuario)

group_id (del grupo)

role (el rol seleccionado)

---

Salir / Expulsar del Grupo

1.⁠ ⁠Actualización de Roles:

En la fila de group_roles correspondiente (donde user_name coincide con el usuario y el group_id coincide con el del grupo), setear el userName a null.

2.⁠ ⁠Eliminación de Registro:

Eliminar la fila de users_to_groups donde user_id es el id del usuario y group_id es el del grupo.

---

Cancelar Apply Activa (como Usuario Solicitante)

1.⁠ ⁠Actualización del Apply:

Modificar el status de la solicitud activa a CLOSED, donde:

user_name debe ser igual al userName del usuario.

group_id debe ser igual al id del grupo visualizado.

---

Enviar Comentario

1.⁠ ⁠Inserción:

Insertar una nueva fila en group_comments con:

user_name: el userName del usuario.

group_id: el id del grupo.

mensaje: el comentario enviado.

---

Enviar Feedback

1.⁠ ⁠Inserción:

Insertar una nueva fila en feedback, con:

email

message (mensaje)

---
