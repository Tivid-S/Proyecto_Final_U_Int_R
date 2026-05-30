<?php

include("conexion.php");

$nombre = $_POST['username'];
$correo = $_POST['email'];
$contrasena = $_POST['password'];
$accion = $_POST['accion'];

if ($accion == "registro") {

    $verificar = "SELECT * FROM usuarios WHERE correo = '$correo'";
    $resultado = $conn->query($verificar);

    if ($resultado->num_rows > 0) {

        echo "<script>
        alert('Ese correo ya está registrado');
        window.location.href='login.html';
        </script>";

    } else {

        $sql = "INSERT INTO usuarios
        (nombre_usuario, correo, contrasena)
        VALUES
        ('$nombre', '$correo', '$contrasena')";

        if ($conn->query($sql) === TRUE) {

            echo "<script>
            alert('Usuario registrado correctamente');
            window.location.href='login.html';
            </script>";

        } else {

            echo "Error: " . $conn->error;

        }

    }

}

if ($accion == "login") {

    $sql = "SELECT * FROM usuarios
    WHERE correo = '$correo'
    AND contrasena = '$contrasena'";

    $resultado = $conn->query($sql);

    if ($resultado->num_rows > 0) {

        echo "<script>
        alert('Inicio de sesión correcto');
        window.location.href='index.html';
        </script>";

    } else {

        echo "<script>
        alert('Correo o contraseña incorrectos');
        window.location.href='login.html';
        </script>";

    }

}

$conn->close();

?>