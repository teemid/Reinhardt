<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;
use \Core\View\View as View;

use \CoffeeHouse\Models\Product as Product;
use \CoffeeHouse\Forms\ProductForm as ProductForm;


class ProductAPI extends View
{
    public function get($request, $id = null)
    {
        $result = array();

        if ($request['GET'])
        {
            $result = Product::get($request['GET']);
        }
        else
        {
            $result = Product::all();
        }

        return new JsonResponse($result);
    }

    public function post($request)
    {
        print_r($request);

        $form = new ProductForm($request['POST']);

        $object = $form->validate();

        Product::create($object);

        return new JsonResponse($request['POST']);
    }
}
