<?php

namespace Core\View;

use \Core\Response\HttpResponse as HttpResponse;

class View
{
    private $context;

    public function dispatch($http_request)
    {
        $method = strtolower($http_request['method']);

        if (method_exists($this, $method))
        {
            return $this->$method($http_request);
        }
        else
        {
            return HttpResponse('Resource not found.');
        }
    }

    public function render($template_name, $context)
    {
        ob_start();
        require($template_name);
        return ob_get_clean();
    }

    public function __toString()
    {
        return \get_class($this);
    }
}
