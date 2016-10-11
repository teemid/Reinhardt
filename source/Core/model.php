<?php

namespace Core;

use \Core\Database as Database;


abstract class Model
{
    protected static $table_name;
    protected static $sql_select_all;
    protected static $sql_select_by_id;
    protected static $sql_filter;

    public function __toString() {
        return static::$class_name;
    }

    public static function get_class_name() {
        return static::$class_name;
    }

    public static function all() {
        $db = new Database();

        return $db->fetch_class(static::$sql_select_all, get_called_class());
    }

    public static function get($args) {
        $db = new Database();

        return $db->fetch_class(static::$sql_select_by_id, get_called_class(), $args);
    }

    public static function create($values) {
        $db = new Database();

        $db->query(static::$sql_create, get_called_class(), $values);

        $id = $db->lastInsertedId();

        return $id;
    }

    public static function delete($args) {
        $db = new Database();

        $db->query(static::$sql_delete, $args);
    }
}
