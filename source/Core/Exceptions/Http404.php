<?php

namespace Core\Expcetions;

class Http404 extends \Exception
{
    public function __construct($message, $code = 0, Exception $previous = null)
    {
        http_response_code(404);

        parent::__construct($message, $code, $pervious);
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
}
