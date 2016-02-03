<?php
require_once './utils.php';
require_once './defs.php';

$valid = isset($_SERVER['HTTP_X_CSRF_TOKEN']) &&
  validateCSRFToken($_SERVER['HTTP_X_CSRF_TOKEN']);

// invalid request
if (!$valid) {
  http_response_code(400);
  exit;
}

$matching = array_filter(glob("{$_(UPLOAD_DIR)}/*"), function ($file) {
  return is_file($file);
});

$files = array_map(function ($file) {
  return basename($file);
}, $matching);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Methods: GET');
header('X-Frame-Options: DENY');
echo json_encode($files);
