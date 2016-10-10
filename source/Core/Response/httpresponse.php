<?php

namespace Core\Response;

class HttpResponse
{
    public $content_type = 'text/html';

    public function __construct($body, $content_type='text/html')
    {
        header('Content-Type: ' . $this->content_type);

        $this->body = $body;
    }

    public function getBody()
    {
        return $this->body;
    }
}
