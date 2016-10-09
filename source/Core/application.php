<?php

namespace Core;

use Core\Response\HttpResponse as HttpResponse;


class Application
{
    private $url_config;

    function __construct()
    {
        $this->url_config = array();
        $this->url_config['/^\/$/'] = new \Views\Index;
        $this->url_config['/^api$/'] = array(
            '/^coffee$/' => new \Views\CoffeeView
        );
    }

    public function handleRequest($http_request)
    {
        $path = array();

        if ($http_request['path'] == '/')
        {
            $path[] = $http_request['path'];
        }
        else
        {
            $path = explode('/', $http_request['path']);
            array_shift($path);
        }

        $view = $this->matchUrl($path, $this->url_config);

        return $view ? $view->dispatch($http_request) : HttpResponse('Http404 Not Found');
    }

    private function matchUrl($url, $url_config)
    {
        $path = array_shift($url);

        foreach ($url_config as $regex => $view)
        {
            // print_r($url_config);
            // print('<br>' . $path . '<br>');
            preg_match($regex, $path, $matches);
            // print('<br>');
            // print_r($matches);
            // print('<br>');

            if ($matches[0] and is_array($view))
            {
                // print('is array <br>');
                // print_r($view);
                // print('<br>');
                return $this->matchUrl($url, $view);
            }
            elseif ($matches[0])
            {
                // print('is view <br>');
                // print($view);
                return $view;
            }
        }

        return null;
    }
}
