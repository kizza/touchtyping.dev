import {ingredients, oneOf, snakize, pascalize} from "./util";

const maybeSpreadArgument = (argumentName: string) =>
  oneOf(["", "**"]) + argumentName

const argumentName = (verbNoun: string) => snakize(verbNoun)

const cleanedArgumentName = (argumentName: string) => argumentName.replace(/[*:]/g, '')

const variableName = (verbNoun: string) => {
  const name = snakize(verbNoun)
  return oneOf([name, `@${name}`, `${name}`])
}

const functionName = (verbNoun: string) => {
  const name = snakize(verbNoun)
  return oneOf([name, name, name, `${name}?`, name])
}

const expression = (
  var1: string,
  function1: string,
  arg1: string,
  arg2: string,
  verbNoun: string
) =>
  oneOf([
    `${var1} = ${function1}(${arg1}, ${arg2})`,
    `${var1} = ${arg1}.${function1}(${arg2})`,
    `${var1} = ${function1}(${arg1}, "${verbNoun} #{${arg2}}")`,
    `${var1} = ${pascalize(verbNoun)}::${function1}(${arg1}, ${arg2})`,
  ]);

export const buildBasicFunction = () => {
  const {
    function1,
    function2,
    function3,
    function4,
    arg1,
    arg2,
    var1,
    var2,
    verbNoun1,
    verbNoun2,
  } = ingredients(functionName, argumentName, variableName, variableName);

  const unless = oneOf(["if", "unless"])

  const returns = [
    `${function4}(${var2})`,
    `${function4}(${var2})`,
    `${function4}(${var2})`,
    `${var2} ${unless} ${function4}(${var2})`,
  ];

  const functionDecleration = oneOf([
    `def ${function1}(${arg1}, ${maybeSpreadArgument(arg2)})`,
    `def ${function1}(:${arg1}, :${arg2})`,
  ])

  return (
    [
      functionDecleration,
      expression(var1, function2, arg1, cleanedArgumentName(arg2), verbNoun1),
      expression(var2, function3, var1, cleanedArgumentName(arg2), verbNoun2),
      ``,
      oneOf(returns),
      `end`,
    ].join("\n") + "\n"
  );
};

export const buildBasicFunction2 = () => {
  const {
    function1,
    function2,
    function3,
    function4,
    arg1,
    arg2,
    var1,
    var2,
    var3,
  } = ingredients(functionName, argumentName, variableName, variableName);

  const returns = [
    `${function4}(${var2}, ${var3})`,
    `${function4}(${var2} || ${var3})`,
    `${var2} if ${function4}`,
  ];

  return (
    [
      `def ${function1}(${arg1}, ${arg2})`,
      `${var1} = self.${function2}(${arg1})`,
      `${var2} = ${function3}(${var1}, ${var3}[:${arg2}])`,
      ``,
      oneOf(returns),
      `end`,
    ].join("\n") + "\n"
  );
};
