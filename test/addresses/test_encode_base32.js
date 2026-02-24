import test from 'node:test';
import { deepStrictEqual, throws } from 'node:assert/strict';

import { encodeBase32 } from '../../addresses/encode_base32.js';

const tests = [
  {
    args: {data: ''},
    description: 'Encode nil data as base32',
    expected: {base32: ''},
  },
  {
    args: {data: '73'},
    description: 'Encode short data as base32',
    expected: {base32: 'om'},
  },
  {
    args: {
      data: 'f2fc2319bd29457ccd01e8e194ee9bd7e97298b6610df4ab0f3d5baa0b2d7ccf69829edb74edef',
    },
    description: 'Encode long data as base32',
    expected: {
      base32: '6l6cggn5ffcxztib5dqzj3u327uxfgfwmeg7jkyphvn2ucznpthwtau63n2o33y',
    },
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => encodeBase32(args), new Error(error), 'Got expected error');
    } else {
      const res = encodeBase32(args);

      deepStrictEqual(res, expected, 'Got expected result');
    }

    return end();
  })
}
