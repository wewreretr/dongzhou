<?php

return [
	'STATUS' => [
		'operate_success' => [
			'code' => 200,
			'cn' => '操作成功',
		],
		'token_wrong' => [
			'code' => 201,
			'cn' => 'Token无效,需要重新登录',
		],
		'token_expired' => [
			'code' => 202,
			'cn' => 'Token已过期,需要重新登录',
		],
		'login_success' => [
			'code' => 200,
			'cn' => '登录成功',
		],
		'login_error' => [
			'code' => 203,
			'cn' => '用户不存在，或密码错误',
		],
		'vcode_wrong' => [
			'code' => 204,
			'cn' => '验证码错误',
		],
	],

];