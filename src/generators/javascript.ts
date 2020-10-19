import faker from "faker";
import { camelize, oneOf } from "./util";

const functionName = () =>
  camelize(faker.fake("{{hacker.verb}} {{hacker.noun}}"));

const variableName = () => camelize(faker.hacker.noun());

const expression = (var1: string, arg1: string, arg2: string) =>
  oneOf([
    `const ${var1} = ${functionName()}(${arg1}, ${arg2})`,
    `const ${var1} = ${arg1}.${functionName()}(${arg2})`,
  ]);

const returnFunction = (variable: string) =>
  oneOf([`return ${functionName()}(${variable})`]);
// oneOf([`return ${functionName()}(${variable})`, `return ${variable}`]);

const ingredients = () => ({
  arg1: camelize(faker.hacker.noun()),
  arg2: camelize(faker.hacker.noun()),
  var1: variableName(),
  var2: variableName(),
  var3: variableName(),
});

export const buildBasicFunction = () => {
  const { arg1, arg2, var1, var2 } = ingredients();

  const returns = [
    `return ${functionName()}(${var2})`,
    `return ${functionName()}(${var2})`,
    `return ${functionName()}(${var2})`,
    `return ${functionName()}(${var2}) || ${oneOf(["true", "false"])}`,
    `return ${var2} && ${functionName()}(${var2})`,
  ];

  return (
    [
      `function ${functionName()} (${arg1}, ${arg2}) {`,
      `const ${var1} = ${functionName()}(${arg1})`,
      expression(var2, var1, arg2),
      ``,
      oneOf(returns),
      `}`,
    ].join("\n") + "\n"
  );
};
