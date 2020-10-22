import faker from "faker";
import { buildBasicFunction as buildBasicCSharpFunction } from "./csharp";
import { buildBasicFunction as buildBasicJavascriptFunction } from "./javascript";
import {
  buildBasicFunction as buildBasicRubyFunction,
  buildBasicFunction2 as buildBasicRubyFunction2,
} from "./ruby";
import {
  buildBasicFunction as buildBasicTypescriptFunction,
  buildBasicFunction2 as buildBasicTypescriptFunction2,
} from "./typescript";
import { oneOf } from "./util";
import { Settings } from "../hooks/useSettings";

const buildRandomPhrase = () => faker.fake("{{hacker.phrase}}\n");

export const buildRandomFunction = (settings: Settings) => {
  const builders = [
    oneOf([true, false, false]) === true && buildRandomPhrase,
    settings.Typescript && buildBasicTypescriptFunction,
    settings.Typescript && buildBasicTypescriptFunction2,
    settings.Javascript && buildBasicJavascriptFunction,
    settings.Ruby && buildBasicRubyFunction,
    settings.Ruby && buildBasicRubyFunction2,
    settings.CSharp && buildBasicCSharpFunction,
  ].filter(Boolean);

  const builder = oneOf(builders) || buildRandomPhrase;
  return builder();
};
