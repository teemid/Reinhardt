<?php

namespace CoffeeHouse\Views;

use \Reinhardt\Response\JsonResponse as JsonResponse;
use \Reinhardt\View as View;

use \CoffeeHouse\Models\Order as Order;


class OrderAPI extends View
{
    public function post($request)
    {
        return new JsonResponse($request['POST']);
    }
}
