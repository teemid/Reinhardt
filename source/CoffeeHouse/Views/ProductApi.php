<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;
use \Core\View as View;

use \CoffeeHouse\Models\Product as Product;
use \CoffeeHouse\Forms\ProductForm as ProductForm;


class ProductAPI extends View
{
    public function delete($request) {
        $query = $request['query_params'];

        if (array_key_exists('id', $query)) {
            $arguments = array('id' => intval($query['id']));

            $instance = Product::delete($arguments);

            return new JsonResponse($instance);
        }
        else
        {
            return new JsonResponse('Bad request', 400);
        }
    }

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

            $created_object = Product::get(array('id' => $id));

            $result = new JsonResponse($created_object);
        }
        else
        {
            $result = new JsonResponse(array('errors' => $form->getErrors()));
        }

        return $result;
    }
}
