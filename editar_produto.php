<?php
include 'conexao.php';

// Verifica se um ID foi passado na URL (ex: editar_produto.php?id=5)
if (!isset($_GET['id'])) {
    // Se não tiver ID, manda de volta para o admin
    header("Location: admin.php");
    exit;
}

// Busca os dados do produto no banco para preencher o formulário
$id = $_GET['id'];
$sql = "SELECT * FROM produtos WHERE id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$id]);
$produto = $stmt->fetch(PDO::FETCH_ASSOC);

// Se o produto não existir (ID inválido), volta para o admin
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
    <link rel="stylesheet" href="style1.css">
</head>
<body>
    <header>
        <h1>Editar Produto: <?= htmlspecialchars($produto['nome']) ?></h1>
    </header>
    <main>
        <section class="form-container" style="margin: 0 auto; max-width: 600px;">
            
            <form action="processa_produto.php" method="POST" enctype="multipart/form-data">
                
                <input type="hidden" name="acao" value="editar">
                <input type="hidden" name="id" value="<?= $produto['id'] ?>">
                
                <div class="form-group">
                    <label for="nome">Nome do Produto:</label>
                    <input type="text" id="nome" name="nome" value="<?= htmlspecialchars($produto['nome']) ?>" required>
                </div>

                <div class="form-group">
                    <label for="categoria">Tipo de Produto:</label>
                    <select id="categoria" name="categoria" required>
                        <option value="trufa" <?= $produto['categoria'] == 'trufa' ? 'selected' : '' ?>>Trufa</option>
                        <option value="tablet" <?= $produto['categoria'] == 'tablet' ? 'selected' : '' ?>>Tablet de Chocolate</option>
                        <option value="cafe" <?= $produto['categoria'] == 'cafe' ? 'selected' : '' ?>>Café</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="preco">Preço (R$):</label>
                    <input type="number" step="0.01" id="preco" name="preco" value="<?= $produto['preco'] ?>" required>
                </div>

                <div id="campos-cafe" style="display: none; background: ##493327; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                    <h4 style="margin-top: 0;">Oferta Especial (Apenas para Cafés)</h4>
                    <div class="form-group">
                        <label for="preco_antigo">Preço Antigo (R$):</label>
                        <input type="number" step="0.01" id="preco_antigo" name="preco_antigo" value="<?= $produto['preco_antigo'] ?>">
                    </div>
                    <div class="form-group">
                        <label for="desconto_percentual">Porcentagem de Desconto (%):</label>
                        <input type="number" id="desconto_percentual" name="desconto_percentual" min="1" max="99" value="<?= $produto['desconto_percentual'] ?>">
                    </div>
                </div>

                <div class="form-group">
                    <label for="descricao">Descrição:</label>
                    <textarea id="descricao" name="descricao"><?= htmlspecialchars($produto['descricao']) ?></textarea>
                </div>

                <div class="form-group">
                    <label>Imagem Atual:</label>
                    <img src="<?= htmlspecialchars($produto['imagem_path']) ?>" width="100" style="display: block; margin: 10px 0; border: 1px solid #ccc; padding: 5px;">
                    
                    <label for="imagem">Trocar Imagem (deixe vazio para manter a atual):</label>
                    <input type="file" id="imagem" name="imagem" accept="image/*">
                </div>
                
                <div style="display: flex; gap: 10px;">
                    <button type="submit" style="flex: 1;">Salvar Alterações</button>
                    <a href="admin.php" style="flex: 1; text-align: center; background: #6c757d; color: white; padding: 12px; border-radius: 4px; text-decoration: none;">Cancelar</a>
                </div>

            </form>
        </section>
    </main>

    <script>
        const selectCategoria = document.getElementById('categoria');
        const camposCafe = document.getElementById('campos-cafe');

        function verificarCategoria() {
            if (selectCategoria.value === 'cafe') {
                camposCafe.style.display = 'block';
            } else {
                camposCafe.style.display = 'none';
                 // Na edição, NÃO limpamos os valores ao esconder, para não perder dados acidentalmente
            }
        }

        selectCategoria.addEventListener('change', verificarCategoria);
        // Executa ao carregar a página para mostrar os campos se já for um café
        verificarCategoria();
    </script>
</body>
</html>