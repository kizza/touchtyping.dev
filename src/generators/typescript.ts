import faker from "faker";
import { pascalize, camelize, oneOf } from "./util";

const functionName = () =>
  camelize(faker.fake("{{hacker.verb}} {{hacker.noun}}"));

const variableName = () => camelize(faker.hacker.noun());

const typeName = (): string => {
  const noun = faker.hacker.noun();
  const ignore = ["array"];
  const type1 = ignore.includes(noun) ? typeName() : pascalize(noun);
  const type2 = pascalize(faker.hacker.noun());
  return oneOf([`${type1}<${type2}>`, type2]);
};

const expression = (var1: string, arg1: string, arg2: string) =>
  oneOf([
    `const ${var1} = ${functionName()}(${arg1}, ${arg2})`,
    `const ${var1} = ${arg1}.${functionName()}(${arg2})`,
  ]);

const ingredients = () => ({
  type1: typeName(),
  type2: typeName(),
  arg1: camelize(faker.hacker.noun()),
  arg2: camelize(faker.hacker.noun()),
  var1: variableName(),
  var2: variableName(),
  var3: variableName(),
});

export const buildBasicFunction = () => {
  const { type1, type2, arg1, arg2, var1, var2 } = ingredients();

  const returns = [
    `return ${functionName()}(${var2})`,
    `return ${functionName()}(${var2})`,
    `return ${functionName()}(${var2})`,
    `return ${functionName()}(${var2}) || ${oneOf(["true", "false"])}`,
    `return ${var2} && ${functionName()}(${var2})`,
  ];

  return (
    [
      `const ${functionName()} = (${arg1}: ${type1}, ${arg2}: ${type2}) => {`,
      `const ${var1} = ${functionName()}(${arg1})`,
      expression(var2, var1, arg2),
      ``,
      oneOf(returns),
      `}`,
    ].join("\n") + "\n"
  );
};

export const buildBasicFunction2 = () => {
  const { type1, type2, arg1, arg2, var1, var2, var3 } = ingredients();

  const returns = [
    `return ${functionName()}(${var2}, ${var3})`,
    `return ${functionName()}(${var2}) || ${var3}`,
    `return ${var2} ? ${functionName()}() || ${var3}`,
  ];

  const destructured = [
    `const { ${var2}, ${var3} } = ${functionName()}(${var1}, ${arg2})`,
    `const [ ${var2}, ${var3} ] = ${functionName()}(${var1}, ${arg2})`,
  ];

  return (
    [
      `const ${functionName()} = (${arg1}: ${type1}, ${arg2}: ${type2}) => {`,
      `const ${var1} = ${functionName()}(${arg1})`,
      oneOf(destructured),
      ``,
      oneOf(returns),
      `}`,
    ].join("\n") + "\n"
  );
};
