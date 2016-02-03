<?php
function getCSRFToken() {
  return base64_encode(openssl_random_pseudo_bytes(48));
}

function validateCSRFToken($token) {
  return isset($_COOKIE['CSRF_TOKEN']) && $_COOKIE['CSRF_TOKEN'] === $token;
}

$_ = function ($str) {
  return $str;
};
