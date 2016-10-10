<?php

namespace Core;


class Application
{
    private $url_config;

    function __construct()
    {
        $this->url_config = array();
        $this->url_config['/^\/$/'] = new \CoffeeHouse\Views\Index;
        $this->url_config['/^api$/'] = array(
            '/^coffee$/' => new \CoffeeHouse\Views\ProductAPI
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

        try {
            if (!$view) {
                throw new Exceptions\Http404();
            }

            return $view->dispatch($http_request);
        } catch (Http404 $e) {
            \http_response_code(404);

            return '';
        }
    }

    private function matchUrl($url, $url_config)
    {
        $path = array_shift($url);

        foreach ($url_config as $regex => $view)
        {
            preg_match($regex, $path, $matches);

            if ($matches[0] and is_array($view))
            {
                return $this->matchUrl($url, $view);
            }
            elseif ($matches[0])
            {
                return $view;
            }
        }

        return null;
    }
}
