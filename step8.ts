import { config } from 'dotenv';
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { mnemonicToWalletKey } from "@ton/crypto";
import { WalletContractV4, TonClient, fromNano } from "@ton/ton";

config(); // Load environment variables from .env file

async function main() {
  const mnemonic = process.env.MNEMONIC;

  if (!mnemonic) {
    throw new Error("Mnemonic is undefined. Please set the MNEMONIC environment variable.");
  }

  const key = await mnemonicToWalletKey(mnemonic.split(" "));
  const wallet = WalletContractV4.create({ publicKey: key.publicKey, workchain: 0 });

  const endpoint = await getHttpEndpoint({ network: "testnet" });
  const client = new TonClient({ endpoint });

  const balance = await client.getBalance(wallet.address);
  console.log("balance:", fromNano(balance));

  const walletContract = client.open(wallet);
  const seqno = await walletContract.getSeqno();
  console.log("seqno:", seqno);
}

main();
