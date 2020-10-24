import { functionName, variableName } from "./typescript";
import { ingredients, oneOf } from "./util";

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
    function3,
    function4,
    arg1,
    arg2,
    var1,
    var2,
  } = ingredients(functionName, variableName, variableName, variableName);

  const returns = [
    `return ${function4}(${var2})`,
    `return ${function4}(${var2})`,
    `return ${function4}(${var2})`,
    `return ${function4}(${var2}) || ${oneOf(["true", "false"])}`,
    `return ${var2} && ${function4}(${var2})`,
  ];

  return (
    [
      `function ${function1}(${arg1}, ${arg2}) {`,
      `const ${var1} = ${function2}(${arg1})`,
      expression(var2, function3, var1, arg2),
      ``,
      oneOf(returns),
      `}`,
    ].join("\n") + "\n"
  );
};
