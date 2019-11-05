const Pusher = require('pusher');

const channels_client = new Pusher({
    appId: '894091',
    key: 'a18db759af1623ba4ed2',
    secret: '114b9abff9702954c63a',
    cluster: 'eu',
    encrypted: true
});

module.exports = channels_client;
git pu
