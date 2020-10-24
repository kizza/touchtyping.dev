import { camelize, ingredients, oneOf, pascalize, Formatter } from "./util";

export const functionName = (verbNoun: string) => camelize(verbNoun);

export const variableName = (noun: string) => camelize(noun);

const typeName = (noun: string, subtype: string): string =>
  oneOf([`${pascalize(noun)}<${pascalize(subtype)}>`, pascalize(noun)]);

const expression = (
  var1: string,
  function1: string,
  arg1: string,
  arg2: string
) =>
  oneOf([
    `const ${var1} = ${function1}(${arg1}, ${arg2})`,
    `const ${var1} = ${arg1}.${function1}(${arg2})`,
  ]);

export const buildBasicFunction = () => {
  const {
    function1,
    function2,
    type1,
    type2,
    arg1,
    arg2,
    var1,
    var2,
  } = ingredients(functionName, variableName, variableName, typeName);

  const returns = [
    `return ${function1}(${var2})`,
    `return ${function1}(${var2})`,
    `return ${function1}(${var2})`,
    `return ${function1}(${var2}) || ${oneOf(["true", "false"])}`,
    `return ${var2} && ${function1}(${var2})`,
  ];

  return (
    [
      `const ${function2} = (${arg1}: ${type1}, ${arg2}: ${type2}) => {`,
      `const ${var1} = ${function2}(${arg1})`,
      expression(var2, function1, var1, arg2),
      ``,
      oneOf(returns),
      `}`,
    ].join("\n") + "\n"
  );
};

export const buildBasicFunction2 = () => {
  const {
    function1,
    function2,
    function3,
    type1,
    type2,
    arg1,
    arg2,
    var1,
    var2,
    var3,
  } = ingredients(functionName, variableName, variableName, typeName);

  const returns = [
    `return ${function3}(${var2}, ${var3})`,
    `return ${function3}(${var2}) || ${var3}`,
    `return ${var2} ? ${function3}() : ${var3}`,
  ];

  const destructured = [
    `const { ${var2}, ${var3} } = ${function2}(${var1}, ${arg2})`,
    `const [${var2}, ${var3}] = ${function2}(${var1}, ${arg2})`,
  ];

  return (
    [
      `const ${function1} = (${arg1}: ${type1}, ${arg2}: ${type2}) => {`,
      `const ${var1} = ${function1}(${arg1})`,
      oneOf(destructured),
      ``,
      oneOf(returns),
      `}`,
    ].join("\n") + "\n"
  );
};
