import React from 'react';
import type { NextPage } from 'next';



const Whitepaper: NextPage = () => {


  return (
    <div className="page mobile-page">
      <div className="container pad-top5 pad-bottom15x mobile-history">
        <div className="paper">
      <h1>Origins</h1>
        <p className="para">
        Created by Linagee on August 8, 2015 at tx: <a href="https://etherscan.io/tx/0xf18ca6c25eafb634dac8256abe8bb2257f5ad2a1437221c22cbb6b870f97a9a7" target="_blank" rel="noopener noreferrer">
        0xf18ca6c25eafb634dac8256abe8bb2257f5ad2a1437221c22cbb6b870f97a9a7
        </a>
        , this is the first registar contract on the Ethereum blockchain, predating ENS.<br/>
        Linagee first shared the contract on <a href="https://www.reddit.com/r/ethereum/comments/3iau5v/name_registrar_is_awesome/" target="_blank" rel="noopener noreferrer">reddit</a>.<br/> 
        <br/>
        Soon the contract was forgotten. Recently I found it while decompiling every contract within the first 300k blocks of the Ethereum blockchain. I was immediately intrigued and tried my best to find the creator, but to no avail. <br/>
        This led me to create this website so the community could interact with the contract and be part of history while honoring Linagee.
       </p>
        <span/>
      <h1>About</h1>
        <p className="para">
          This registrar allows users to claim names by using the 'reserve(__name(bytes32))' function. One of these names can then be set as your primary name using the 'setAddress(__name(boolean), __a(address), __primary(boolean))' function, which the contract will resolve to your address. There are also read functions that allow one to see the resolved name associated with an address,
          and the address that owns a particular name.<br/>
          <br/>
          Additionally this contract allows users to set sub-names and contents associated with their names.
          <br/>
          <br/>
          Note: This contract is unverified and I therefore I cannot confirm with certainty how these functions, and contract as a whole works.
        </p>
        <span/>
      <h1>Linagee</h1>
        <p className="para">
          Within the Ethereum community Linagee is a legend, and somewhat of an enigma. Not only did they deploy the first registrar, they also deployed the very first <a href="https://etherscan.io/address/0x6516298e1c94769432ef6d5f450579094e8c21fa" target="_blank" rel="noopener noreferrer">smart contract</a> on Ethereum!
          Throughout the next few weeks they deployed several other contracts, along with the first ownable Ethereum asset, TestCoin, which Daniel Bernstein covers in 
            <a href="https://digitalanddusty.com/2022/08/26/linagee-the-legend/" target="_blank" rel="noopener noreferrer"> this article.</a><br/>
            <br/>
          Linagee is a legend and pioneer on the Ethereum blockchain. We may not be where we are without their early work, and for that, thank you.        
            </p>
        <span/>
        <h1>Disclaimer</h1>
        <p className="para">
            We cannot confirm the safety of these contracts. This website is in no way financial advice, nor am I responsible for anything that could happen. Use at your own risk, double check every transaction for accuracy, and always use a burner wallet.<br/>
            <br/>
            The source code for this website can be found on my <a href="https://github.com/mkeresty/linagee_registrar" target="_blank" rel="noopener noreferrer">github.</a>
        </p>
        <span/>
        <h2 className="para">
          -Mason Keresty
        </h2>
        <span/>
        </div>
        </div>
    </div>
  );
}

export default Whitepaper;