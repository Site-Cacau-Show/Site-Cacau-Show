<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = ""; 
$dbname = "lojacacaushow";
$response = [
    'success' => false,
    'message' => ''
];

try {
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        throw new Exception("Falha na conexão: " . $conn->connect_error);
    }
    $nome = $_POST['nome'] ?? '';
    $mensagem = $_POST['mensagem'] ?? '';
    $avatar_path = null;
    if (empty($nome) || empty($mensagem)) {
        throw new Exception("Nome e mensagem são obrigatórios.");
    }

    if (isset($_FILES['avatar']) && $_FILES['avatar']['error'] == 0) {
        $uploadDir = 'FotosFeedback/';
        $fileName = uniqid() . '-' . basename($_FILES['avatar']['name']);
        $targetPath = $uploadDir . $fileName;

        if (move_uploaded_file($_FILES['avatar']['tmp_name'], $targetPath)) {
            $avatar_path = $targetPath;
        } else {
            error_log("Falha ao mover o arquivo de avatar para " . $targetPath);
        }
    }

    $sql = "INSERT INTO Feedback (nome, mensagem, avatar_path) VALUES (?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        throw new Exception("Erro ao preparar a query: " . $conn->error);
    }

    $stmt->bind_param("sss", $nome, $mensagem, $avatar_path);

    if ($stmt->execute()) {
        $response['success'] = true;
        $response['message'] = "Feedback salvo com sucesso!";
    } else {
        throw new Exception("Erro ao salvar o feedback: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    $response['message'] = $e->getMessage();
}

echo json_encode($response);
exit();
?>