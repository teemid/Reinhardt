<?php

namespace Core\Exceptions;


class ConfigurationError extends \Exception
{
    public function __construct($message = '404 Not Found', $code = 0, Exception $previous = null)
    {
        // NOTE (Emil): Internal server error.
        http_response_code(500);

        parent::__construct($message, $code, $pervious);
    }

    public function __toString() {
        return __CLASS__ . ": [{$this->code}]: {$this->message}\n";
    }
}
