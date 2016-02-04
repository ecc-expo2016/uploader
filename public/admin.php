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
    <div class="container">
      <h1>For Admin</h1>
      <p class="lead">管理用</p>
      <div id="list"></div>
    </div>

    <script src="./js/admin.js"></script>
  </body>
</html>
