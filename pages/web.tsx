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


const WebPage: NextPage = () => {
    const provider = getProvider();
    const { data: signer, isError, isLoading } = useSigner();
    const account = useAccount({
        onConnect({ address, connector, isReconnected }) {
          console.log('Connected', { address, connector, isReconnected })
        },
      });
    
    let lnr = new LNR(ethers, signer);



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


  
  
    //------------------HTML-------------------------------------------------
  
    return (
      
        <div className="page">
        <div className="transfercontainer">
          <div className="transfermobile" style={{ flex: '1 1 auto', display: 'column' }}>
            <div className="transfermobile2" style={{ padding: '24px 24px 24px 0' }}>
            <h2 className="pad-bottom15x">Begin your journey</h2>
          <TextField
              sx={{ input: { color: 'white' }}} 
              className="white" 
              id="outlined-basic" 
              label="Search" 
              value={inputField} 
              onChange={(e) => setField(e.target.value)} 
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
          {resolved}
                </div>
                </div>
                </div>
                </div>
      
    );
  };
export default WebPage;