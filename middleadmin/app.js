
const AdminClient = require('pomelo-admin/lib/client/client')
const client = new AdminClient({username:'admin', password:'admin'})

client.connect(1, '192.168.1.9', 3005, function (err, msg) {

    client.request('systemInfo', null, function (err, msg) {
        console.log(msg)
    })


})