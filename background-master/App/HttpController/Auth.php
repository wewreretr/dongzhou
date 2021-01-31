<?php

namespace App\HttpController;

use EasySwoole\EasySwoole\Config;

class Auth extends \App\HttpCommon\Controller
{
	/**
	 * 管理员列表
	 * @return bool
	 */
	public function auth(): bool
	{
		$request = $this->request();
		$page = $request->getRequestParam('page');
		$data = \App\HttpModel\Auth::getInstance()->getList(false, 'id,uname,nickname,role_id,logined_at,created_at,status,deleted,photo', $page);
		$roleIds = empty($data['list']) ? [] : array_values(array_unique(array_filter(array_column($data['list'], 'role_id'))));
		$tmp = \App\HttpModel\Role::getInstance()->getList(['id', $roleIds, 'IN'], 'id,name');
		$roles = [];
		if (!empty($tmp)) {
			foreach ($tmp as $role) {
				$roles[$role['id']] = $role['name'];
			}
		}
		$data['roles'] = $roles;
		return $this->output('operate_success', $data);
	}

	/**
	 * 添加管理员
	 * @return bool
	 */
	public function authAdd(): bool
	{
		// todo ...
		return $this->output("operate_success");
	}

	/**
	 * 禁用管理员
	 * @return bool
	 */
	public function authDeny(): bool
	{
		$config = new \EasySwoole\VerifyCode\Conf(['backColor' => [243, 243, 243]]);
		$code = new \EasySwoole\VerifyCode\VerifyCode($config);
		$drawCode = $code->DrawCode();
		$image = $drawCode->getImageBase64();
		$key = Config::getInstance()->getConf('KEY');
		$token = md5($key . strtoupper($drawCode->getImageCode()) . $key);
		return $this->output("operate_success", ['image' => $image, 'token' => $token]);
	}

	/**
	 * 角色清单
	 */
	public function role(): bool
	{
		$request = $this->request();
		$page = $request->getRequestParam('page');
		$data = \App\HttpModel\Role::getInstance()->getList(false, '', $page);
		return $this->output('operate_success', $data);
	}

}