<?php

namespace Core;

use Core\Exceptions\ValidationError as ValidationError;


abstract class Form
{
    protected $raw_values = array();

    public function __construct($raw_values, $class_name = null) {
        $this->raw_values = $raw_values;
    }

    public function validate() {
        $properties = get_object_vars($this);

        $key = array_search('raw_values', $properties);

        if ($key !== false)
        {
            unset($properties[$key]);
        }

        foreach ($this->required as $property)
        {
            print('Property: ' . $property . PHP_EOL);

            if (array_key_exists($property, $this->raw_values))
            {
                $validation_function = 'validate_' . $property;
                $raw_value = $this->raw_values[$property];

                $this->$property = $this->$validation_function($this->raw_values[$property]);
            }
            else
            {
                throw new ValidationError('Property "' . $property . '" not found.');
            }
        }
    }

    protected function validate_string_length($property, $max_length) {
        $string = $this->raw_values[$property];

        if (strlen($string) > $max_length) {
            throw new ValidationError('Property: "' . $property . '" string value exceeds maximum.');
        }
    }
}
