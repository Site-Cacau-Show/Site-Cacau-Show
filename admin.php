<?php

include 'conexao.php';

$sql_ativos = "SELECT * FROM produtos WHERE status = 'ativo' ORDER BY nome";
$stmt_ativos = $pdo->query($sql_ativos);
$produtos_ativos = $stmt_ativos->fetchAll(PDO::FETCH_ASSOC);

$sql_inativos = "SELECT * FROM produtos WHERE status = 'inativo' ORDER BY nome";
$stmt_inativos = $pdo->query($sql_inativos);
$produtos_inativos = $stmt_inativos->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Painel de Administração de Produtos</title>
    <link rel="stylesheet" href="style1.css"> 
</head>
<body>
    <header>
        <h1>Painel de Controle da Loja</h1>
    </header>
    <main>
        <section class="form-container">
            <h2>Adicionar Novo Produto</h2>
            
            <form action="processa_produto.php" method="POST" enctype="multipart/form-data">
                
                <input type="hidden" name="acao" value="adicionar">
                
                <div class="form-group">
                    <label for="nome">Nome do Produto:</label>
                    <input type="text" id="nome" name="nome" required>
                </div>
                
                <div class="form-group">
                    <label for="preco">Preço (R$):</label>
                    <input type="number" step="0.01" id="preco" name="preco" required>
                </div>

                <div id="campos-cafe" style="display: none; background: #231709; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
    <h4 style="margin-top: 0;">Oferta Especial (Apenas para Cafés)</h4>
    <div class="form-group">
        <label for="preco_antigo">Preço Antigo (R$):</label>
        <input type="number" step="0.01" id="preco_antigo" name="preco_antigo">
    </div>

    <div class="form-group">
        <label for="desconto_percentual">Porcentagem de Desconto (%):</label>
        <input type="number" id="desconto_percentual" name="desconto_percentual" min="1" max="99">
    </div>
</div>

                <div class="form-group">
                    <label for="descricao">Descrição (para o 'hover'):</label>
                    <textarea id="descricao" name="descricao"></textarea>
                </div>

                <div class="form-group">
                    <label for="imagem">Foto do Produto:</label>
                    <input type="file" id="imagem" name="imagem" accept="image/*" required>
                </div>

<div class="form-group">

    <label for="categoria">Tipo de Produto:</label>
    <select id="categoria" name="categoria" required>
        <option value="" disabled selected>-- Selecione o Tipo --</option>
        
        <option value="trufa">Trufa</option>
        <option value="tablet">Tablet de Chocolate</option>
        <option value="cafe">Café</option>
    </select>

</div>


                
                <button type="submit">Adicionar Produto</button>
            </form>
            
        </section>

        <section class="product-list">
            <h2>Produtos Ativos (Visíveis na Loja)</h2>
            <table>
                <thead>
                        <tr>
                        <th>Foto</th>
                        <th>Produto</th>
                        <th>Tipo</th>
                        <th>Preço</th>
                        <th>Ação</th> </tr>
                </thead>
                <tbody>
                    <?php foreach ($produtos_ativos as $produto): ?>
<tr>
    <td><img src="<?= htmlspecialchars($produto['imagem_path']) ?>" alt="" width="50"></td>
    
    <td><?= htmlspecialchars($produto['nome']) ?></td>
    
    <td><?= htmlspecialchars(ucfirst($produto['categoria'])) ?></td>

    <td>R$ <?= number_format($produto['preco'], 2, ',', '.') ?></td>
    
    <td>
        <div style="display: flex; gap: 5px; align-items: center;">
             <a href="editar_produto.php?id=<?= $produto['id'] ?>" class="btn-desativar">Editar</a>
            
            <form action="processa_produto.php" method="POST" style="margin: 0;">
                <input type="hidden" name="acao" value="desativar">
                <input type="hidden" name="id" value="<?= $produto['id'] ?>">
                <button type="submit" class="btn-desativar" style="">Desativar</button>
            </form>
        </div>
    </td>
</tr>
<?php endforeach; ?>
                    
                </tbody>

                
            </table>
        </section>

        <section class="product-list inactive-list">
            <h2>Produtos Inativos (Não visíveis)</h2>
            <table>
                 <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Produto</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($produtos_inativos as $produto): ?>
                    <tr>
                        <td><img src="<?= htmlspecialchars($produto['imagem_path']) ?>" alt="" width="50"></td>
                        <td><?= htmlspecialchars($produto['nome']) ?></td>
                        <td>
                            <form action="processa_produto.php" method="POST">
                                <input type="hidden" name="acao" value="reativar">
                                <input type="hidden" name="id" value="<?= $produto['id'] ?>">
                                <button type="submit" class="btn-reativar">Reativar</button>
                            </form>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
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
            document.getElementById('preco_antigo').value = '';
            document.getElementById('desconto_percentual').value = '';
        }
    }

   
    selectCategoria.addEventListener('change', verificarCategoria);
    
  
    verificarCategoria();

</script>
</body>
</html>