<?php

namespace CoffeeHouse\Forms;

use \Reinhardt\Form as Form;


class BeverageForm extends Form
{
    protected $requirements = array(
        'name' => array('type' => 'string', 'max_length' => 120),
        'price' => array('type' => 'integer'),
        'doubleable' => array('type' => 'boolean')
    );
}
