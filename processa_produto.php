<?php
include 'conexao.php';

if (isset($_POST['acao'])) {

    if ($_POST['acao'] == 'adicionar') {
        $nome = $_POST['nome'];
        $categoria = $_POST['categoria'];
        $preco = $_POST['preco'];
        $descricao = $_POST['descricao'];
        
        $preco_antigo = !empty($_POST['preco_antigo']) ? $_POST['preco_antigo'] : null;
        $desconto = !empty($_POST['desconto_percentual']) ? $_POST['desconto_percentual'] : null;

        if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] == 0) {
            $extensao = pathinfo($_FILES['imagem']['name'], PATHINFO_EXTENSION);
            $nome_arquivo = uniqid() . "." . $extensao;
            $destino = 'uploads/' . $nome_arquivo;

            if (move_uploaded_file($_FILES['imagem']['tmp_name'], $destino)) {
                $sql = "INSERT INTO produtos (nome, categoria, preco, preco_antigo, desconto_percentual, descricao, imagem_path) VALUES (?, ?, ?, ?, ?, ?, ?)";
                $stmt = $pdo->prepare($sql);
                $stmt->execute([$nome, $categoria, $preco, $preco_antigo, $desconto, $descricao, $destino]);
            }
        }
    }

   
    if ($_POST['acao'] == 'editar') {
        $id = $_POST['id'];
        $nome = $_POST['nome'];
        $categoria = $_POST['categoria'];
        $preco = $_POST['preco'];
        $descricao = $_POST['descricao'];
   
        $preco_antigo = !empty($_POST['preco_antigo']) ? $_POST['preco_antigo'] : null;
        $desconto = !empty($_POST['desconto_percentual']) ? $_POST['desconto_percentual'] : null;

      
        $sql = "UPDATE produtos SET nome=?, categoria=?, preco=?, preco_antigo=?, desconto_percentual=?, descricao=? WHERE id=?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$nome, $categoria, $preco, $preco_antigo, $desconto, $descricao, $id]);

        if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] == 0) {
            $extensao = pathinfo($_FILES['imagem']['name'], PATHINFO_EXTENSION);
            $nome_arquivo = uniqid() . "." . $extensao;
            $destino = 'uploads/' . $nome_arquivo;

            if (move_uploaded_file($_FILES['imagem']['tmp_name'], $destino)) {
                $sql_img = "UPDATE produtos SET imagem_path=? WHERE id=?";
                $stmt_img = $pdo->prepare($sql_img);
                $stmt_img->execute([$destino, $id]);
            }
        }
    }

    if ($_POST['acao'] == 'desativar') {
        $stmt = $pdo->prepare("UPDATE produtos SET status = 'inativo' WHERE id = ?");
        $stmt->execute([$_POST['id']]);
    }
    if ($_POST['acao'] == 'reativar') {
        $stmt = $pdo->prepare("UPDATE produtos SET status = 'ativo' WHERE id = ?");
        $stmt->execute([$_POST['id']]);
    }
}

header('Location: admin.php');
exit;
?>