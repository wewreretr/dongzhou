<?php

namespace App\HttpController;

use App\HttpCommon\Controller;

class Home extends Controller
{

	/**
	 * 首页
	 * @return bool
	 */
	public function index(): bool
	{

		return $this->output('operate_success');
	}

	/**
	 * 获取当前用户角色的菜单
	 * @return bool
	 */
	public function menu(): bool
	{
		$roleId = $this->user['role_id'];
		$role = \App\HttpModel\Role::getInstance()->getOne($roleId, 'pid');
		if (empty($role)) {
			return $this->output('operate_success');
		}
		$menus = \App\HttpModel\Role::getInstance()->getMenu($roleId, $role['pid']);
		return $this->output('operate_success', $menus);
	}

	/**
	 * 获取消息清单
	 * @return bool
	 */
	public function message(): bool
	{
		$roleId = $this->user['role_id'];
		$menus = [];//\App\HttpModel\Message::getInstance()->getMenus($roleId);
		return $this->output('operate_success', $menus);
	}
}