<?php

namespace App\HttpController;

use EasySwoole\EasySwoole\Config;

class Index extends \App\HttpCommon\Controller
{
	/**
	 * 登录
	 * @return bool
	 */
	public function login(): bool
	{
		$request = $this->request();
		$params = $request->getRequestParam('username', 'password', 'vcode', 'token');

		//验证码校验
		$key = Config::getInstance()->getConf('KEY');
		$debug = Config::getInstance()->getConf('DEBUG');
		$vcode = md5($key . strtoupper($params['vcode']) . $key);
		if ($debug && $vcode != $params['token']) {
			return $this->output('vcode_wrong');
		}
		unset($params['vcode'], $params['token']);

		// 账号校验
		$user = \App\HttpModel\Auth::getInstance()->login($params['username'], $params['password']);
		if (!empty($user)) {
			$time = time();
			$id = $user['id'];

			// 登录日志补充&状态变更
			//\App\HttpModel\LoginLog::getInstance()->insert(['uname' => $params['username'], 'status' => 1]);
			\App\HttpModel\Auth::getInstance()->updateField('logined_at', $time, $id);
			// 更新角色权限缓存
			\App\HttpModel\Role::getInstance()->cacheRules($user['role_id']);

			// 获取认证Token
			$jwt = \EasySwoole\Jwt\Jwt::getInstance()->setSecretKey($key)->publish();
			$jwt->setAlg('HMACSHA256');
			$jwt->setExp(time() + 3600);
			$jwt->setData($user);
			$token = $jwt->__toString();

			return $this->output('login_success', ['token' => $token]);
		}
		return $this->output("login_error");
	}

	/**
	 * 登出
	 * @return bool
	 */
	public function logout(): bool
	{
		if (!empty($this->user)) {
			\App\HttpModel\LoginLog::getInstance()->insert(['uname' => $this->user['username'], 'status' => 0]);
		}
		return $this->output("operate_success");
	}

	/**
	 * 验证码生成
	 * @return bool
	 */
	public function vcode(): bool
	{
		$config = new \EasySwoole\VerifyCode\Conf(['backColor' => [243, 243, 243]]);
		$code = new \EasySwoole\VerifyCode\VerifyCode($config);
		$drawCode = $code->DrawCode();
		$image = $drawCode->getImageBase64();
		$key = Config::getInstance()->getConf('KEY');
		$token = md5($key . strtoupper($drawCode->getImageCode()) . $key);
		return $this->output("operate_success", ['image' => $image, 'token' => $token]);
	}
}