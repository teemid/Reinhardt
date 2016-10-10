<?php

namespace Core;

use \Core\Database as Database;


class Model
{
    private static $table;
    protected static $class_name = __CLASS__;
    protected static $sql_select_all = "";
    protected static $sql_select_by_id = "";

    public function __toString() {
        return static::$class_name;
    }

    public static function all() {
        $db = new Database();

        return $db->fetch_class(static::$sql_select_all, static::$class_name);
    }

    public static function get($args) {
        $db = new Database();

        return $db->fetch_class(static::$sql_select_by_id, static::$class_name, $args);
    }

    public static function create($values) {
        $db = new Database();
    }
}
