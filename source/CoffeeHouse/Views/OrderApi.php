<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;
use \Core\View as View;

use \CoffeeHouse\Models\Order as Order;


class OrderAPI extends View
{
    public function get($request)
    {
        $result = Order::all();

        return new JsonResponse($result);
    }

    public function post($request)
    {
        return new JsonResponse($request['POST']);
    }
}
