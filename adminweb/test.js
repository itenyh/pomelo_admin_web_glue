
const a = require('pomelo-admin/lib/client/client')
const client = new a({username:'admin', password:'admin'})
client.connect(1, 'localhost', 3005, function (err, msg) {
    console.log(err)
    client.request('systemInfo', null, function (err, msg) {
        console.log(msg)
    })
})