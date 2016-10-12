<?php

namespace CoffeeHouse\Views;

use \Reinhardt\Response\JsonResponse as JsonResponse;
use \Reinhardt\View as View;

use \CoffeeHouse\Models\Beverage as Beverage;
use \CoffeeHouse\Forms\BeverageForm as BeverageForm;


class BeverageAPI extends View
{
    public function delete($request) {
        $query = $request['query_params'];

        if (array_key_exists('id', $query)) {
            $arguments = array('id' => intval($query['id']));

            $instance = Beverage::delete($arguments);

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
            $result = Beverage::get($request['query_params']);
        }
        else
        {
            $result = Beverage::all();
        }

        return new JsonResponse($result);
    }

    public function post($request)
    {
        $form = new BeverageForm($request['POST']);
        $result = null;

        if ($form->is_valid()) {
            $id = Beverage::create($form->cleaned_data);

            $created_object = Beverage::get(array('id' => $id));

            $result = new JsonResponse($created_object);
        }
        else
        {
            $result = new JsonResponse(array('errors' => $form->getErrors()));
        }

        return $result;
    }
}
