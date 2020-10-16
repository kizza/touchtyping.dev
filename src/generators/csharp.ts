import faker from "faker";
import { pascalize, camelize } from "./util";

export const buildBasicFunction = () => {
  const functionName = () =>
    pascalize(faker.fake("{{hacker.verb}} {{hacker.noun}}"));
  const variableName = () => camelize(faker.hacker.noun());

  const type1 = pascalize(faker.hacker.noun());
  const type2 = pascalize(faker.hacker.noun());
  const type3 = pascalize(faker.hacker.noun());
  const arg1 = camelize(faker.hacker.noun());
  const arg2 = camelize(faker.hacker.noun());
  const var1 = variableName();
  const var2 = variableName();
  return (
    [
      `public ${type1} ${functionName()} (${type2} ${arg1}, ${type3} ${arg2})`,
      `{`,
      `var ${var1} = ${functionName()}(${arg1})`,
      `var ${var2} = ${functionName()}(${var1}, ${arg2})`,
      ``,
      `return ${functionName()}(${var2})`,
      `}`,
    ].join("\n") + "\n"
  );
};
