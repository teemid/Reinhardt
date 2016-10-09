<?php

namespace Core

class HttpResponse
{
    private $body;
    private $content_type;

    public function repond()
    {
        header('Content-Type: application/json');
    }
}
