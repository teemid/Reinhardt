<?php

namespace Reinhardt\Exceptions;


class ValidationError extends \Exception
{
    public function __construct($message = '400 Bad Request', $code = 0, Exception $previous = null)
    {
        http_response_code(400);

        parent::__construct($message, $code, $pervious);
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
}
