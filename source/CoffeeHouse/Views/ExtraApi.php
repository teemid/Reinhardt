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

    public function delete($request) {
        $result = Extra::delete($request['query_params']);

        return new JsonResponse('Successfully deleted ' . $request['query_params']);
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
