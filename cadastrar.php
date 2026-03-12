<?php
include('conexao.php');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT); // <<< gera hash seguro

    $sql = "INSERT INTO usuario (nome, email, senha, telefone, data_cadastro)
            VALUES (?, ?, ?, ?, NOW())";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssss", $nome, $email, $senha, $telefone);

    if ($stmt->execute()) {
        echo "<script>alert('Usuário cadastrado com sucesso!'); window.location='login.html';</script>";
    } else {
        echo "<script>alert('Erro ao cadastrar: e-mail já existente.'); window.history.back();</script>";
    }

    $stmt->close();
    $conn->close();
}
?>
