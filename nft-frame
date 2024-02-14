// NFT Frame
// params pattern "chain_address_tokenid"
// example: "ZORA_0x1ac5c6eeadd3108baf182f5fc55534014f53bb5d_1"
// deployed sample: http://fleek-test.network/services/1/ipfs/QmYgZRXiSy522GiDc66Sh1xZEwbqQaBb4pxc5e93ddxY2j?param=%22ZORA_0x1ac5c6eeadd3108baf182f5fc55534014f53bb5d_1%22

const main = async (params) => {
  params = params.split("_")
  let network = params[0]
  let address = params[1]
  let tokenid = params[2]
  let chain = network + "_MAINNET"  

  const payload = JSON.stringify({
    query: `query  token{
      token(
      network: {network: `+ network +`, chain: `+chain+`}
      token: {
        address: "`+address+`",
        tokenId: "`+tokenid+`"}
      ) {token{name description image{url}}}
    }`,
  })

  const response = await fetch(
    'https://api.zora.co/graphql',
    {
      method: 'post',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  const data = await response.json();
  const token = data['data']['token']['token']
  let token_name = token['name']
  let image_url = token['image']['url']
  if (image_url.startsWith("ipfs://"))
      image_url = "https://cloudflare-ipfs.com/ipfs/" + image_url.substr("ipfs://".length)
  else if (image_url.startsWith("ar://"))
      image_url = "https://arweave.net/" + image_url.substr("ar://".length)
  const source = `<head>
  <meta property="og:title" content="Fleek Network NFT Farcaster Frame" />
  <meta property='og:image' content="`+image_url+`" />
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:image" content="`+image_url+`" />
  <meta property="fc:frame:image:aspect_ratio" content="1:1" />
  <meta property="fc:frame:button:1" content="`+token_name+` | View on OpenSea" />
  <meta property="fc:frame:button:1:action" content="link" />
  <meta property="fc:frame:button:1:target" content="https://opensea.io/assets/`+network+`/`+address+`/`+tokenid+`" /></head>`
  return source
}
