import fs from 'fs'
import path from 'path'
import { expect } from 'chai'
import postcss from 'postcss'
import cssmin from 'cssmin'

const readActual = name => {
  return cssmin(fs.readFileSync(path.join(__dirname, 'actual', name), 'utf-8'))
}

const readExpect = name => {
  return cssmin(fs.readFileSync(path.join(__dirname, 'expect', name), 'utf-8'))
}


fs
  .readdirSync(path.join(__dirname, 'actual'))
  .map(file => {
  it(path.basename(file, '.scss'), () => {
    expect(readExpect(file))
      .to
      .equal(readActual(file))
  })
})

