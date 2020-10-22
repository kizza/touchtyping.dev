import faker from "faker";
import { pascalize, camelize, oneOf } from "./util";

const functionName = () =>
  faker.fake("{{hacker.verb}}_{{hacker.noun}}").toLowerCase();

const variableName = () => camelize(faker.hacker.noun());

// const typeName = (): string => {
//   const noun = faker.hacker.noun();
//   const ignore = ["array"];
//   // const type1 = ignore.includes(noun) ? typeName() : pascalize(noun);
//   // const type2 = pascalize(faker.hacker.noun());
//   return oneOf([`${type1}<${type2}>`, type2]);
// };

const expression = (var1: string, arg1: string, arg2: string) =>
  oneOf([
    `${var1} = ${functionName()} ${arg1}, ${arg2}`,
    `${var1} = ${arg1}.${functionName()} ${arg2}`,
  ]);

const ingredients = () => ({
  // type1: typeName(),
  // type2: typeName(),
  arg1: camelize(faker.hacker.noun()),
  arg2: camelize(faker.hacker.noun()),
  var1: variableName(),
  var2: variableName(),
  var3: variableName(),
});

export const buildBasicFunction = () => {
  const { arg1, arg2, var1, var2 } = ingredients();

  const returns = [
    `${functionName()} ${var2}`,
    `${functionName()} ${var2}`,
    `${functionName()} ${var2}`,
    `${functionName()} ${var2} || ${oneOf(["true", "false"])}`,
    `${var2} if ${functionName()}(${var2})`,
  ];

  return (
    [
      `def ${functionName()} (${arg1}, ${oneOf(["", "*", "**"])}${arg2})`,
      expression(var2, var1, arg2),
      `${var1} = ${functionName()} ${arg1}`,
      ``,
      oneOf(returns),
      `end`,
    ].join("\n") + "\n"
  );
};

export const buildBasicFunction2 = () => {
  const { arg1, arg2, var1, var2, var3 } = ingredients();

  const returns = [
    `return ${functionName()} ${var2}, ${var3}`,
    `return ${functionName()} ${var2} || ${var3}`,
    `return ${var2} if ${functionName()}()`,
  ];

  return (
    [
      `def ${functionName()} (${arg1}, ${arg2})`,
      `${var1} = ${functionName()} ${arg1}`,
      `${var2}, ${var3} = ${functionName()} ${var1}, ${arg2}`,
      ``,
      oneOf(returns),
      `end`,
    ].join("\n") + "\n"
  );
};
