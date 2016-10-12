<?php

namespace Reinhardt;

use \Reinhardt\Exceptions\Http404 as Http404;


class Application
{
    private $url_config;

    function __construct($url_config)
    {
        $this->url_config = $url_config;
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

        try
        {
            if (!$view)
            {
                throw new Http404();
            }

            $response = $view->dispatch($http_request);

            return $response->getBody();
        }
        catch (Http404 $e)
        {
            return $e->getMessage();
        }
        catch (\Exception $e)
        {
            // NOTE (Emil): Not catching a random exception is a server error.
            http_response_code(500);

            return $e->getMessage();
        }
    }

    private function formRequest() {
        $path = explode('?', $_SERVER['REQUEST_URI']);
        $method = $_SERVER['REQUEST_METHOD'];
        $request_content = array();

        if ($method == 'POST') {
            $json = file_get_contents('php://input');
            $request_content = json_decode($json, true);
        }

        $http_request = array(
            'method'        => $_SERVER['REQUEST_METHOD'],
            'path'          => $_SERVER['DOCUMENT_URI'],
            'scheme'        => $_SERVER['REQUEST_SCHEME'],
            'query_string'  => $_SERVER['QUERY_STRING'],
            'query_params'  => array(),
            'GET'           => $_SERVER['GET'],
            'POST'          => $request_content,
            'FILES'         => $_FILES,
        );

        parse_str($http_request['query_string'], $http_request['query_params']);

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
