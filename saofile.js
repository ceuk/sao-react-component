const path = require('path')
const fs = require('fs')

module.exports = {
  prompts () {
    return [
      {
        name: 'name',
        message: 'Component name',
        filter: val => val.replace(' ', '')
      },
      {
        name: 'location',
        message: 'Where should this component be created',
        default: 'src/components',
        store: true
      }
    ]
  },
  actions: [
    {
      type: 'move',
      patterns: {
        'index.js': 'index.js',
        'module.scss': `${this.answers.name}.module.scss`
      }
    }
  ],
  async completed () {
    const oldPath = path.join(__dirname, this.answers.name)
    const newPath = path.join(__dirname, this.answers.location, this.answers.name)
    fs.rename(oldPath, newPath)
  }
}
