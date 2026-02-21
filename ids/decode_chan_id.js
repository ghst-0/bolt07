import constants from './constants.json' with { type: 'json' };
import componentsFromBuffer from './components_from_buffer.js';
import rawChanId from './raw_chan_id.js';

const {
  decBase,
  chanDelimiter,
  blockIndexByteLen,
  blockIndexOffset,
  heightByteLen,
  heightByteOffset,
  outputIndexByteLen
} = constants;
const heightBytesUsed = heightByteLen - heightByteOffset;
const indexBytesUsed = blockIndexByteLen - blockIndexOffset;

/** Decode a short channel id into components

  {
    [channel]: <Channel Components String>
    [id]: <Channel Id Hex String>
    [number]: <Channel Id Number Format String>
  }

  @throws
  <ExpectedShortChannelIdToDecode Error>
  <UnexpectedErrorDecodingChannelIdNumber Error>
  <UnexpectedLengthOfShortChannelId Error>

  @returns
  {
    block_height: <Channel Funding Transaction Inclusion Block Height Number>
    block_index: <Channel Funding Transaction Inclusion Block Position Number>
    output_index: <Channel Funding Transaction Output Index Number>
  }
*/
export default ({channel, id, number}) => {
  // Exit early when there is no need to decode components from a buffer
  if (channel) {
    const [height, blockIndex, outputindex] = channel.split(chanDelimiter);

    return {
      block_height: parseInt(height, decBase),
      block_index: parseInt(blockIndex, decBase),
      output_index: parseInt(outputindex, decBase),
    };
  }

  if (!id && !number) {
    throw new Error('ExpectedShortChannelIdToDecode');
  }

  const idLen = heightBytesUsed + indexBytesUsed + outputIndexByteLen;

  if (id && Buffer.from(id, 'hex').length !== idLen) {
    throw new Error('UnexpectedLengthOfShortChannelId');
  }

  const channelId = id ? id : rawChanId({ number }).id;

  const chan = componentsFromBuffer({id: Buffer.from(channelId, 'hex')});

  return {
    block_height: chan.block_height,
    block_index: chan.block_index,
    output_index: chan.output_index,
  };
};
