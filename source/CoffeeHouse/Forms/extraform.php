<?php

namespace CoffeeHouse\Forms;

use \Core\Form as Form;

class ExtraForm extends Form
{
    protected $requirements = array(
        'name' => array('type' => 'string', 'max_length' => 120),
        'price' => array('type' => 'integer'),
    );
}
