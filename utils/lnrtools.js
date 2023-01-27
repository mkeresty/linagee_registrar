import { LNR } from './lnr.min.js';
import { ethers } from 'ethers';
import { getProvider } from '@wagmi/core';
import { useAccount } from 'wagmi';


export async function resolve(name){
    
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
let lnr = new LNR(ethers, signer);


    var resolved = await lnr.resolveName(name)
    .catch((e) => {
        console.error(e.message)
        return
      })

    return(resolved)
}