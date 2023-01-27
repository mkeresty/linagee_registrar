import React from 'react';
import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import contractInterface from '../contract-abi.json';
import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';
import { ethers } from 'ethers';
import dynamic from 'next/dynamic';
import BasicModal from '../components/Modal';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'next/router'
import IconButton from '@mui/material/IconButton';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import LNR from '../utils/lnr.min.js'
import { getProvider } from '@wagmi/core'
import { useSigner } from 'wagmi'
import pako from 'pako';

const WebPage: NextPage = () => {
    const provider = getProvider();
    const { data: signer, isError, isLoading } = useSigner();
    const account = useAccount({
        onConnect({ address, connector, isReconnected }) {
          console.log('Connected', { address, connector, isReconnected })
        },
      });
    
    let lnr = new LNR(ethers, signer);
    const lnrWebAbi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"previousAdmin","type":"address"},{"indexed":false,"internalType":"address","name":"newAdmin","type":"address"}],"name":"AdminChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"beacon","type":"address"}],"name":"BeaconUpgraded","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"assetHash","type":"bytes32"},{"indexed":false,"internalType":"string","name":"assetName","type":"string"}],"name":"NewAsset","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"domain","type":"bytes32"}],"name":"NewWebsite","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"implementation","type":"address"}],"name":"Upgraded","type":"event"},{"inputs":[],"name":"lnrResolverAddress","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"lnrWebsites","outputs":[{"internalType":"bool","name":"derp","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"proxiableUUID","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"}],"name":"upgradeTo","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newImplementation","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"upgradeToAndCall","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_domain","type":"bytes32"}],"name":"getWebsite","outputs":[{"components":[{"internalType":"bool","name":"derp","type":"bool"},{"internalType":"string[]","name":"linkArray","type":"string[]"},{"internalType":"bytes32[]","name":"siteHashArray","type":"bytes32[]"}],"internalType":"structLNR_WEB_V0.Website","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"_domain","type":"bytes32"},{"internalType":"string[]","name":"_linkArray","type":"string[]"},{"internalType":"bytes32[]","name":"_siteHashArray","type":"bytes32[]"}],"name":"updateWebsite","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32[]","name":"_assetHash","type":"bytes32[]"},{"internalType":"string[]","name":"_assetName","type":"string[]"},{"internalType":"string[]","name":"_assetType","type":"string[]"},{"internalType":"bytes[]","name":"_assetData","type":"bytes[]"},{"internalType":"bool[]","name":"_zip","type":"bool[]"}],"name":"uploadAssets","outputs":[],"stateMutability":"nonpayable","type":"function"}];
    const lnrWebAddress = "0x9B1558c57Bf2B2686f2E024252E84BA746eBa665"; // local
    
    if(signer){
        var lnrWebContract = new ethers.Contract(lnrWebAddress, lnrWebAbi, signer);
    }
    
    const handleKeyPress = (event: { key: string; }) => {
        if (event.key === 'Enter') {
          // 👇 Get input value
          handleSearch();
        }
      };


    const [inputField, setField] = React.useState<string>('Name');
    const [resolved, setResolved] = React.useState<string>('test')

    const handleSearch = async () =>{
        console.log(inputField)

        var resolvedname = await lnr.resolveName(inputField)
        .catch((e: { message: any; }) => {
            console.error(e.message)
            return
          })

        console.log(resolvedname)

        setResolved(resolvedname)

    }
    //---------------------DERPS STUFF-------------------------
    

    


    function compressData(uncompressed: string){
      let tmpUncompressed = new TextEncoder().encode(uncompressed);
      return pako.deflate(tmpUncompressed);
    }

    function decompressData(compressed: string){
      let tmpCompressed = ethers.utils.arrayify(compressed);
      let uncompressed = new TextDecoder().decode(pako.inflate(tmpCompressed));
      return uncompressed;
    }



  
  
    //------------------HTML-------------------------------------------------
  
    return (
      
        <div className="page2">
        <div className="webcontainer">
            
          <h2 className="pad-bottom15x">Begin your journey</h2>

        <div className="row">
          <TextField
              sx={{ input: { color: 'white' }, width: 800}} 
              className="white" 
              id="outlined-basic" 
              label="Search" 
              value={inputField} 
              onChange={(e) => setField(e.target.value)} 
              onKeyPress={handleKeyPress}
              InputProps={{
              endAdornment:(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleSearch}
                    edge="end"
                  >
                   <SearchIcon color="secondary"/>
                  </IconButton>
                </InputAdornment>
    )}}
          />
          <Button size="small" variant="contained">Create</Button>
                </div>
                </div>
                <div className="frame">hi</div>
                </div>
      
    );
  };
export default WebPage;