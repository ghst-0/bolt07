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
export default ({mtokens}) => {
  const tokens = Number(mtokens / mtokensPerToken);

  return {tokens};
};
