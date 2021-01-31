<?php

namespace App\HttpCommon;

use EasySwoole\EasySwoole\Config;
use EasySwoole\ORM\AbstractModel;
use EasySwoole\ORM\Collection\Collection;
use EasySwoole\ORM\Db\Cursor;
use EasySwoole\ORM\Db\CursorInterface;
use EasySwoole\ORM\Exception\Exception;
use Throwable;

abstract class Model extends AbstractModel
{
	// 实例映射
	private static $instance = [];

	/**
	 * 单例实现
	 * @param mixed ...$args
	 * @return Model|false
	 */
	static function getInstance(...$args)
	{
		// 表前缀
		$prefix = Config::getInstance()->getConf('MYSQL.prefix');
		if (!empty($prefix)) $prefix .= '_';
		// 完整表名
		$name = $prefix . strtolower(str_replace('App\\HttpModel\\', '', static::class));
		if (!isset(self::$instance[$name])) {
			try {
				self::$instance[$name] = new static(...$args);
			} catch (Exception $e) {
				return false;
			}
		}
		return self::$instance[$name];
	}

	/**
	 * 更新的指定字段
	 * @param       $field
	 * @param       $value
	 * @param array $where
	 * @return bool
	 */
	public function updateField($field, $value, $where = []): bool
	{
		try {
			return self::create()->update([$field => $value], $where);
		} catch (\EasySwoole\Mysqli\Exception\Exception | Exception | Throwable $e) {
			return false;
		}
	}

	/**
	 * 新增数据
	 * @param array $data
	 * @return bool|int
	 */
	public function insert($data = [])
	{
		try {
			return self::create($data)->save();
		} catch (Exception | Throwable $e) {
			return false;
		}
	}

	/**
	 * 获取单条记录
	 * @param        $where
	 * @param string $fields
	 * @return Model|array|bool|AbstractModel|Cursor|CursorInterface|null
	 */
	public function getOne($where, string $fields = '')
	{
		if (empty($where)) return false;
		if (!empty($fields) && is_string($fields)) $fields = explode(',', $fields);
		if (empty($fields)) $fields = [];
		try {
			return self::create()->field($fields)->get($where);
		} catch (\EasySwoole\Mysqli\Exception\Exception | Exception | Throwable $e) {
			var_dump($e);
			return false;
		}
	}

	/**
	 * 获取记录列表
	 * @param        $where
	 * @param string $fields
	 * @param int    $page
	 * @param int    $limit
	 * @return array|bool|Collection|Cursor|CursorInterface
	 */
	public function getList($where, string $fields = '', int $page = 0, int $limit = 20)
	{
		if (!empty($fields) && is_string($fields)) $fields = explode(',', $fields);
		if (empty($fields)) $fields = [];
		if (empty($where)) $where = [];
		if (is_int($where)) $where = [$where];
		try {
			$model = self::create()->field($fields);
			// 条件补充
			if (!empty($where)) {
				if (!empty($where[0]) && is_array($where[0])) {
					foreach ($where as $item) {
						$model = $model->where(...$item);
					}
				} else {
					$model = $model->where(...$where);
				}
			}
			if ($page > 0 && $limit > 0) {
				$model = $model->limit($limit * ($page - 1), $limit)->withTotalCount();
				if (count($fields) == 1) {
					$list = $model->column($fields[0]);
				} else {
					$list = $model->all();
				}
				$total = $model->lastQueryResult()->getTotalCount();
				// 获取多列
				return ['total' => $total, 'list' => $list];
			}
			if (count($fields) == 1) {
				return $model->column($fields[0]);
			}
			return $model->all();
		} catch (\EasySwoole\Mysqli\Exception\Exception | Exception | Throwable $e) {
			var_dump($e);
			return false;
		}
	}
}