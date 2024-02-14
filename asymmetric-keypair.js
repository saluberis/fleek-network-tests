const main = async (params) => {
  const keypair = await crypto.subtle.generateKey(
    {
        name: "ECDSA",
        namedCurve: "P-256", //can be "P-256", "P-384", or "P-521"
    },
    true, //whether the key is extractable (i.e. can be used in exportKey)
    ["sign", "verify"] //can be any combination of "sign" and "verify"
  )  

  const pub = await crypto.subtle.exportKey("jwk", keypair.publicKey)
  const prv = await crypto.subtle.exportKey("jwk", keypair.privateKey)

  return '{"private_key": "' + JSON.stringify(prv)
    + '", "public_key": "' + JSON.stringify(pub) + '"}'
}
