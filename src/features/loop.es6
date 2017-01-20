import postcss from 'postcss'

export default postcss.plugin('postcss-salad-css2scss-loop', () => {
  return root => {
    root.walkAtRules(/for|each/, rule => {
      const variable = rule.params.split(' ')[0]
      const varReg = new RegExp(`\\\$\\\(${variable.slice(1)}\\\)`, 'g')

      rule.walkRules(rule => {
        rule.selector = rule.selector.replace(variable, `#{${variable}}`)

        rule.walkDecls(decl => {
          decl.value = decl.value.replace(varReg, `${variable}`)
        })
      })
    })
  }
})
