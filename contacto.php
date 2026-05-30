<?php

include("conexion.php");

$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$mensaje = $_POST['mensaje'];

$sql = "INSERT INTO contactos
(nombre, correo, mensaje)
VALUES
('$nombre', '$correo', '$mensaje')";

if ($conn->query($sql) === TRUE) {

    echo "
    <script>
        alert('Mensaje enviado correctamente');
        window.location.href='index.html';
    </script>
    ";

} else {

    echo "
    <script>
        alert('Error al enviar mensaje');
        window.location.href='index.html';
    </script>
    ";

}

$conn->close();

?>