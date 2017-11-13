
const midware = require('./middleadmin/server')
midware.start(function (err) {
    const web = require('./adminweb/app')
    web.startServer()
})