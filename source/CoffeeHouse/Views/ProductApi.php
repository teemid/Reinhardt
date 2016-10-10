<?php

namespace CoffeeHouse\Views;

use \Core\Database as Database;
use \Core\Response\JsonResponse as JsonResponse;
use \Core\View\View as View;

class ProductAPI extends View
{
    public function get($request)
    {
        $db = new Database();

        $result = $db->fetch_class("SELECT * FROM coffee_products;", __CLASS__);

        return new JsonResponse($result);
    }
}
