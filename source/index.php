<?php

define(ROOT_DIR, dirname(__FILE__));

spl_autoload_register();

$app = new Core\Application();

$http_request = array(
    'method' => $_SERVER['REQUEST_METHOD'],
    'path'   => $_SERVER['REQUEST_URI'],
    'scheme' => $_SERVER['REQUEST_SCHEME'],
    'GET'    => $_GET,
    'POST'   => $_POST,
    'FILES'  => $_FILES,
);

$response = $app->handleRequest($http_request);

echo $response->getBody();
