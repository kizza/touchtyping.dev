import faker from "faker";
import { pascalize, camelize, oneOf } from "./util";

const publicOrPrivate = () => oneOf(["public", "private"]);

const functionName = () =>
  pascalize(faker.fake("{{hacker.verb}} {{hacker.noun}}"));

const variableName = () => camelize(faker.hacker.noun());

const typeName = (): string => {
  const noun = faker.hacker.noun();
  const ignore = ["array"];
  const type = ignore.includes(noun) ? typeName() : pascalize(noun);

  return oneOf([`IEnumerable<${type}>`, `I${type}`, type]);
};

export const buildBasicFunction = () => {
  const type1 = typeName();
  const type2 = typeName();
  const type3 = typeName();
  const arg1 = variableName();
  const arg2 = variableName();
  const var1 = variableName();
  const var2 = variableName();
  return (
    [
      `${publicOrPrivate()} ${type1} ${functionName()} (${type2} ${arg1}, ${type3} ${arg2})`,
      `{`,
      `var ${var1} = ${functionName()}(${arg1});`,
      `var ${var2} = ${functionName()}(${var1}, ${arg2});`,
      ``,
      `return ${functionName()}(${var2});`,
      `}`,
    ].join("\n") + "\n"
  );
};
