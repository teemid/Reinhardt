<?php

namespace Reinhardt\Response;


class HttpResponse
{
    public $content_type = 'text/html';

    public function __construct($body, $status_code=200, $content_type='text/html') {
        header('Content-Type: ' . $this->content_type);
        http_response_code($status_code);

        $this->body = $body;
    }

    public function getBody()
    {
        return $this->body;
    }
}
