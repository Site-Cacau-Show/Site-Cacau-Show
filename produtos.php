<?php

include 'conexao.php';

$sql = "SELECT * FROM produtos WHERE status = 'ativo' ORDER BY nome";
$stmt = $pdo->query($sql);
$todos_produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

$trufas = [];
$tablets = [];
$cafes = [];

foreach ($todos_produtos as $produto) {
    if ($produto['categoria'] == 'trufa') {
        $trufas[] = $produto;
    } elseif ($produto['categoria'] == 'tablet') {
        $tablets[] = $produto;
    } elseif ($produto['categoria'] == 'cafe') {
        $cafes[] = $produto;
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="produto.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
    <link rel="shortcut icon" href="icone.ico" type="image/x-icon">
    <title>Produtos - Cacau Show</title>
</head>

<body>
      <header>
        <a href="logo_cacau_show.svg" class="logo">
            <img src="logo_cacau_show.svg" id="logo">
        </a>

        <ul class="navbar">
            <li><a href="index.html">Home</a></li>
            <li><a href="#">Sobre nós</a></li>
            <li><a href="contato.html">Contato</a></li>
            <li><a href="produtos.html">Produtos</a></li>
            <li><a href="#">Seja membro</a></li>
            <li><a href="login.html" id="loginBtn">Entrar</a></li>
        </ul>
        <div class="bx bx-menu" id="menu-icon"></div>
    </header>
    <div class="full-width-image">
        <img src="fundo2.png" alt="Descrição da Imagem">
    </div>

    <div class="container">
        <center>
            <img src="trufa sem fundo.png" alt="" class="logoProduto">
        </center>

        

        <div class="cards">
            
            <?php foreach ($trufas as $produto): ?>

            <div class="card">
                <img src="<?= htmlspecialchars($produto['imagem_path']) ?>" class="card__img">
                <div class="card__data">
                    <h1 class="card__title"><?= htmlspecialchars($produto['nome']) ?></h1>
                    <span class="card__preci">$<?= number_format($produto['preco'], 2, ',', '.') ?></span>
                    <p class="card__description"><?= htmlspecialchars($produto['descricao']) ?></p>
                    <a href="/compra" class="card__button">Compre Agora</a>
                </div>
                
            </div>

<?php endforeach; ?>

            </div
        </div>



        <center>
            <img src="tablete sem fundo.png" alt="" class="logoProduto">
        </center>
        <div class="cards">

        <?php foreach ($tablets as $produto): ?>

            <div class="card">
                <img src="<?= htmlspecialchars($produto['imagem_path']) ?>" class="card__img">
                <div class="card__data">
                    <h1 class="card__title"><?= htmlspecialchars($produto['nome']) ?></h1>
                    <span class="card__preci">$<?= number_format($produto['preco'], 2, ',', '.') ?></span>
                    <p class="card__description"><?= htmlspecialchars($produto['descricao']) ?></p>
                    <a href="/compra" class="card__button">Compre Agora</a>
                </div>
                
            </div>

   <?php endforeach; ?>


    </div>

    <h2 class="lancamentos-texto">Espaço Café</h2>

                <section class="product" id="cafes"> 
    <h2 class="product-category">Nossos Cafés</h2>
    
    <button class="pre-btn"><img src="images/arrow.png" alt=""></button>
    <button class="nxt-btn"><img src="images/arrow.png" alt=""></button>
    
    <div class="product-container">
        
        <?php foreach ($cafes as $produto): ?>
        
            <div class="product-card">
                <div class="product-image">
                    
                    <?php if ($produto['desconto_percentual']): ?>
                        <span class="discount-tag"><?= $produto['desconto_percentual'] ?>% off</span>
                    <?php endif; ?>

                    <img src="<?= htmlspecialchars($produto['imagem_path']) ?>" class="product-thumb" alt="<?= htmlspecialchars($produto['nome']) ?>">
                    <button class="card-btn">Adicionar ao Carrinho</button>
                </div>
                
                <div class="product-info">
                    <h2 class="product-brand"><?= htmlspecialchars($produto['nome']) ?></h2>
                    <p class="product-short-description"><?= htmlspecialchars($produto['descricao']) ?></p>
                    
                    <span class="price">R$ <?= number_format($produto['preco'], 2, ',', '.') ?></span>
                    
                 
                        <span class="actual-price">R$ <?= number_format($produto['preco_antigo'], 2, ',', '.') ?></span>
                    
                </div>
            </div>
        
        <?php endforeach; ?>
        </div>
</section>
            </div>
            </div>

        <br>
        <br>
        <br>
        <br>

        <footer class="footer">
        <a href="" class="logo"><img width="110" height="51" src="logo_cacau_show.svg" alt=""></a>
        <br><br><br><br>

        <div class="footer-text">
                  <p>A Cacau Show se compromete em utilizar ovos de galinhas livres de gaiolas em todas as suas operações. Estamos trabalhando para garantir essa transição até 2025. As imagens expostas neste site são meramente ilustrativas.

Preços apresentados na loja virtual podem variar de acordo com a região. Informações sobre preços, prazos de validade, estoque e origem podem ser obtidas diretamente nas lojas.  Consulte a loja para verificar disponibilidade.

 

Preços, estoques, informações e condições disponíveis no site estão sujeitos a alterações sem aviso prévio. *Preços e produtos do Choco-Outlet são válidos somente para compras realizadas na loja virtual sujeito a disponibilidade de estoque.</p>
<br>
              <p>Copyrigth &copy; 2025 Cacau Show Brasil | Todos os Direitos Reservados.</p>
              <br><br>
            </div>

            <footer style="background-color: #202020; padding: 20px; font-family: Arial, sans-serif; color: #f8f8f8;">
  <div style="display: flex; justify-content: space-around;">
    <div>
      <h3 style="font-weight: bold; color: #7d654f;">INSTITUCIONAL</h3>
      <br>
      <ul style="margin-right: 50px; list-style: none; padding: 4;">
        <li><a href="https://revendedor.cacaushow.com.br/revendedor/" style="color: white; text-decoration: none;">Seja um Revendedor</a></li>
        <li><a href="https://www.cacaushow.com.br/franquia.html" style="color: white; text-decoration: none;">Seja um Franqueado</a></li>
        <li><a href="https://www.cacaushow.com.br/para-sua-empresa/para-sua-empresa.html" style="color: white; text-decoration: none;">Área para Empresas</a></li>
        <li><a href="https://cacaushow.gupy.io/" style="color: white; text-decoration: none;">Trabalhe Conosco</a></li>
        <li><a href="https://www.cacaushow.com.br/categoria/nossas-marcas" style="color: white; text-decoration: none;">Nossas Marcas</a></li>
      </ul>
    </div>
    
    <div>
      <h3 style="font-weight: bold; color: #7d654f;">POLÍTICAS</h3>
      <br>
      <ul style="list-style: none; padding: 0;">
        <li><a href="https://www.cacaushow.com.br/terms.html" style="color: white; text-decoration: none;">Termos de Uso</a></li>
        <li><a href="https://www.privacidade.com.br/portal-de-privacidade?token=e8d91724233537d3a44c65424e6b9ee7" style="color: white; text-decoration: none;">Política de Privacidade</a></li>
        <li><a href="https://www.cacaushow.com.br/politica/returns.html" style="color: white; text-decoration: none;">Políica de Trocas</a></li>
        <li><a href="https://www.cacaushow.com.br/faqs.html" style="color: white; text-decoration: none;">FAQ</a></li>
        <li><a href="https://www.cacaushow.com.br/regulamentos/Regulamentos.html" style="color: white; text-decoration: none;">Regulamentos</a></li>
        <li><a href="https://sac.cacaushow.com.br/" style="color: white; text-decoration: none;">SAC</a></li>
        <li><a href="https://www.cacaushow.com.br/Comunicado-Oficial.html" style="color: white; text-decoration: none;">Comunicado Oficial Cacau Show</a></li>
      </ul>
    </div>
  </div>
</footer>

</body>
<script src="produtos.js"></script>

</html>