<?php

define(ROOT_DIR, dirname(__FILE__));

spl_autoload_register();

$app = new Core\Application();

$response = $app->handleRequest();

echo $response;
