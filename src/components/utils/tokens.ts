import { ca, de } from "element-plus/es/locales.mjs";

const chains = {
    "eth": [
      {
        "name": "ETH",
        "symbol": "ETH",
        "contract": "0x0000000000000000000000000000000000000000",
        "logo": "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
        "decimals": 18,
        "chain": "ethTest",
        "alias": "ETH(ethTest)",
        "isEther": true
      },
      {
        "name": "USDT Token",
        "symbol": "USDT",
        "contract": "0x7996d9586Fb11575c9C1819fe13F454026a10B96",
        "logo": "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
        "decimals": 18,
        "chain": "ethTest",
        "alias": "USDT(ethTest)",
        "isEther": false
      },
      {
        "name": "WBTC",
        "symbol": "WBTC",
        "contract": "0xD802D7D4bD453D8447dFE9357F3113BEcc159110",
        "logo": "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=032",
        "decimals": 18,
        "chain": "ethTest",
        "alias": "WBTC(ethTest)",
        "isEther": false
      }
    ],
    "sui": [
      {
        "name": "USDT",
        "symbol": "USDT",
        "contract": "31367e82fdad8dd080a14f7901132c8eed7d81003be37f8611ec1b93cfac8de3::usdt::USDT",
        "logo": "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
        "decimals": 9,
        "chain": "suiTest",
        "cap": "0xfb4cbb8714608f258e075f473bceef0a84ca92f5b9645f6f048b8c34a37fbc55",
        "alias": "USDT(suiTest)",
        "isEther": false
      }
    ],
    "bsc": [
      {
        "name": "BNB",
        "symbol": "BNB",
        "contract": "0x0000000000000000000000000000000000000000",
        "logo": "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=032",
        "decimals": 18,
        "chain": "bscTest",
        "alias": "BNB(bscTest)",
        "isEther": true
      },
      {
        "name": "USDT Token",
        "symbol": "USDT",
        "contract": "0x337610d27c682E347C9cD60BD4b3b107C9d34dDd",
        "logo": "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
        "decimals": 18,
        "chain": "bscTest",
        "alias": "USDT(bscTest)",
        "isEther": false
      },
      {
        "name": "BTCB",
        "symbol": "BTCB",
        "contract": "0x6ce8dA28E2f864420840cF74474eFf5fD80E65B8",
        "logo": "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=032",
        "decimals": 18,
        "chain": "bscTest",
        "alias": "BTCB(bscTest)",
        "isEther": false
      }
    ],
    "btcTest": [
      {
        "name": "BTC",
        "symbol": "BTC",
        "contract": "0x0000000000000000000000000000000000000000",
        "logo": "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=032",
        "decimals": 8,
        "chain": "btcTest",
        "alias": "BTC(btcTest)",
        "isEther": true
      }
    ],
    "mango": [
      {
        "name": "MBNB",
        "symbol": "MBNB",
        "contract": "3cdc0a0cf1d8988ba4afd2352fd54b42cdf1e635b4ea67435e53f7a447f4e7dc::mbnb::MBNB",
        "logo": "https://cryptologos.cc/logos/bnb-bnb-logo.png?v=032",
        "decimals": 9,
        "chain": "mangoDev",
        "cap": "0x0b1963da57a1032a00d1faf52ae6ddc3782c370b6dcecf6a0ad7f3618b2999c3",
        "alias": "MBNB(mangoDev)",
        "isEther": false
      },
      {
        "name": "USDT",
        "symbol": "USDT",
        "contract": "96143722c8155746dc25cfd5c4664776d27441bfede174511018d0e46f4fea66::usdt::USDT",
        "logo": "https://cryptologos.cc/logos/tether-usdt-logo.png?v=032",
        "decimals": 2,
        "chain": "mangoDev",
        "cap": "0xbfffbb36c3024f948323fafefff4ba6f34b9a95fabcf6f7327caf60940fc338a",
        "alias": "USDT(mangoDev)",
        "isEther": false
      },
      {
        "name": "METH",
        "symbol": "METH",
        "contract": "ff57fcbe56c70f7f32d9addb21a94f6277f528bfd07555f0eb4513ea50597449::meth::METH",
        "logo": "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=032",
        "decimals": 9,
        "chain": "mangoDev",
        "cap": "0x8d3885a375aa83c8fa6ee3c25ce0296457ed2e62bcc9c262098da2ce1e488be4",
        "alias": "METH(mangoDev)",
        "isEther": false
      },
      {
        "name": "MBTC",
        "symbol": "MBTC",
        "contract": "bf0e0c394b6fdc129b2021761419123e0e055bcfc93d368bc41bc6ae5cf35273::mbtc::MBTC",
        "logo": "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=032",
        "decimals": 9,
        "chain": "mangoDev",
        "cap": "0x4f6441f75a84e5afde914f921ddf5cfcdd04184f29d73eacd09a84516fe77396",
        "alias": "MBTC(mangoDev)",
        "isEther": false
      }
    ]
  }

  export const tokenDecimalsMap = new Map<string, Map<string | undefined, number>>();
  export const tokenNameMap = new Map<string, Map<string | undefined, string>>();

  Object.entries(chains).flatMap( entry => {
    const map = new Map<string, number>()
    switch (entry[0]) {
      case 'eth': {
        entry[1].flatMap( item => {
          map.set(item.contract.toLowerCase(), item.decimals);
        })
        break;
      }
      case 'bsc': {
        entry[1].flatMap( item => {
          map.set(item.contract.toLowerCase(), item.decimals);
        })
        break;
      }
      default: {
        entry[1].flatMap( item => {
          map.set(item.contract, item.decimals);
        })
        break;
      }
    }
    tokenDecimalsMap.set(entry[0], map)
  })


  Object.entries(chains).flatMap( entry => {
    const map = new Map<string, string>()
    switch (entry[0]) {
      case 'eth': {
        entry[1].flatMap( item => {
          map.set(item.contract.toLowerCase(), item.name);
        })
        break;
      }
      case 'bsc': {
        entry[1].flatMap( item => {
          map.set(item.contract.toLowerCase(), item.name);
        })
        break;
      }
      default: {
        entry[1].flatMap( item => {
          map.set(item.contract, item.name);
        })
        break;
      }
    }
    tokenNameMap.set(entry[0], map)
  })
  
//   let bscDecimalsMap = new Map<string, number>();
//   chains.bsc.flatMap( entry => {
//     bscDecimalsMap.set(entry.contract, entry.decimals);
//   });
//   tokenDecimalsMap.set("bsc", bscDecimalsMap);

//   let btcDecimalMap = new Map<string, number>();
//   chains.btcTest.flatMap( entry => {
//     btcDecimalMap.set(entry.contract, entry.decimals);
//   });
//   tokenDecimalsMap.set("btcTest", btcDecimalMap);

//   let ethDecimalMap = new Map<string, number>();
//   chains.eth.flatMap( entry => {
//     ethDecimalMap.set(entry.contract, entry.decimals);
//   });
//   tokenDecimalsMap.set("eth", ethDecimalMap);

//   let mangoDecimalMap = new Map<string, number>();
//   chains.mango.flatMap( entry => {
//     mangoDecimalMap.set(entry.contract, entry.decimals);
//   });
//   tokenDecimalsMap.set("mango", mangoDecimalMap);

//   let suiDecimalMap = new Map<string, number>();
//   chains.sui.flatMap( entry => {
//     suiDecimalMap.set(entry.contract, entry.decimals)
//   });
//   tokenDecimalsMap.set("sui", suiDecimalMap);
