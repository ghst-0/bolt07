import test from 'node:test';
import { deepStrictEqual, throws } from 'node:assert/strict';

import { policyFee } from '../../routing/policy_fee.js';

const tests = [
  {
    args: {inbound: {}},
    description: 'Mtokens are required',
    error: 'ExpectedMillitokensForPolicyFeeCalculation',
  },
  {
    args: {inbound: {}, mtokens: '1000000'},
    description: 'A policy is required',
    error: 'ExpectedPolicyToCalculateFeeFor',
  },
  {
    args: {inbound: {}, mtokens: '1000000', policy: {}},
    description: 'Base fee tokens are required',
    error: 'ExpectedBaseFeeMillitokensForPolicyFeeCalculation',
  },
  {
    args: {inbound: {}, mtokens: '1000000', policy: {base_fee_mtokens: '1'}},
    description: 'Fee rate is required',
    error: 'ExpectedFeeRateForPolicyFeeCalculation',
  },
  {
    args: {
      inbound: {},
      mtokens: '1000000',
      policy: {base_fee_mtokens: '1', fee_rate: 1},
    },
    description: 'Fee is calculated',
    expected: {fee_mtokens: '2'},
  },
  {
    args: {
      inbound: {inbound_base_discount_mtokens: '1', inbound_rate_discount: 1},
      mtokens: '1000000',
      policy: {base_fee_mtokens: '1', fee_rate: 1},
    },
    description: 'Fee rate with discount is calculated',
    expected: {fee_mtokens: '0'},
  },
  {
    args: {
      inbound: {inbound_base_discount_mtokens: '10', inbound_rate_discount: 1},
      mtokens: '1000000',
      policy: {base_fee_mtokens: '1', fee_rate: 1},
    },
    description: 'Fee rate with big discount is calculated',
    expected: {fee_mtokens: '0'},
  },
];

for (const { args, description, error, expected } of tests) {
  test(description, (t, end) => {
    if (error) {
      throws(() => policyFee(args), new Error(error), 'Got expected error');
    } else {
      deepStrictEqual(policyFee(args).fee_mtokens, expected.fee_mtokens, 'Fee');
    }

    return end();
  });
}
