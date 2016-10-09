<?php

namespace CoffeeHouse\Views;

use \Core\Response\HttpResponse as HttpResponse;

class Index extends \Core\View\View
{
    public function get($http_request)
    {
        $response = new HttpResponse(
            $this->render('templates/base.php', array('test' => 'Hello, Index'))
        );

        return $response;
    }
}
