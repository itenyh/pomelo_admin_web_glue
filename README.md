# pomelo_admin_web_glue
pomelo 2.2.0 更新了内部协议，rpc, admin协议均切换为mqtt。pomelo_admin_web已经不能和pomelo后端连接。这里为pomelo_admin_web增加了一个中间件，用以桥接mqtt协议的通信。 

主要改变有：
1. adminweb（原pomelo_admin_web），socket.io升级（0.8.7 => 2.1.2）
2. 加入了中间件middleadmin，以兼容pomelo后端mqtt协议

## Installation

    $ npm install
	
## Start
    $ node app.js
	
## Configuration 
    /config.json
   
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
	
# Others
    1. 需要在Linux下运行
	2. Linux需要安装sysstat模块
	3. pomelo后端需要在app.js中打开系统监控模块：
	   app.configure('production|development', function () {
	       app.enable('systemMonitor');
	   });