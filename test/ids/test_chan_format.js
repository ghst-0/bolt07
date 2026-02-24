import test from 'node:test';
import { deepStrictEqual, throws } from 'node:assert/strict';

import { chanFormat } from '../../ids/chan_format.js';

const tests = [
  {
    args: {id: '15fbe70000260000'},
    description: 'Standard testnet channel id',
    expected: {channel: '1440743x38x0'},
  },
  {
    args: {number: '1584113681139367936'},
    description: 'Standard testnet channel',
    expected: {channel: '1440743x38x0'},
  },
  {
    args: {id: '0832300008200001'},
    description: 'Standard bitcoin channel id',
    expected: {channel: '537136x2080x1'},
  },
  {
    args: {number: '590587277833404417'},
    description: 'Standard bitcoin channel',
    expected: {channel: '537136x2080x1'},
  },
  {
    args: {number: '17592186044416000010'},
    description: 'SCID alias type id',
    expected: {channel: '16000000x0x10'},
  },
  {
    args: {},
    description: 'An id or number is required',
    error: 'ExpectedIdOrNumberToFormatAsChannelComponents',
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => chanFormat(args), new Error(error), 'Got expected error');

      return end();
    }

    const {channel} = chanFormat(args);

    deepStrictEqual(channel, expected.channel, 'Channel formatted returned');

    return end();
  });
}
