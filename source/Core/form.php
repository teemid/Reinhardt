<?php

namespace Core;

use Core\Exceptions\ValidationError as ValidationError;
use Core\Exceptions\ConfigurationError as ConfigurationError;


abstract class Form
{
    protected $raw_values = array();
    protected $requirements = array();
    protected $errors = array();

    public function __construct($raw_values, $class_name = null) {
        $this->raw_values = $raw_values;
    }

    public function is_valid() {
        $this->cleaned_data = $this->validate();

        return empty($this->errors);
    }

    public function validate() {
        $cleaned_data = array();

        foreach ($this->requirements as $property => $requirements)
        {
            try {
                if (array_key_exists($property, $this->raw_values))
                {
                    $type_validation = 'validate_' . $requirements['type'];

                    $this->$type_validation($property, $requirements);

                    $validation_function = 'validate_' . $property;
                    if (property_exists($this, $validation_function))
                    {
                        $this->$validation_function($this->raw_values[$property]);
                    }

                    $cleaned_data[$property] = $this->raw_values[$property];
                }
                else
                {
                    throw new ValidationError('Property "' . $property . '" not found.');
                }
            } catch (ValidationError $e) {
                $this->errors[$property] = $e->getMessage();
            }
        }

        return $cleaned_data;
    }

    public function getErrors() {
        return $this->errors;
    }

    public function validate_string($property, $requirements)
    {
        $value = $this->raw_values[$property];

        if (gettype($value) != 'string') {
            throw new ValidationError('Property: "' . $property . '" is not a string value.');
        }

        if (!array_key_exists('max_length', $requirements))
        {
            throw new ConfigurationError('String type requires "max_length" requirement.');
        }

        if (strlen($value) > $requirements['max_length']) {
            throw new ValidationError('Property: "' . $property . '" string value exceeds maximum.');
        }
    }

    public function validate_integer($property)
    {
        $value = $this->raw_values[$property];

        $result = intval($value);

        if ($result === 0 and $result != '0')
        {
            throw new ValidationError('Property: "' . $property . '" is not an integer value.');
        }
    }

    public function validate_boolean($property)
    {
        $value = $this->raw_values[$property];

        if (gettype($value) != 'boolean') {
            throw new ValidationError('Property ' . $property . ' is not a boolean value.');
        }

        // NOTE (Emil): json_decode: 'true' => 1, 'false' => 0, and BOOLEAN is an alias of TINYINT(1).
        if (!($value === False || $value === True))
        {
            throw new ValidationError('Property ' . $property . ' is not a boolean value.');
        }
    }
}
