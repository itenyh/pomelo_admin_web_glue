'use strict'

const config = require('../config.json')
const middWarePort = config.middWarePort
const mqttServerPort = config.mqttServerPort
const mqttServerHost = config.mqttServerHost
const clientId = config.clientId

var server = require('http').createServer()
var io = require('socket.io')(server);

const Client = require('pomelo-admin/lib/client/client')
const adminClient = new Client({username:config.username, password:config.password})

module.exports.start = (cb) => {

    console.log('正在启动pomelo后台管理服务......')
    console.log('正在连接pomelo服务器......')

    startClientConnection(function (err, msg) {

        if (err) {
            console.error('mqttClient connect failed! \n ' + err)
            return
        }

        console.log('pomelo服务器连接成功！')
        console.log('正在开启桥接服务......')

        startBridger(function (err) {

            console.log('桥接服务启动成功！Port : ' + middWarePort)
            cb(err)

        })

    })

}

function startClientConnection(cb) {

    adminClient.connect(clientId, mqttServerHost, mqttServerPort, function (err, msg) {
        cb(err, msg)
    })

}

function startBridger(cb) {

    server.listen(middWarePort);

    io.on('connection', function (socket) {

        socket.on('register', function (data) {
            socket.emit('register', {code: 1})
        });

        socket.on('client', function (data) {

            const jsonData = JSON.parse(data)
            const moduleId = jsonData['moduleId']
            const body = jsonData['body']
            const reqId = jsonData['reqId']

            adminClient.request(moduleId, body, function (err, msg) {
                console.log(JSON.stringify(msg))
                const result = {respId: reqId, body: msg}
                socket.emit('client', result)
            })

        })

    });

    cb(null)

}