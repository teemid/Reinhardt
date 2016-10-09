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
        header('Content-Type: $this->content_type');

        return $this->body;
    }

    // public function offsetSet($offset, $value)
    // {
    //     if (is_null($offset))
    //     {
    //         $this->urls[] = $value;
    //     }
    //     else
    //     {
    //         $this->urls[$offset] = $value;
    //     }
    // }

    // public function offsetExists($offset)
    // {
    //     return isset($this->urls[$offset]);
    // }

    // public function offsetUnset($offset) {
    //     unset($this->urls[offset]);
    // }

    // public function offsetGet($offset) {
    //     return isset($this->urls[$offset]) ? $this->urls[$offset] : null;
    // }

    // public function getIterator() {
    //     return new \ArrayIterator($this->urls);
    // }
}
