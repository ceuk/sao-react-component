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
  actions () {
    return [
      {
        type: 'add',
        files: '**'
      },
      {
        type: 'move',
        patterns: {
          'COMPONENT_NAME/module.scss': `COMPONENT_NAME/${this.answers.name}.module.scss`,
          COMPONENT_NAME: this.answers.name
        }
      }
    ]
  },
  async completed () {
    const oldPath = path.join(process.cwd(), this.answers.name)
    const newPath = path.join(process.cwd(), this.answers.location, this.answers.name)
    fs.rename(oldPath, newPath, err => {
      if (err) console.error(err)
    })
  }
}
