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

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useRouter } from 'next/router'

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';






const TransferPage: NextPage = () => {



    const [inputField, setField] = React.useState<string>('Name');
    const [addressField, setAddressField] = React.useState<string>();
    const [inputBytes, setBytes] = React.useState<string>();
    const [owned, setOwnedBool] = React.useState(3);
  
    const [currentOwner, setOwner] = React.useState<string>();
  
    const { isConnected } = useAccount();
    const { address, isConnecting, isDisconnected } = useAccount();

    const account = useAccount({
      onConnect({ address, connector, isReconnected }) {
        //console.log('Connected', { address, connector, isReconnected })
      },
    });
  
    //console.log(account);
  
    const contractConfig = {
      addressOrName: '0x5564886ca2C518d1964E5FCea4f423b41Db9F561',
      contractInterface: contractInterface,
    };
  
  
    //----------------CHECK NAME-----------------
  
    const { refetch } = useContractRead({
      ...contractConfig,
      functionName: 'owner',
      args:inputBytes,
    });
  
    const handleClick = async () => {
  
      setOwnedBool(3);
      //console.log("clicked");
      const res = await refetch();
      //console.log(`owner is:`, res.data);
  
      if (typeof res.data !== "undefined" && res.data.toString() !== "0x0000000000000000000000000000000000000000") {
        setOwner(res.data.toString());
        setOwnedBool(1);
        //console.log('Not available');
      }
      if (typeof res.data !== "undefined" && res.data.toString() == address) {
        setOwnedBool(0);
        //console.log('Available!');
      }
  
    }
  
    //----------STRING TO BYTES32------------------
  
    React.useEffect(() => {
      setOwnedBool(3);
      //console.log('input : ', inputField);
      if (typeof inputField !== "undefined" && inputField !== "") {
        const bytes = setBytes((ethers.utils.formatBytes32String(inputField)).toString());
        //console.log(bytes);
      }
    }, [inputField]);
  
  
  
    //-------------transfer---------------------
    const { config: transferConfig } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'transfer',
      args:[inputBytes,addressField]
    });
  
  
    const {
      data: transferData,
      write: transfer,
      isLoading: transferLoading,
      isSuccess: transferStarted,
      error: transferError,
    } = useContractWrite(transferConfig);
  
   
  
      //----------TRACK TRANSACTION------------------
  
      const {
        data: txData,
        isSuccess: txSuccess,
        error: txError,
      } = useWaitForTransaction({
        hash: transferData?.hash,
      });
  
      const isMinted = txSuccess;
    
  
  
    //------------------HTML-------------------------------------------------
  
    return (
      
      <div className="page">
      <div className="transfercontainer">
        <div className="transfermobile" style={{ flex: '1 1 auto', display: 'column' }}>
          <div className="transfermobile2" style={{ padding: '24px 24px 24px 0' }}>
            <h2 className="pad-bottom15x">Transfer a name</h2>
            <TextField 
                sx={{ input: { color: 'white' } }} 
                className="white" 
                 
                id="outlined-basic" 
                label="Name" 
                variant="outlined"
                value={inputField} 
                onChange={(e) => setField(e.target.value)} 
            />
            <TextField 
                sx={{ input: { color: 'white' } }} 
                className="white pad-top" 
                id="outlined-basic" 
                label="Address" 
                variant="outlined"
                value={addressField} 
                onChange={(e) => setAddressField(e.target.value)} 
            />
            {owned==3 && (
              <p style={{ marginTop: 24, color: 'red' }}>
                 
              </p>
            )}
            {owned==1 && (
              <p style={{ marginTop: 24, color: 'red' }}>
                Uavailable, <a href={`https://etherscan.io/address/${currentOwner}`} target="_blank" rel="noopener noreferrer">owner</a>
              </p>
            )}
            {owned==0 && (
              <p style={{ marginTop: 24, color: '#9afa92' }}>
                Available
              </p>
            )}
  
            {txError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {txError.message}
              </p>
            )}
            {txError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {txError.message}
              </p>
            )}
  
            
              <Button
                size="large"
                variant="outlined"
                color="secondary"
                style={{ marginTop: 24, }}
                className="white search"
                onClick={handleClick}
              >
                Check
              </Button>
            
  
            {owned==0 && isConnected && !isMinted &&(
              <Button
                size="large"
                variant="contained"
                color="success"
                style={{ marginTop: '7px', }}
                className="white button mobile-button"
                onClick={() => transfer?.()}
              >
                {transferLoading && 'Pending...'}
                {transferStarted && 'Minting...'}
                {!transferLoading && !transferStarted && 'Transfer'}
              </Button>
            )}
          </div>
        </div>
      
  
        <div style={{ flex: '0 0 auto' }}>
          <FlipCard>
            <FrontCard isCardFlipped={isMinted}>
              
            <div className="main-img gradient center-content" style={{ padding: 24 }}>
            <h1>{inputField}</h1>
            </div>
              
            </FrontCard>
            <BackCard isCardFlipped={isMinted}>
              <div className="main-img gradient center-content" style={{ padding: 24 }}>
                <Stack spacing={2}>
                <h1 >{inputField} transferred!</h1>
                <p >
                  View on{' '}
                  <a href={`https://etherscan.io/tx/${transferData?.hash}`} target="_blank" rel="noopener noreferrer">
                    Etherscan
                  </a>
                </p>
                <p>
                  <a
                    href={'https://etherscan.io/address/0x5564886ca2C518d1964E5FCea4f423b41Db9F561'}
                    target="_blank" rel="noopener noreferrer"
                  >
                    Explore the contract
                  </a>
                </p>
                </Stack>
              </div>
            </BackCard>
          </FlipCard>
        </div>
      </div>
    </div>
      
    );
  };
export default TransferPage;