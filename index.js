const { Plugin } = require('powercord/entities');
const { get } = require('powercord/http');

module.exports = class Status extends Plugin {
  startPlugin () {
    this.registerCommand(
      'status',
      [],
      'Returns discord status from status.discordapp.com',
      '{c}',
      this.status.bind()
    );
  }

  async status () {
    const data = await get('https://srhpyqt94yxb.statuspage.io/api/v2/summary.json');
    const response = data.body;
    const { status } = response;
    return {
      send: false,
      result: status
    };
  }
};
