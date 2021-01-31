<?php

namespace App\HttpModel;

use EasySwoole\Redis\Exception\RedisException;

class Role extends \App\HttpCommon\Model
{

	protected $tableName = 'admin_role';

	/**
	 * 缓存角色所属权限
	 * @param int $id
	 * @return bool
	 */
	public function cacheRules(int $id): bool
	{
		$redis = \EasySwoole\RedisPool\Redis::defer('redis');
		if ($redis->exists('role_' . $id)) {
			//return false;
		}
		$role = $this->getOne($id, 'rules');
		$ruleIds = empty($role) ? [] : explode(',', $role['rules']);
		foreach ($ruleIds as $k => $v) {
			$ruleIds[$k] = intval($v);
		}
		if ($id == 1) { // 超管
			$rules = Rule::getInstance()->getList(['status', 1], 'id,pid,name,node');
		} else { // 普通
			$rules = Rule::getInstance()->getList([['id', $ruleIds, 'IN'], ['status', 1]], 'id,pid,name,node');
		}
		try {
			$redis->set('role_' . $id, json_encode($rules, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE), 7200);
		} catch (RedisException $e) {
			var_dump($e);
			return false;
		}
		return true;
	}

	/**
	 * 构建树形数据
	 * @param array  $list
	 * @param int    $pid
	 * @param string $keyField
	 * @return array
	 */
	private static function buildTree(array $list, int $pid = 0, string $keyField = 'id'): array
	{
		$result = [];
		foreach ($list as $v) {
			if ($v['pid'] == $pid) {
				$items = self::buildTree($list, $v['id'], $keyField);
				if (!empty($items)) {
					$v['items'] = $items;
				}
				$key = $v[$keyField];
				$result[$key] = $v;
			}
		}
		return $result;
	}

	/**
	 * 获取结构化的菜单
	 * @param int $roleIds
	 * @return array
	 */
	public function getMenu(int ...$roleIds): array
	{
		// 获取权限清单
		$redis = \EasySwoole\RedisPool\Redis::defer('redis');

		if (in_array(1, $roleIds)) {
			$rules = json_decode($redis->get('role_1'), true);
		} else {
			$rules = [];
			foreach ($roleIds as $id) {
				$rules = array_merge($rules, json_decode($redis->get('role_' . $id), true));
			}
		}
		if (empty($rules)) {
			return [];
		}
		return self::buildTree($rules, 0, 'node');
	}

}
