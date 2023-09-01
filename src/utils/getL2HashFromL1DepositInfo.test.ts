import { test, expect } from 'vitest'
import { getL2HashFromL1DepositInfo } from './getL2HashFromL1DepositInfo'
import { TransactionDepositedEvent } from '../types/depositTx'

const event: TransactionDepositedEvent = {
  eventName: 'TransactionDeposited',
  args: {
    from: '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
    to: '0xbc3ed6B537f2980e66f396Fe14210A56ba3f72C4',
    version: 0n,
    opaqueData:
      '0x0000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000001000000000000526c0000',
  },
}

const eventWithZeroData: TransactionDepositedEvent = {
  eventName: 'TransactionDeposited',
  args: {
    from: '0x80B01fDEd19145FFB893123eC38eBba31b4043Ee',
    to: '0x80B01fDEd19145FFB893123eC38eBba31b4043Ee',
    version: 0n,
    opaqueData:
      '0x00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001000000000000520800',
  },
}

// https://etherscan.io/tx/0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4#eventlog
const eventFromMainnet: TransactionDepositedEvent = {
  eventName: 'TransactionDeposited',
  args: {
    from: '0x36BDE71C97B33Cc4729cf772aE268934f7AB70B2',
    to: '0x4200000000000000000000000000000000000007',
    version: 0n,
    opaqueData:
      '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000020d00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006b8c400d764ad0b000100000000000000000000000000000000000000000000000000000000af0a0000000000000000000000006587a6164b091a058acba2e91f971454ec172940000000000000000000000000a81d244a1814468c734e5b4101f7b9c0c577a8fc000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000249f000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000c4cc29a306000000000000000000000000f282ed5de6f51854b4f07f5c1dbc8f178ab8a89b000000000000000000000000000000000000000000000000000000011af9f9f000000000000000000000000000000000000000000000000000000001181336b40000000000000000000000000000000000000000000000000000000064f98c01000000000000000000000000a6a688f107851131f0e1dce493ebbebfaf99203e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  },
}

test('returns correct hash', () => {
  const logIndex = 196
  const blockHash =
    '0x9ba3933dc6ce43c145349770a39c30f9b647f17668f004bd2e05c80a2e7262f7'
  const hash = getL2HashFromL1DepositInfo({ event, logIndex, blockHash })

  expect(hash).toEqual(
    '0xe67200042bf79eef76850dd3986bdd544e7aceeb7bbf8449158088bdc582168a',
  )
})

test('returns correct hash with zero data', () => {
  const event = eventWithZeroData
  const logIndex = 36
  const blockHash =
    '0x9375ba075993fcc3cd3f66ef1fc45687aeccc04edfc06da2bc7cdb8984046ed7'
  const hash = getL2HashFromL1DepositInfo({ event, logIndex, blockHash })

  expect(hash).toEqual(
    '0xb81d4b3fe43986c51d29bf29a8c68c9a301c074531d585298bc1e03df68c8459',
  )
})

test('mainnet example', () => {
  // L1: https://etherscan.io/tx/0x33faeeee9c6d5e19edcdfc003f329c6652f05502ffbf3218d9093b92589a42c4
  // L2: https://optimistic.etherscan.io/tx/0xed88afbd3f126180bd5488c2212cd033c51a6f9b1765249bdb738dcac1d0cb41

  const event = eventFromMainnet
  const logIndex = 139
  const blockHash =
    '0x7a40f5453bb6ff0095de5ee3c49a41309a227dec7e961e9e8536f4da80e9d913'
  const hash = getL2HashFromL1DepositInfo({ event, logIndex, blockHash })

  expect(hash).toEqual(
    '0xed88afbd3f126180bd5488c2212cd033c51a6f9b1765249bdb738dcac1d0cb41',
  )
})
