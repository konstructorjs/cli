const konstructor = require('konstructor');

module.exports = class routes extends konstructor.router {
  routes() {
    this.get('/', 'hello/index');
  }
};
