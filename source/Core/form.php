<?php

namespace Core;


class Form
{
    public function __construct($array, $class_name = null) {
        foreach($array as $key => $value)
        {
            $this->$key = $value;

            print(gettype($value));
        }
    }

    public function validate() {
        $properties = get_object_vars($this);

        foreach ($properties as $property)
        {
            $validation_function = 'validate_' . $property;

            $this->$validation_function($this->$property);
        }
    }
}
