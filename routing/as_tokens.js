const mtokensPerToken = BigInt(1e3);

/** Get millitokens as tokens

  {
    mtokens: <Millitokens BigInt>
  }

  @returns
  {
    tokens: <Tokens Number>
  }
*/
const asTokens = ({mtokens}) => {
  const tokens = Number(mtokens / mtokensPerToken);

  return {tokens};
};

export { asTokens }

