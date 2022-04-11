import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { useEffect } from "react";
import Web3 from "web3";

//  Create WalletConnect Provider
const provider = new WalletConnectProvider({
  infuraId: "b57d13a7361d43b2898c4ac71ef031bb",
});

const Home: NextPage = () => {
  const connect = async () => {
    await provider.enable();

    provider.on("accountsChanged", (accounts: string[]) => {
      console.log(accounts);
    });

    // Subscribe to chainId change
    provider.on("chainChanged", (chainId: number) => {
      console.log(chainId);
    });

    // Subscribe to session disconnection
    provider.on("disconnect", (code: number, reason: string) => {
      console.log(code, reason);
    });

    const web3 = new Web3(provider as any);
    const accounts = await web3.eth.getAccounts();
    console.log("Accounts : ", accounts);
  };

  const disconnect = async () => {
    await provider.disconnect();
  };

  const signPersonalMessage = async () => {
    const web3 = new Web3(provider as any);
    const accounts = await web3.eth.getAccounts();
    const response = await web3.eth.personal.sign(
      "Test message",
      accounts[0],
      ""
    );
    console.log(response);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={connect}>Connect to wallet</button>
      <button onClick={disconnect}>Disconnect wallet</button>
      <button onClick={signPersonalMessage}>signPersonalMessage</button>
    </div>
  );
};

export default Home;
