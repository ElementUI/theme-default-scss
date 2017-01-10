import postcss from 'postcss'

import Calc from './features/calc'
import Extend from './features/extend'
import Import from './features/import'
import Loop from './features/loop'
import Mixin from './features/mixin'
import Var from './features/var'

export default postcss.plugin('postcss-salad-css2scss', () => {
  const processor = postcss()

  processor.use(Calc())
  processor.use(Extend())
  processor.use(Import())
  processor.use(Loop())
  processor.use(Mixin())
  processor.use(Var())

  return processor
})
