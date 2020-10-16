interface Tokeniser<T> {
  current: T[];
  tokens: T[][];
}

const pushAToken = <T>({ tokens, current }: Tokeniser<T>): Tokeniser<T> => ({
  current: [],
  tokens: [...tokens, current],
});

export type TokeniserPredicate = (element: any) => boolean;

export default <T>(
  elements: T[],
  nextTokenInclusive: TokeniserPredicate,
  nextTokenExclusive: TokeniserPredicate
): T[][] => {
  const tokeniser = elements.reduce(
    (acc, letter) => {
      if (nextTokenExclusive(letter)) {
        const newAcc = pushAToken(acc);
        newAcc.current.push(letter);
        return pushAToken(newAcc);
      } else if (nextTokenInclusive(letter)) {
        acc.current.push(letter);
        return pushAToken(acc);
      } else {
        acc.current.push(letter);
        return acc;
      }
    },
    { current: [], tokens: [] } as Tokeniser<T>
  );

  const finalState =
    tokeniser.current.length > 0 ? pushAToken(tokeniser) : tokeniser;
  return finalState.tokens;
};
