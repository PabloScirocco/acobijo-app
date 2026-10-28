# Descubre Cantabria · Explora y juega

## Alcance integrado

Nueva vista `mythology`, accesible desde el menú y las tarjetas de Descubre Cantabria. Biblioteca pública de ocho criaturas, con presentación, descripción, síntesis de leyenda, curiosidades, variantes y enlaces a las fuentes. Las siete imágenes JPEG originales se conservan sin retocar. `OJANCANO.jpeg` se ha inspeccionado y excluido: todavía muestra tres ojos. Hace falta recuperar la versión corregida a un ojo. La imagen de WhatsApp corresponde a Musgosu.

La interfaz usa los seis idiomas existentes: es, en, fr, de, nl y eu. Los contenidos editoriales están en `creatures[].content.es`; se pueden incorporar objetos equivalentes por idioma sin cambiar IDs ni enlaces. La interfaz identifica expresamente el texto español cuando no hay traducción. No se han inventado traducciones completas de las fichas.

## Enlaces públicos permanentes

Formato relativo a la raíz ya publicada en GitHub Pages:

`?nav=mythology&focus=oyambre&creature=anjana`

`focus` acepta `oyambre`, `ramales` y `ruiloba` (identificador existente de El Helguero). No se renombra `ruiloba`, porque lo usan los demás módulos. Los IDs estables de criaturas son:

- `trastolillu`
- `anjana`
- `caballucos-del-diablo`
- `culebre`
- `trenti`
- `ventolines`
- `musgosu`
- `ojancanu`

Biblioteca: `?nav=mythology`. Colección: `?nav=mythology&focus=ruiloba&mythMode=collection`. Los enlaces usan parámetros y la raíz existente: funcionan al recargar en Pages sin reescribir el 404. El estado del historial incorpora criatura y modo para que Volver/Adelante conserven la pantalla.

## Activación de figuras físicas (pendiente)

`figures` está vacío deliberadamente: no hay ubicaciones ni QR finales autorizados. Cada figura física necesita un registro propio, aunque represente una criatura que también esté en otro camping. Campos:

| Campo | Uso |
| --- | --- |
| `id` | Identificador único y estable de la figura física |
| `camping` | Uno de los tres identificadores existentes |
| `creature` | ID de una ficha pública |
| `location` | Descripción real revisada del lugar; nunca una ubicación inventada |
| `commonAreaApproved` | Solo `true` tras comprobar que se escanea desde zona común sin entrar en parcelas o bungalows |
| `active` | Solo `true` cuando figura y señal estén listas |
| `tokenHash` | SHA-256 hexadecimal de un código aleatorio individual de al menos 128 bits; no almacenar el código en claro en el repositorio |

Cuando se hayan confirmado las ubicaciones, generar los códigos fuera del repositorio y preparar los enlaces de escaneo con los mismos parámetros de camping y criatura y un parámetro `figure` que contenga el código. No imprimir códigos de prueba. No hay generador ni códigos finales en esta entrega. El visitante usa la cámara/lector QR del teléfono; no se solicita cámara dentro de la PWA.

La ruta de escaneo valida el hash, camping, criatura, estado activo y aprobación de zona común. Añade el descubrimiento una sola vez. Abrir la ficha pública, cambiar de camping, una URL inventada o un código de otro camping no desbloquean nada. El parámetro de escaneo se elimina del historial antes de los scripts de analítica. La URL inicial sí pasa por el alojamiento: no es un mecanismo para datos sensibles.

## Progreso y límites

Almacenamiento local `acobijo.mythology.v1`, sin registro, con descubrimientos por figura y contador de criaturas distintas por camping. Lectura defensiva, control de versión, rechazo de entradas desconocidas, escritura idempotente, escucha de cambios en otras pestañas y borrado de un camping con confirmación. Si falla el almacenamiento, se informa de que el progreso de esa visita es temporal. El resto de claves y funciones de la app no se modifica.

Como toda colección puramente local, no demuestra presencia física: alguien puede compartir un enlace QR o modificar su navegador. El flujo normal solo desbloquea mediante un enlace individual válido; no hay geolocalización ni garantías antifraude de servidor. Tampoco hay sincronización entre dispositivos o entre el navegador y una PWA si el sistema los separa. Borrar datos elimina el progreso.

## PWA y publicación

La app es estática, sin package.json, dependencias de ejecución nuevas ni compilación. Se publican los mismos archivos de raíz en Pages. Se incrementa la versión del service worker y se precargan textos, interfaz y siete imágenes para poder consultarlos tras la primera carga. El primer acceso sin conexión requiere haber instalado/cargado antes los recursos. La caché tolera fallos individuales como en la app original.

No se cambia el alojamiento a otro proveedor. Integrar mediante revisión de la rama y publicación habitual de `main`. Antes de activar el recorrido físico, falta la ilustración correcta del Ojáncanu, confirmar emplazamientos y accesibilidad de cada señal, y definir los códigos individuales.

## Fuentes y criterio editorial

Consultadas el 28-10-2026; enlaces junto a cada criatura en `assets/mythology/data.js`. Textos propios, resumidos; no se copian ilustraciones ni pasajes de las publicaciones. MitoCasuca Anievas sirve de referencia para Trastolillo y Caballucos. El proyecto firmado de la Junta Vecinal de Sámano aporta la versión del Trenti. Se contrastan los textos regionales conservados por Óscar Barquín, el Diccionario Tesauro y el artículo de Javier Iglesia Aparicio para los demás personajes. Estos dos últimos y el archivo web son fuentes secundarias: no se presentan como testimonios orales originales. No se atribuye una historia a un camping sin documentación. La vinculación de Santillán con el Culebre es contexto legendario, no emplazamiento de una figura de la colección.

## Validación reproducible

`node --test tests/mythology.test.cjs`

Comprueba ocho fichas, recursos y fuentes, idiomas, códigos inválidos, separación de campings, activación condicionada a zona común, duplicados, persistencia y almacenamiento corrupto/no disponible. Las figuras de prueba existen exclusivamente en el fichero de tests.

Comprobar también en navegador: biblioteca → ficha → Volver; colección → cambio de camping; recarga de un enlace directo; cambio de idioma; regreso a Inicio/Mi estancia/Eventos; vista móvil; QR desconocido; caché tras primera carga. No es posible validar un QR físico real hasta instalar y registrar las figuras.
