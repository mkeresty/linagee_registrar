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
import allowlistImport from '../utils/allowlist2.json'
import { getLeafProof, checkAllowlisted, checkAllocation } from '../utils/merkle2';
import dynamic from 'next/dynamic';
import BasicModal from '../components/Modal';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useRouter } from 'next/router'

import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';



const Home: NextPage = () => {

  const [inputField, setField] = React.useState<string>('Name');
  const [inputBytes, setBytes] = React.useState<string>();
  const [owned, setOwnedBool] = React.useState(3);

  const [currentOwner, setOwner] = React.useState<string>();

  const { isConnected } = useAccount();

  const account = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
    },
  });

  console.log(account);

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

  console.log('inputttt');
  console.log(inputBytes);

  const handleClick = async () => {



    setOwnedBool(3);
    console.log("clicked");
    const res = await refetch();
    console.log(`owner is:`, res.data);

    if (typeof res.data !== "undefined" && res.data.toString() !== "0x0000000000000000000000000000000000000000") {
      setOwner(res.data.toString());
      setOwnedBool(1);
      console.log('Not available');
    }
    if (typeof res.data !== "undefined" && res.data.toString() == "0x0000000000000000000000000000000000000000") {
      setOwnedBool(0);
      console.log('Available!');
    }

  }

  //----------STRING TO BYTES32------------------

  React.useEffect(() => {
    setOwnedBool(3);
    console.log('input : ', inputField);
    if (typeof inputField !== "undefined" && inputField !== "") {
      const bytes = setBytes((ethers.utils.formatBytes32String(inputField)).toString());

    }
  }, [inputField]);



  //-------------Reserve---------------------
  const { config: reserveConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'reserve',
    args:inputBytes,
  });


  const {
    data: reserveData,
    write: reserve,
    isLoading: reserveLoading,
    isSuccess: reserveStarted,
    error: reserveError,
  } = useContractWrite(reserveConfig);

 

    //----------TRACK TRANSACTION------------------

    const {
      data: txData,
      isSuccess: txSuccess,
      error: txError,
    } = useWaitForTransaction({
      hash: reserveData?.hash,
    });

    const isMinted = txSuccess;
  


  //------------------HTML-------------------------------------------------

  return (
    
    <div className="page">
    <div className="container">
      <div className="mobile" style={{ flex: '1 1 auto', display: 'column' }}>
        <div className="mobile2" style={{ padding: '24px 24px 24px 0' }}>
          <h1 className="pad-bottom15x">Ethereum's First Registrar</h1>
          <h2 className="pad-bottom15x">Register a name</h2>
          <TextField 
              sx={{ input: { color: 'white' } }} 
              className="white" 
               
              id="outlined-basic" 
              label="Name" 
              variant="outlined"
              value={inputField} 
              onChange={(e) => setField(e.target.value)} 
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
              variant="contained"
              color="secondary"
              style={{ marginTop: 24, }}
              className="white search"
              onClick={handleClick}
            >
              Search
            </Button>
          

          {owned==0 && isConnected && !isMinted &&(
            <Button
              size="large"
              variant="contained"
              color="success"
              style={{ marginTop: 24, }}
              className="white button mobile-button"
              onClick={() => reserve?.()}
            >
              {reserveLoading && 'Pending...'}
              {reserveStarted && 'Minting...'}
              {!reserveLoading && !reserveStarted && 'Register'}
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
              <h1 >{inputField} registered!</h1>
              <p >
                You are now part of history
              </p>
              <p >
                View on{' '}
                <a href={`https://etherscan.io/tx/${reserveData?.hash}`} target="_blank" rel="noopener noreferrer">
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


export default Home;


