import test from 'node:test';
import { throws } from 'node:assert/strict';
import componentsFromBuffer from './../../ids/components_from_buffer.js';

const tests = [
  {
    args: {},
    description: 'A channel id is required',
    error: 'ExpectedChannelIdBuffer',
  },
  {
    args: {id: Buffer.from('00')},
    description: 'A correct length channel id is required',
    error: 'UnexpectedByteCountForShortChannelId',
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => componentsFromBuffer(args), new Error(error), 'Got error');

      return end();
    }

    return end();
  })
}
