<?php

namespace Core\Response;

class HttpResponse
{
    public $content_type = 'text/html';

    public function __construct($body, $content_type='text/html')
    {
        $this->body = $body;
    }

    public function getBody()
    {
        header('Content-Type: ' . $this->content_type);

        return $this->body;
    }
}
