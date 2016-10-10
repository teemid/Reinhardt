<?php

namespace Core\Response;

class JsonResponse extends HttpResponse
{
    public function __construct($json)
    {
        parent::__construct(json_encode($json), 'application/json; charset=utf-8');
    }
}
