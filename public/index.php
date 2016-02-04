<?php
require_once './utils.php';

$token = getCSRFToken();
setcookie('CSRF_TOKEN', $token);
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Uploader of ECC EXPO 2016</title>
    <meta name="csrf-token" content="<?= $token?>">
    <link rel="stylesheet" href="./css/style.css">
  </head>

  <body>
    <div id="app">
      <div class="container">
        <h1>ページを読み込み中</h1>
        <p class="lead">しばらくお待ちください。</p>
      </div>
    </div>

    <script src="./js/app.js"></script>
  </body>
</html>
