<?php
require_once './utils.php';
require_once './defs.php';

$valid = isset($_SERVER['HTTP_X_CSRF_TOKEN']) &&
  validateCSRFToken($_SERVER['HTTP_X_CSRF_TOKEN']) &&
  isset($_FILES['upfile']['error']) &&
  is_int($_FILES['upfile']['error']) &&
  $_FILES['upfile']['error'] === UPLOAD_ERR_OK;

// invalid request
if (!$valid) {
  http_response_code(400);
  exit;
}

// file size is too large
if ($_FILES['upfile']['size'] > MAX_FILE_SIZE) {
  http_response_code(400);
  exit;
}

// file isn't zip
$finfo = new finfo(FILEINFO_MIME_TYPE);
if ($finfo->file($_FILES['upfile']['tmp_name']) !== 'application/zip') {
  http_response_code(400);
  exit;
}

$path = "{$_(UPLOAD_DIR)}/${_POST['id']}.zip";
// file exists already
if (file_exists($path)) {
  http_response_code(400);
  exit;
}

// dir is not exists
// if (!is_dir(UPLOAD_DIR)) {
//   mkdir(UPLOAD_DIR, 0777);
//
//   if (fileperms(UPLOAD_DIR) !== 0777) {
//     chmod(UPLOAD_DIR, 0777);
//   }
// }

// save file
if (!move_uploaded_file($_FILES['upfile']['tmp_name'], $path)) {
  // file can't save
  http_response_code(400);
  exit;
}
chmod($path, 0644);

header('Content-Type: text/plain; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Access-Control-Allow-Methods: POST');
header('X-Frame-Options: DENY');
