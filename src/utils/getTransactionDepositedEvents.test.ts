import { TransactionReceipt } from 'viem'
import { expect, test } from 'vitest'
import { getTransactionDepositedEvents } from './getTransactionDepositedEvents.js'

const txReceipt: TransactionReceipt = {
  type: 'eip1559',
  transactionHash: '0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c',
  transactionIndex: 78,
  blockHash: '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7',
  blockNumber: 17809754n,
  from: '0xbc3ed6b537f2980e66f396fe14210a56ba3f72c4',
  to: '0x49048044d57e1c92a77f79988d21fa8faf74e97e',
  cumulativeGasUsed: 10142442n,
  gasUsed: 50764n,
  contractAddress: null,
  logs: [
    {
      removed: false,
      logIndex: 196,
      transactionIndex: 78,
      transactionHash: '0xe94031c3174788c3fee7216465c50bb2b72e7a1963f5af807b3768da10827f5c',
      blockHash: '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7',
      blockNumber: 17809754n,
      address: '0x49048044d57e1c92a77f79988d21fa8faf74e97e',
      data:
        '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004a0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000001000000000000526c000000000000000000000000000000000000000000000000',
      topics: [
        '0xb3813568d9991fc951961fcb4c784893574240a28925604d09fc577c55bb7c32',
        '0x000000000000000000000000bc3ed6b537f2980e66f396fe14210a56ba3f72c4',
        '0x000000000000000000000000bc3ed6b537f2980e66f396fe14210a56ba3f72c4',
        '0x0000000000000000000000000000000000000000000000000000000000000000',
      ],
    },
  ],
  logsBloom:
    '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000800000000000000200000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000800000000040000000000000000000200000000000000000000000000020000000000000000a0000000000000000000000',
  status: 'success',
  effectiveGasPrice: 15949156605n,
}

test('returns correct event info', () => {
  const events = getTransactionDepositedEvents({
    txReceipt,
  })

  expect(events.length).toEqual(1)
  expect(events[0].logIndex).toEqual(196)
  expect(events[0].event).toEqual({
    eventName: 'TransactionDeposited',
    args: {
      from: '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
      to: '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
      version: 0n,
      opaqueData:
        '0x0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000001000000000000526c0000',
    },
  })
})
