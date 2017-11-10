
const midware = require('./middleadmin/server')
midware.start(function (err) {
    const web = require('./pomelo-admin-web/app')
    web.startServer()
})