<?php

include("conexion.php");

$correo = $_POST['email'];
$contrasena = $_POST['password'];

$sql = "SELECT * FROM usuarios 
WHERE correo = '$correo' 
AND contrasena = '$contrasena'";

$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {

    echo "Inicio de sesión correcto";

} else {

    echo "Correo o contraseña incorrectos";

}

$conn->close();

?>