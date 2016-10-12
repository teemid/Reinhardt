<?php

namespace Reinhardt\Response;


class JsonResponse extends HttpResponse
{
    public function __construct($json, $status_code = 200)
    {
        $this->content_type = 'application/json; charset=utf-8';

        parent::__construct(json_encode($json), 200);
    }
}
