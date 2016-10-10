<?php

namespace Core;

use Core\Exceptions\Http404 as Http404;


class Application
{
    private $url_config;

    function __construct()
    {
        $this->url_config = array();
        $this->url_config['/^api$/'] = array(
            '/^v1$/' => array(
                '/^products$/' => new \CoffeeHouse\Views\ProductAPI,
                '/^orders$/' => new \CoffeeHouse\Views\OrderAPI
            )
        );
    }

    public function handleRequest()
    {
        $http_request = $this->formRequest();

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
                throw new Http404();
            }

            $response = $view->dispatch($http_request);

            return $response->getBody();
        } catch (\Exception $e) {
            // NOTE (Emil): Not really any thing to do here.

            return $e->getMessage();
        }
    }

    private function formRequest() {
        $path = $_SERVER['REQUEST_URI'];

        $result = explode('?', $path);
        $resource = $result[0];
        $query = $result[1];

        $http_request = array(
            'method' => $_SERVER['REQUEST_METHOD'],
            'query' => $query,
            'path'   => $resource,
            'scheme' => $_SERVER['REQUEST_SCHEME'],
            'GET'    => $_GET,
            'POST'   => $_POST,
            'FILES'  => $_FILES,
        );

        return $http_request;
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
