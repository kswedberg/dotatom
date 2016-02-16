"use babel"

import LinterEsprimaProvider from './linter-annotations-provider'

module.exports = {

  config: {
    error: {
      title: 'Error keys',
      description: 'List of keys divided by ","',
      type: 'array',
      default: ['FIXME'],
      items: {
        type: 'string'
      }
    },
    warning: {
      title: 'Warning keys',
      description: 'List of keys divided by ","',
      type: 'array',
      default: ['TODO'],
      items: {
        type: 'string'
      }
    },
    info: {
      title: 'Info keys',
      description: 'List of keys divided by ","',
      type: 'array',
      default: ['NOTE'],
      items: {
        type: 'string'
      }
    }
  },


  activate() {
    if (atom.inDevMode()) {
      console.log('activate linter-annotations')
    }
    require('atom-package-deps').install('linter-annotations')
  },

  provideLinter() { return LinterEsprimaProvider }
}
