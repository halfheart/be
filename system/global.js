const cfg = require('../cfg/cfg');

const crypto = require('crypto');

exports.v = {

}

exports.f = {
  encrypt: (v) => {
    return crypto.createHmac('sha1', cfg.web.secretKey).update(v).digest('base64');
  }
}
