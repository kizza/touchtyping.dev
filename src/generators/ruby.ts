import { ingredients, oneOf } from "./util";

const functionName = (verbNoun: string) =>
  verbNoun.replace(/ /g, "_").toLowerCase();

const variableName = functionName;

const expression = (
  var1: string,
  function1: string,
  arg1: string,
  arg2: string
) =>
  oneOf([
    `${var1} = ${function1} ${arg1}, ${arg2}`,
    `${var1} = ${arg1}.${function1} ${arg2}`,
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
  } = ingredients(functionName, variableName, variableName, variableName);

  const returns = [
    `${function4} ${var2}`,
    `${function4} ${var2}`,
    `${function4} ${var2}`,
    `${var2} if ${function4}(${var2})`,
  ];

  return (
    [
      `def ${function1} (${arg1}, ${oneOf(["", "*", "**"])}${arg2})`,
      expression(var2, function2, var1, arg2),
      `${var1} = ${function3} ${arg1}`,
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
  } = ingredients(functionName, variableName, variableName, variableName);

  const returns = [
    `return ${function4} ${var2}, ${var3}`,
    `return ${function4} ${var2} || ${var3}`,
    `return ${var2} if ${function4}`,
  ];

  return (
    [
      `def ${function1} (${arg1}, ${arg2})`,
      `${var1} = ${function2} ${arg1}`,
      `${var2}, ${var3} = ${function3} ${var1}, ${arg2}`,
      ``,
      oneOf(returns),
      `end`,
    ].join("\n") + "\n"
  );
};
