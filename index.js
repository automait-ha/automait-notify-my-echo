module.exports = init

const Emitter = require('events').EventEmitter
const https = require('https')

function init(callback) {
  callback(null, 'notifyMyEcho', NotifyMyEcho)
}

function NotifyMyEcho(automait, logger, config) {
  Emitter.call(this)
  this.automait = automait
  this.logger = logger
  this.config = config
}

NotifyMyEcho.prototype = Object.create(Emitter.prototype)

NotifyMyEcho.prototype.notify = function (message, callback) {
  const body = JSON.stringify({
    notification: message,
    accessCode: this.config.accessCode
  })
  const options = {
    hostname: 'api.notifymyecho.com',
    path: '/v1/NotifyMe',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(body)
    }
  }
  https.request(options, () => {
    callback()
  }).end(body)
}