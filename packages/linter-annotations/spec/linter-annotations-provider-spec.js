"use babel"

import Provider from '../lib/linter-annotations-provider'

describe('Provider', () => {

  beforeEach(() => {
    waitsForPromise(() => atom.packages.activatePackage('linter-annotations'))
    waitsForPromise(() => atom.packages.activatePackage('language-javascript'))
    waitsForPromise(() => atom.packages.activatePackage('language-ruby'))
  })

  describe('capitalize()', () => {
    it('Should capitalize string', () => {
      expect(Provider.capitalize('fOO')).toEqual('Foo')
    })
  })

  describe('trim()', () => {
    it('Should trim string', () => {
      expect(Provider.trim('    foo    ')).toEqual('foo')
    })
  })

  describe('trimCommentEnd()', () => {
    it('Should strip comment endings', () => {
      expect(Provider.trimCommentEnd('/* test */')).toEqual('/* test')
      expect(Provider.trimCommentEnd('<%# test %>')).toEqual('<%# test')
    })
  })

  describe('lint()', () => {
    it('should retuns 5 messages in `fixture.js`', () => {
      waitsForPromise(() => {
        return atom.workspace.open('./files/fixture.js')
          .then(editor => Provider.lint(editor))
          .then(messages => {
            expect(messages.length).toEqual(7)

            const errors = messages.filter(message => message.type === 'Error')
            expect(errors.length).toEqual(1)
            expect(errors[0].range).toEqual([[5, 3], [5, 38]])
            expect(errors[0].text).toEqual('FIXME: Something that has to be done')

            const warnings = messages.filter(message => message.type === 'Warning')
            expect(warnings.length).toEqual(5)
            expect(warnings[0].range).toEqual([[6, 3], [6, 37]])
            expect(warnings[0].text).toEqual('TODO: Something that should be done')

            expect(warnings[1].range).toEqual([[7, 3], [7, 38]])
            expect(warnings[1].text).toEqual('TODO: Something that should be done')

            expect(warnings[2].range).toEqual([[8, 3], [8, 39]])
            expect(warnings[2].text).toEqual('TODO: Something that should be done')

            expect(warnings[3].range).toEqual([[9, 3], [9, 38]])
            expect(warnings[3].text).toEqual('TODO: Something that should be done')

            expect(warnings[4].range).toEqual([[10, 3], [10, 7]])
            expect(warnings[4].text).toEqual('TODO')

            const infos = messages.filter(message => message.type === 'Info')
            expect(infos.length).toEqual(1)
            expect(infos[0].range).toEqual([[4, 3], [4, 30]])
            expect(infos[0].text).toEqual('NOTE: Something good to know')
          })
      })
    })

    it('should retuns 1 messages in `fixture.erb`', () => {
      waitsForPromise(() => {
        return atom.workspace.open('./files/fixture.erb')
          .then(editor => Provider.lint(editor))
          .then(messages => {
            expect(messages.length).toEqual(1)

            const warnings = messages.filter(message => message.type === 'Warning')
            expect(warnings.length).toEqual(1)
            expect(warnings[0].range).toEqual([[1, 4], [1, 22]])
            expect(warnings[0].text).toEqual('TODO: Do somehting')
          })
      })
    })
  })
})
