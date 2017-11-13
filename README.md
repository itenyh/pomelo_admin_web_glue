# pomelo_admin

pomelo管理系统：
1. adminweb（原pomelo_admin_web），socket.io升级（0.8.7 => 2.1.2）
2. 加入了中间件middleadmin，以兼容pomelo后端mqtt协议

## Installation

    $ npm install
	
## start
    $ node app.js
	
## config.json

    {
	  "webServerPort": 7001,               //外部访问admin_web的端口

	  "middWarePort": 3020,                //中间件暴露给admin_web访问的端口
	  "middWareAdd": "192.168.1.112",      //中间件所在地址，由于远方前端会调用，请勿用localhost

	  "mqttServerPort": 3005,              //pomelo后端暴露的接口，在pomelo项目config/master.json中配置
	  "mqttServerHost": "192.168.1.9",     //pomelo后端所在地址
  
	  "clientId": 1,                       //用户Id，任意
	  "username": "admin",                 //在pomelo项目config/adminUser.json中配置的用户信息
	  "password": "admin"                   
	}
	