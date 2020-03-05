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
    const { body } = await get('https://srhpyqt94yxb.statuspage.io/api/v2/summary.json');
    const capitalize = (text) => text[0].toUpperCase() + text.slice(1);

    return {
      send: false,
      result: {
        type: 'rich',
        title: body.status.description,
        description: '[Discord Status](https://status.discordapp.com)',
        fields: body.components.map(component => ({
          name: component.name,
          value: capitalize(component.status),
          inline: true
        }))
      }
    };
  }
};
