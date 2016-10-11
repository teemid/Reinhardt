<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;
use \Core\View as View;

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
        $form = new ProductForm($request['POST']);
        $result = null;

        if ($form->is_valid()) {
            $created_object = Product::create($form->cleaned_data);
            $result = new JsonResponse($created_object);
        }
        else
        {
            $result = new JsonResponse(array('errors' => $form->getErrors()));
        }

        return $result;
    }

    public function delete($request) {
        return new JsonResponse(array('Successfully deleted ' . $request['GET']['id']));
    }
}
