<?php

namespace Core;

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
    }

    public function render($template_name, $context)
    {
        ob_start();
        require($template_name);
        return ob_get_clean();
    }
}
