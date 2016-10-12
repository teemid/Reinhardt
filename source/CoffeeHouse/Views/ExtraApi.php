<?php

namespace CoffeeHouse\Views;

use \Reinhardt\Response\JsonResponse as JsonResponse;
use \Reinhardt\View as View;

use \CoffeeHouse\Models\Extra as Extra;
use \CoffeeHouse\Forms\ExtraForm as ExtraForm;


class ExtraAPI extends View
{
    public function delete($request) {
        $query = $request['query_params'];

        if (array_key_exists('id', $query)) {
            $arguments = array('id' => intval($query['id']));

            $instance = Extra::delete($arguments);

            return new JsonResponse($instance);
        }
        else
        {
            return new JsonResponse('Bad request', 400);
        }
    }

    public function get($request, $id = null)
    {
        $result = array();

        if ($request['GET'])
        {
            $result = Extra::get($request['GET']);
        }
        else
        {
            $result = Extra::all();
        }

        return new JsonResponse($result);
    }

    public function post($request)
    {
        $form = new ExtraForm($request['POST']);
        $result = null;

        if ($form->is_valid()) {
            $created_object = Extra::create($form->cleaned_data);

            $result = new JsonResponse(Extra::get(array('id' => $created_object)));
        }
        else
        {
            $result = new JsonResponse(array('errors' => $form->getErrors()));
        }

        return $result;
    }
}
