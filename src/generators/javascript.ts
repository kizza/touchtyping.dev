import faker from "faker";
import { camelize } from "./util";

export const buildBasicFunction = () => {
  const functionName = () =>
    camelize(faker.fake("{{hacker.verb}} {{hacker.noun}}"));
  const variableName = () => camelize(faker.hacker.noun());

  const arg1 = camelize(faker.hacker.noun());
  const arg2 = camelize(faker.hacker.noun());
  const var1 = variableName();
  const var2 = variableName();
  return (
    [
      `function ${functionName()} (${arg1}, ${arg2}) {`,
      `const ${var1} = ${functionName()}(${arg1})`,
      `const ${var2} = ${functionName()}(${var1}, ${arg2})`,
      ``,
      `return ${functionName()}(${var2})`,
      `}`,
    ].join("\n") + "\n"
  );
};
