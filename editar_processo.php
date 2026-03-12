<?php
include 'conexao.php';

// Verifica se veio um ID na URL
if (!isset($_GET['id'])) {
    header("Location: admin.php");
    exit;
}

// Busca os dados do produto atual para preencher o formulário
$id = $_GET['id'];
$sql = "SELECT * FROM produtos WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$produto = $stmt->fetch(PDO::FETCH_ASSOC);

// Se não achou o produto, volta pro admin
if (!$produto) {
    header("Location: admin.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Editar Produto</title>
    <link rel="stylesheet" href="admin_style.css">
</head>
<body>
    <div class="form-container" style="margin: 50px auto;">
        <h2>Editar Produto: <?= htmlspecialchars($produto['nome']) ?></h2>
        
        <form action="processa_produto.php" method="POST" enctype="multipart/form-data">
            <input type="hidden" name="acao" value="editar">
            <input type="hidden" name="id" value="<?= $produto['id'] ?>">
            
            <div class="form-group">
                <label for="nome">Nome:</label>
                <input type="text" id="nome" name="nome" value="<?= htmlspecialchars($produto['nome']) ?>" required>
            </div>

            <div class="form-group">
                <label for="categoria">Tipo:</label>
                <select id="categoria" name="categoria" required>
                    <option value="trufa" <?= $produto['categoria'] == 'trufa' ? 'selected' : '' ?>>Trufa</option>
                    <option value="tablet" <?= $produto['categoria'] == 'tablet' ? 'selected' : '' ?>>Tablet</option>
                </select>
            </div>
            
            <div class="form-group">
                <label for="preco">Preço (R$):</label>
                <input type="number" step="0.01" id="preco" name="preco" value="<?= $produto['preco'] ?>" required>
            </div>

            <div class="form-group">
                <label for="descricao">Descrição:</label>
                <textarea id="descricao" name="descricao"><?= htmlspecialchars($produto['descricao']) ?></textarea>
            </div>

            <div class="form-group">
                <label>Imagem Atual:</label>
                <img src="<?= $produto['imagem_path'] ?>" width="100" style="display: block; margin: 10px 0;">
                <label for="imagem">Trocar Imagem (opcional):</label>
                <input type="file" id="imagem" name="imagem" accept="image/*">
            </div>
            
            <button type="submit" style="background-color: #007bff;">Salvar Alterações</button>
            <a href="admin.php" style="display: block; text-align: center; margin-top: 15px; color: #666;">Cancelar</a>
        </form>
    </div>
</body>
</html>