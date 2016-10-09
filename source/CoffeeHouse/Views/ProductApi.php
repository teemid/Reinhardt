<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;

class ProductAPI extends \Core\View\View
{
    public function get()
    {
        return new JsonResponse(array(
            'Java' => 49,
            'Kaffe' => 39
        ));
    }
}
