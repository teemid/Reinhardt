<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;
use \Core\View\View as View;

class OrderAPI extends View
{
    public function get($request)
    {
        $db = new Database();

        $result = $db->fetch_class("SELECT * FROM coffee_orders;", __CLASS__);

        return new JsonResponse($result);
    }
}
