<?php

namespace App\HttpCommon;

use EasySwoole\Jwt\Exception;
use EasySwoole\Jwt\Jwt;
use EasySwoole\EasySwoole\Config;

class Controller extends \EasySwoole\Http\AbstractInterface\Controller
{

	// 当前登录用户
	protected $user = [];

	// 可略过token校验的路由列表
	private $ignoreRoutes = ['/index/login', '/index/logout', '/index/vcode'];

	/**
	 * 认证
	 * @param string|null $action
	 * @return bool|null
	 */
	protected function onRequest(?string $action): ?bool
	{
		// 忽略校验的路由
		$route = $this->request()->getUri()->getPath();
		if (in_array($route, $this->ignoreRoutes)) return true;

		// 开始校验token
		$authorization = $this->request()->getHeader('authorization');
		$token = !empty($authorization[0]) ? str_replace('Bearer ', '', $authorization[0]) : '';
		try {
			$key = Config::getInstance()->getConf('KEY');
			$jwt = Jwt::getInstance()->setSecretKey($key)->decode($token);
			$status = $jwt->getStatus();
			switch ($status) {
				case  1:
					$user = $jwt->getData();
					if (empty($user['id']) || $user['id'] < 1) return false;
					$this->user = $user;
					break;
				case  -1:
					return $this->output('token_wrong');
				case  -2:
					return $this->output('token_expired');
			}
		} catch (Exception $e) {
			return $this->output('token_wrong');
		}
		return true;
	}

	/**
	 * 获取请求结果状态信息
	 * @param string $text
	 * @param array  $data
	 * @param string $lang
	 * @return bool
	 */
	protected function output(string $text, array $data = [], string $lang = 'cn'): bool
	{
		$status = Config::getInstance()->getConf('STATUS.' . $text);
		$debug = Config::getInstance()->getConf('DEBUG');
		$code = empty($status['code']) ? '0' : $status['code'];
		$text = empty($status[$lang]) ? '' : $status[$lang];
		if (!$this->response()->isEndResponse()) {
			$result = ['code' => $code, 'data' => $data, 'msg' => $text, 'debug' => $debug];
			$this->response()->write(json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
			$this->response()->withHeader('Content-type', 'application/json;charset=utf-8');
			$this->response()->withStatus(200);
		}
		return false;
	}

}