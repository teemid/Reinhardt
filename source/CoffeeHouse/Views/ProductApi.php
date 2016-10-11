<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;
use \Core\View as View;

use \CoffeeHouse\Models\Product as Product;
use \CoffeeHouse\Forms\ProductForm as ProductForm;


class ProductAPI extends View
{
    public function get($request)
    {
        $result = array();

        if (!empty($request['query_params']))
        {
            $result = Product::get($request['query_params']);
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
            $id = Product::create($form->cleaned_data);

            $created_object = Product::get(array($id));

            $result = new JsonResponse($created_object);
        }
        else
        {
            $result = new JsonResponse(array('errors' => $form->getErrors()));
        }

        return $result;
    }

    public function delete($request) {
        return new JsonResponse('Successfully deleted ' . $request['query_params']);
    }
}
