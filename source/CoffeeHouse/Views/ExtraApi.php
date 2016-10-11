<?php

namespace CoffeeHouse\Views;

use \Core\Response\JsonResponse as JsonResponse;
use \Core\View as View;

use \CoffeeHouse\Models\Extra as Extra;
use \CoffeeHouse\Forms\ExtraForm as ExtraForm;


class ExtraAPI extends View
{
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
            $result = new JsonResponse($created_object);
        }
        else
        {
            $result = new JsonResponse(array('errors' => $form->getErrors()));
        }

        return $result;
    }
}
