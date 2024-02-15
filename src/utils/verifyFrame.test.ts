import { expect, test } from 'vitest'
import { verifyFrame } from './verifyFrame.js'

test('valid', async () => {
  const messageBytes =
    '0a4f080d10ff2f18c1a6802f20018201400a2168747470733a2f2f746573742d66617263362e76657263656c2e6170702f61706910011a1908ff2f1214000000000000000000000000000000000000000112141de03010b0ce4f39ba4b8ff29851d0d610dc5ddd180122404aab47af096150fe7193713722bcdd6ddcd6cd35c1e84cc42e7713624916a97568fa8232e2ffd70ce5eeafb0391c7bbcdf6c5ba15a9a02834102b016058e7d0128013220daa3f0a5335900f542a266e4b837309aeac52d736f4cf9b2eff0d4c4f4c7e58f'
  expect(
    await verifyFrame({
      frameUrl: 'https://test-farc6.vercel.app/api',
      hubApiUrl: 'https://api.hub.wevm.dev',
      trustedData: { messageBytes },
      url: 'https://test-farc6.vercel.app/api',
    }),
  ).toMatchInlineSnapshot(`
    {
      "data": {
        "castAddBody": undefined,
        "castRemoveBody": undefined,
        "fid": 6143,
        "frameActionBody": {
          "buttonIndex": 1,
          "castId": {
            "fid": 6143,
            "hash": Uint8Array [
              211,
              29,
              52,
              211,
              77,
              52,
              211,
              77,
              52,
              211,
              77,
              52,
              211,
              77,
              52,
              211,
              77,
              52,
              211,
              77,
              52,
              211,
              77,
              52,
              211,
              77,
              52,
              211,
              77,
              52,
              211,
            ],
          },
          "inputText": Uint8Array [],
          "url": Uint8Array [
            104,
            116,
            116,
            112,
            115,
            58,
            47,
            47,
            116,
            101,
            115,
            116,
            45,
            102,
            97,
            114,
            99,
            54,
            46,
            118,
            101,
            114,
            99,
            101,
            108,
            46,
            97,
            112,
            112,
            47,
            97,
            112,
            105,
          ],
        },
        "linkBody": undefined,
        "network": 1,
        "reactionBody": undefined,
        "timestamp": 98571073,
        "type": 13,
        "userDataBody": undefined,
        "usernameProofBody": undefined,
        "verificationAddAddressBody": undefined,
        "verificationRemoveBody": undefined,
      },
      "dataBytes": undefined,
      "hash": Uint8Array [
        211,
        29,
        93,
        123,
        77,
        244,
        215,
        70,
        244,
        113,
        238,
        31,
        223,
        214,
        218,
        225,
        191,
        31,
        127,
        111,
        124,
        231,
        87,
        116,
        119,
        173,
        116,
        117,
        206,
        93,
        117,
      ],
      "hashScheme": 1,
      "signature": Uint8Array [
        74,
        171,
        71,
        175,
        9,
        97,
        80,
        254,
        113,
        147,
        113,
        55,
        34,
        188,
        221,
        109,
        220,
        214,
        205,
        53,
        193,
        232,
        76,
        196,
        46,
        119,
        19,
        98,
        73,
        22,
        169,
        117,
        104,
        250,
        130,
        50,
        226,
        255,
        215,
        12,
        229,
        238,
        175,
        176,
        57,
        28,
        123,
        188,
        223,
        108,
        91,
        161,
        90,
        154,
        2,
        131,
        65,
        2,
        176,
        22,
        5,
        142,
        125,
        1,
      ],
      "signatureScheme": 1,
      "signer": Uint8Array [
        211,
        23,
        90,
        107,
        119,
        244,
        107,
        157,
        247,
        231,
        221,
        52,
        127,
        158,
        54,
        107,
        110,
        186,
        123,
        134,
        252,
        223,
        189,
        244,
        245,
        167,
        154,
        115,
        157,
        157,
        239,
        126,
        159,
        225,
        199,
        253,
        111,
        103,
        159,
        127,
        71,
        120,
        115,
        135,
        248,
        115,
        183,
        185,
        241,
      ],
    }
  `)
})

test('invalid hash', async () => {
  const messageBytes =
    '0a4d080d10ff2f18c1a6802f20018201400a2168747470733a2a2f746573742d66617263362e76657263656c2e6170702f61706910011a1908ff2f1214000000000000000000000000000000000000000112141de03010b0ce4f39ba4b8ff29851d0d610dc5ddd180122404aab47af096150fe7193713722bcdd6ddcd6cd35c1e84cc42e7713624916a97568fa8232e2ffd70ce5eeafb0391c7bbcdf6c5ba15a9a02834102b016058e7d0128013220daa3f0a5335900f542a266e4b837309aeac52d736f4cf9b2eff0d4c4f4c7e58f'
  await expect(() =>
    verifyFrame({
      frameUrl: 'https://test-farc6.vercel.app/api',
      hubApiUrl: 'https://api.hub.wevm.dev',
      trustedData: { messageBytes },
      url: 'https://test-farc6.vercel.app/api',
    }),
  ).rejects.toMatchInlineSnapshot('[Error: message is invalid. invalid hash]')
})

test('invalid url', async () => {
  const messageBytes =
    '0a4f080d10ff2f18c1a6802f20018201400a2168747470733a2f2f746573742d66617263362e76657263656c2e6170702f61706910011a1908ff2f1214000000000000000000000000000000000000000112141de03010b0ce4f39ba4b8ff29851d0d610dc5ddd180122404aab47af096150fe7193713722bcdd6ddcd6cd35c1e84cc42e7713624916a97568fa8232e2ffd70ce5eeafb0391c7bbcdf6c5ba15a9a02834102b016058e7d0128013220daa3f0a5335900f542a266e4b837309aeac52d736f4cf9b2eff0d4c4f4c7e58f'
  await expect(() =>
    verifyFrame({
      frameUrl: 'https://test-farc6.vercel.app/api',
      hubApiUrl: 'https://api.hub.wevm.dev',
      trustedData: { messageBytes },
      url: 'https://test-farc6.vercel.app/foo',
    }),
  ).rejects.toMatchInlineSnapshot(
    '[Error: Invalid frame url: https://test-farc6.vercel.app/api]',
  )
})
