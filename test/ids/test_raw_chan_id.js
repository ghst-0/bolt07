import test from 'node:test';
import { deepStrictEqual, throws } from 'node:assert/strict';

import { rawChanId } from '../../ids/raw_chan_id.js';

const tests = [
  {
    args: {channel: '1440743x38x0'},
    description: 'Standard testnet channel',
    expected: {id: '15fbe70000260000'},
  },
  {
    args: {number: '1584113681139367936'},
    description: 'Standard testnet channel id',
    expected: {id: '15fbe70000260000'},
  },
  {
    args: {channel: '537136x2080x1'},
    description: 'Standard bitcoin channel id',
    expected: {id: '0832300008200001'},
  },
  {
    args: {number: '590587277833404417'},
    description: 'Standard bitcoin channel id',
    expected: {id: '0832300008200001'},
  },
  {
    args: {number: '17592186044416000010'},
    description: 'SCID alias channel id',
    expected: {id: 'f42400000000000a'},
  },
  {
    args: {},
    description: 'Number is required',
    error: 'ExpectedChannelIdInNumericFormat',
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => rawChanId(args), new Error(error), 'Got expected error');

      return end();
    }

    const {id} = rawChanId(args);

    deepStrictEqual(id, expected.id, 'Raw channel id returned');

    return end();
  });
}
