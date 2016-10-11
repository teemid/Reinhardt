<?php

namespace CoffeeHouse\Forms;

use \Core\Form as Form;
use \Core\Exceptions\ValidationError as ValidationError;

use \Coffee\Models\Product as Product;


class ProductForm extends Form
{
    protected $requirements = array(
        'name' => array('type' => 'string', 'max_length' => 120),
        'price' => array('type' => 'integer'),
        'doubleable' => array('type' => 'boolean')
    );
}
