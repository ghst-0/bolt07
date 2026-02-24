import BN from 'bn.js';

import constants from './constants.json' with { type: 'json' };
import { rawChanId } from './raw_chan_id.js';

const {decBase} = constants;
/** Channel id in numeric format

  {
    [channel]: <Channel Components String>
    [id]: <Channel Id Hex String>
  }

  @throws
  <ExpectedChannelIdOrComponentsToConvertToNumber Error>

  @returns
  {
    number: <Channel Id Number String>
  }
*/
const chanNumber = ({channel, id}) => {
  if (!channel && !id) {
    throw new Error('ExpectedChannelIdOrComponentsToConvertToNumber');
  }

  const rawId = id || rawChanId({channel}).id;

  return {number: new BN(Buffer.from(rawId, 'hex')).toString(decBase)};
};

export { chanNumber }
