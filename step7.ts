import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4 } from "@ton/ton";

async function main() {
  // open wallet v4 (notice the correct wallet version here)
  const mnemonic = "barely merge seed fiction circle balance release scene lizard idle comic shift coconut faith leisure there ketchup cargo leave boy disease rule lock extra"; // your 24 secret words (replace ... with the rest of the words)
  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

  // print wallet address
  console.log(wallet.address.toString({ testOnly: true }));
  console.log(key.publicKey)
  console.log(key.secretKey)
  // print wallet workchain
  console.log("workchain:", wallet.address.workChain);
}

main();
