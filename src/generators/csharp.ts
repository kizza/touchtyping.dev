import { camelize, ingredients, oneOf, pascalize } from "./util";

const publicOrPrivate = () => oneOf(["public", "private"]);

const functionName = (verbNoun: string) => pascalize(verbNoun);

const variableName = (noun: string) => camelize(noun);

const typeName = (noun: string, subtype: string): string =>
  oneOf([
    `IEnumerable<${pascalize(subtype)}>`,
    `I${pascalize(noun)}<${pascalize(subtype)}>`,
    `${pascalize(noun)}<${pascalize(subtype)}>`,
    pascalize(noun),
    pascalize(noun),
  ]);

export const buildBasicFunction = () => {
  const {
    function1,
    function2,
    function3,
    function4,
    type1,
    type2,
    type3,
    arg1,
    arg2,
    var1,
    var2,
  } = ingredients(functionName, variableName, variableName, typeName);

  return (
    [
      `${publicOrPrivate()} ${type1} ${function1} (${type2} ${arg1}, ${type3} ${arg2})`,
      `{`,
      `var ${var1} = ${function2}(${arg1});`,
      `var ${var2} = ${function3}(${var1}, ${arg2});`,
      ``,
      `return ${function4}(${var2});`,
      `}`,
    ].join("\n") + "\n"
  );
};
