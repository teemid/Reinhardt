<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;
use \Core\View\View as View;
use \Core\Form as Form;

use \CoffeeHouse\Models\Product as Product;


class ProductAPI extends View
{
    public function get($request, $id = null)
    {
        $result = array();

        if ($request['GET'])
        {
            $params = $request['GET'];

            $result = Product::get(array($params['id']));
        }
        else
        {
            $result = Product::all();
        }

        return new JsonResponse($result);
    }

    public function post($request)
    {
        $form = new Form($request['POST']);

        $form->validate();

        return new JsonResponse($request['POST']);
    }
}
