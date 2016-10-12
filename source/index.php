<?php

define(ROOT_DIR, dirname(__FILE__));

spl_autoload_register();

$url_config = array();
$url_config = array(
    '/^api$/' => array(
        '/^v1$/' => array(
            '/^beverages$/' => new \CoffeeHouse\Views\BeverageAPI,
            '/^extras$/' => new \CoffeeHouse\Views\ExtraAPI,
            '/^orders$/' => new \CoffeeHouse\Views\OrderAPI,
        )
    )
);

$app = new Reinhardt\Application($url_config);

$response = $app->handleRequest();

echo $response;
