<?php

namespace Core


class Template
{
    private $template_path;
    private $template_name;

    public function __construct($template_name)
    {
        $this->template_name = $template_name;
    }

    public function render($context)
    {
        $file_path = $this->template_path.$this->template_name;

        if (file_exists($file_path))
        {
            include($file_path);
        }
    }
}
