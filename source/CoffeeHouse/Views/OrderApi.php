<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;
use \Core\View as View;

use \CoffeeHouse\Models\Order as Order;


class OrderAPI extends View
{
    public function post($request)
    {
        return new JsonResponse($request['POST']);
    }
}
