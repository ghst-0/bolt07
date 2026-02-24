import test from 'node:test';
import { deepStrictEqual, throws } from 'node:assert/strict';

import { decodeSocket } from '../../addresses/decode_socket.js';

const tests = [
  {
    args: {},
    description: 'A socket is expected',
    error: 'ExpectedSocketDataToDecodeSocket',
  },
  {
    args: {ip4: true, ip6: true},
    description: 'A single socket is expected',
    error: 'ExpectedOnlyOneSocketTypeToDecode',
  },
  {
    args: {ip4: '00'},
    description: 'A socket requires sufficient bytes',
    error: 'ExpectedSocketDataWithPortToDecodeSocket',
  },
  {
    args: {ip4: '000000'},
    description: 'Ip4 requires sufficient bytes',
    error: 'UnexpectedLengthForIpV4SocketData',
  },
  {
    args: {ip6: '000000'},
    description: 'Ip6 requires sufficient bytes',
    error: 'UnexpectedLengthForIpV6SocketData',
  },
  {
    args: {tor3: '000000'},
    description: 'Tor3 requires sufficient bytes',
    error: 'UnexpectedLengthForTorV3SocketData',
  },
  {
    args: {ip4: Buffer.alloc(6).toString('hex')},
    description: 'Decode ip version 4 socket',
    expected: {socket: '0.0.0.0:0'},
  },
  {
    args: {ip6: Buffer.alloc(18).toString('hex')},
    description: 'Decode ip version 6 socket',
    expected: {socket: '0000:0000:0000:0000:0000:0000:0000:0000:0'},
  },
  {
    args: {tor3: Buffer.alloc(37).toString('hex')},
    description: 'Decode tor v3 onion socket',
    expected: {
      socket: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.onion:0',
    },
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => decodeSocket(args), new Error(error), 'Got expected error');
    } else {
      const res = decodeSocket(args);

      deepStrictEqual(res, expected, 'Got expected result');
    }

    return end();
  });
}
