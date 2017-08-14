const konstructor = require('konstructor');

module.exports = class endpoint extends konstructor.endpoint {
  async handler() {
    const data = {};
    data.versions = process.versions;
    return this.view(data);
  }

  async view(input) {
    const data = {};
    data.node = input.versions.node;
    data.v8 = input.versions.v8;
    return this.render(data);
  }
};
