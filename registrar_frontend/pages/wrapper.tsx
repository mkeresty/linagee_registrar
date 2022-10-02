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
import wrapperInterface from '../wrapper-abi.json';
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








const Wrapper: NextPage = () => {

    const wrapperAddress = "0x2fFbbF64803ECAb10B71950c1cBc042f901f63f3";


    const [inputField, setField] = React.useState<string>('Name');
    const [addressField, setAddressField] = React.useState<string>();
    const [inputBytes, setBytes] = React.useState<string>();
    const [owned, setOwnedBool] = React.useState(3);
    const [createdWrapper, setCreatedWrapper] = React.useState(0);
    const [wrappedMap, setWrappedMap] = React.useState(0);
    const [currentOwner, setOwner] = React.useState<string>();
  
    const { isConnected } = useAccount();
    const { address, isConnecting, isDisconnected } = useAccount();

    const account = useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log('Connected', { address, connector, isReconnected })
      },
    });
  
    console.log(account);

    const wrapperConfig = {
        addressOrName: '0x2fFbbF64803ECAb10B71950c1cBc042f901f63f3',
        contractInterface: wrapperInterface,
      };
    
  
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
      setCreatedWrapper(0);
      setWrappedMap(0);




      console.log("clicked");
      const res = await refetch();
      console.log(`owner is:`, res.data);
      console.log(typeof res.data)

      const res2 = await refetch2();
      console.log('is wrapper created?')
      console.log(res2.data);

      const res3 = await refetch3();
      console.log('is name transferred?')
      //console.log(res3.data.toString());
      console.log(wrapperAddress);

      const res4 = await refetch4();
      console.log('bignumberdata');
      console.log(res4.data);
      //console.log(res4.data?.BigNumber);
      //console.log((ethers.BigNumber.from(res4.data)).toNumber());


      if (typeof res3.data !== "undefined" && res3.data.toString() == wrapperAddress) {
        //setOwner(res.data.toString());
        setOwnedBool(6);
        //setWrapperQueue(1);
        //const isTransferred = true;
        console.log('Wrapper owns');
      };

      if (typeof res4.data !== "undefined" && (ethers.BigNumber.from(res4.data)).toNumber() !== 0) {

        console.log('is name wrapped?')
        console.log(res4.data._hex);


        setWrappedMap(1);
        //const isTransferred = true;
        console.log('Wrapped!!');
      };

      if (typeof res2.data !== "undefined" && res2.data.toString() == address) {
        //setOwner(res.data.toString());
        //setOwnedBool(5);
        setCreatedWrapper(1);
        //const isCreated = true;
        console.log('Wrapper Created');
      };
  

      if (typeof res.data !== "undefined" && res.data.toString() !== address && res.data.toString() == "0x0000000000000000000000000000000000000000") {
        setOwner(res.data.toString());
        setOwnedBool(4);
        console.log('Not owned');
      };
  
      if (typeof res.data !== "undefined" && res.data.toString() !== wrapperAddress && res.data.toString() !== address && res.data.toString() !== "0x0000000000000000000000000000000000000000") {
        setOwner(res.data.toString());
        setOwnedBool(1);
        console.log('Not available');
      };
      if (typeof res.data !== "undefined" && res.data.toString() == address) {
        setOwnedBool(0);
        console.log('Available!');

        //createWrapper?.();
      };

      console.log('checking..........')

      console.log('hm2', isConnected , !isWrapped , wrappedMap == 0 , (isTransferred || owned == 6) , (isCreated || createdWrapper == 1));

      console.log('ownedbool');
      console.log(owned);

      console.log('isTransferred', isTransferred)
  
    }
  
    //----------STRING TO BYTES32------------------
  
    React.useEffect(() => {
      console.log('input : ', inputField);

      setOwnedBool(3);
      setCreatedWrapper(0);
      setWrappedMap(0);

      if (typeof inputField !== "undefined" && inputField !== "") {
        const bytes = setBytes((ethers.utils.formatBytes32String(inputField)).toString());
        console.log(bytes);
      }
    }, [inputField]);
  

    //-------------CREATE WRAPPER-------------------------------------
    const { config: createWrapperConfig } = usePrepareContractWrite({
        ...wrapperConfig,
        functionName: 'createWrapper',
        args:inputBytes
      });
    
    
      const {
        data: createData,
        write: createWrapper,
        isLoading: createLoading,
        isSuccess: createStarted,
        error: createError,
      } = useContractWrite(createWrapperConfig);
    
     
  
  
    //-------------transfer---------------------
    const { config: transferConfig } = usePrepareContractWrite({
      ...contractConfig,
      functionName: 'transfer',
      args:[inputBytes,wrapperAddress]
    });
  
  
    const {
      data: transferData,
      write: transfer,
      isLoading: transferLoading,
      isSuccess: transferStarted,
      error: transferError,
    } = useContractWrite(transferConfig);
  

//---------------WRAP-------------------------------------
        const { config: wrapConfig } = usePrepareContractWrite({
            ...wrapperConfig,
            functionName: 'wrap',
            args:inputBytes,
          });
        
        
          const {
            data: wrapData,
            write: wrap,
            isLoading: wrapLoading,
            isSuccess: wrapStarted,
            error: wrapError,
          } = useContractWrite(wrapConfig);

          //console.log(wrapError);
        
         
   
  
      //----------TRACK TRANSACTION - CREATE------------------
  
      const {
        data: crData,
        isSuccess: crSuccess,
        error: crError,
      } = useWaitForTransaction({
        hash: createData?.hash,
      });
  
      const isCreated = crSuccess;

    //----------TRACK TRANSACTION - TRANSFER------------------

    const {
        data: trData,
        isSuccess: trSuccess,
        error: trError,
        } = useWaitForTransaction({
        hash: transferData?.hash,
        });

        const isTransferred = trSuccess;

        


//----------TRACK TRANSACTION - WRAP------------------

    const {
        data: wrData,
        isSuccess: wrSuccess,
        error: wrError,
        } = useWaitForTransaction({
        hash: wrapData?.hash,
        });

        const isWrapped = wrSuccess;

        console.log('note');

        console.log(inputBytes);

        console.log(isConnected, !isWrapped, isTransferred, isCreated, owned );


    //----------WRAPPER CREATED?-------------------

    const { refetch: refetch2 } = useContractRead({
        ...wrapperConfig,
        functionName: 'waitForWrap',
        args:inputBytes,
    });



    //-------------TRANSFERRED TO WRAPPER?----------

    const { refetch: refetch3 } = useContractRead({
        ...contractConfig,
        functionName: 'owner',
        args:inputBytes,
    });

    //-------------IS WRAPPED?----------------------------------------

    const { refetch: refetch4 } = useContractRead({
        ...wrapperConfig,
        functionName: 'nameToId',
        args:inputBytes,
    });

//-------------CLEAR INPUTS---------------------

const clearInputs = () =>{
    setOwnedBool(3);
    setCreatedWrapper(0);
    setWrappedMap(0);

}



//-----------TESTING-----------------------

const check = ()=>{
    console.log('wrapper clicked');
    const hm = {}
    console.log('hm', isConnected , !isWrapped , wrappedMap == 0 , (isTransferred || owned == 6) , (isCreated || createdWrapper == 1));
    wrap?.();
    console.log(wrapData ,wrapLoading, wrapStarted, wrapError);

}


    //------------------HTML-------------------------------------------------
  
    return (
      
      <div className="page">
      <div className="transfercontainer">
        <div className="transfermobile" style={{ flex: '1 1 auto', display: 'column' }}>
          <div className="transfermobile2" style={{ padding: '24px 24px 24px 0' }}>
            <h2 className="pad-bottom15x">Wrap a name</h2>
            {/* {(!isCreated || createdWrapper !== 1) && (!isTransferred || owned !==6) && (!isWrapped || createdWrapper !==1 )  &&( */}
            <TextField 
                sx={{ input: { color: 'white' } }} 
                className="white" 
                id="outlined-basic" 
                label="Name" 
                variant="outlined"
                value={inputField} 
                onChange={(e) => setField(e.target.value)} 
            />
            {/* )} */}
            {owned==4 && (
              <p className="error-message" style={{ marginTop: 24, color: 'red' }}>
                 Not registered
              </p>
            )}
            {owned==1 && (
              <p className="error-message" style={{ marginTop: 24, color: 'red' }}>
                Uavailable, <a href={`https://etherscan.io/address/${currentOwner}`} target="_blank" rel="noopener noreferrer">owner</a>
              </p>
            )}
            {owned==0 && (
              <p className="error-message" style={{ marginTop: 24, color: '#9afa92' }}>
                Available
              </p>
            )}
  
            {crError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {crError.message}
              </p>
            )}

            {trError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {trError.message}
              </p>
            )}

            {wrError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {wrError.message}
              </p>
            )}
            {owned !== 0 && owned !==6 &&(
            <Button
                size="large"
                variant="contained"
                color="secondary"
                style={{ marginTop: 24, }}
                className="white search"
                onClick={handleClick}
              >
                Check
            </Button>
            )}
 
  
            {isConnected && !isCreated && owned == 0 && createdWrapper !== 1 &&(
              <Button
                size="large"
                variant="contained"
                color="success"
                style={{ marginTop: 24, }}
                disabled={createLoading || createStarted}
                className="white button mobile-button"
                onClick={() => createWrapper?.()}
              >
                {createLoading && 'Pending...'}
                {createStarted && 'Creating...'}
                {!createLoading && !createStarted && 'Create Wrapper'}
              </Button>
            )}

            {isConnected && !isTransferred && (isCreated || createdWrapper == 1) && owned == 0 &&(
              <Button
                size="large"
                variant="contained"
                color="success"
                disabled={transferLoading || transferStarted}
                style={{ marginTop: 24, }}
                className="white button mobile-button"
                onClick={() => transfer?.()}
              >
                {transferLoading && 'Pending...'}
                {transferStarted && 'Transferring...'}
                {!transferLoading && !transferStarted && 'Transfer to Wrapper'}
              </Button>
            )}

            {isConnected && (!isWrapped || wrappedMap == 0 ) && (isTransferred || owned == 6) && (isCreated || createdWrapper == 1) &&(
              <Button
                size="large"
                variant="contained"
                color="success"
                disabled={wrapLoading || wrapStarted}
                style={{ marginTop: 24, }}
                className="white button mobile-button"
                onClick={() => check?.()}
              >
                {wrapLoading && 'Pending...'}
                {wrapStarted && 'Wrapping...'}
                {!wrapLoading && !wrapStarted && 'Wrap'}
              </Button>
            )}
          </div>
        </div>
      
  
        <div style={{ flex: '0 0 auto' }}>
          <FlipCard>
            <FrontCard isCardFlipped={isWrapped || wrappedMap == 1}>
              
            <div className="main-img gradient center-content" style={{ padding: 24 }}>
            <h1>{inputField}</h1>
            </div>
              
            </FrontCard>
            <BackCard isCardFlipped={isWrapped || wrappedMap == 1}>
              <div className="main-img gradient center-content" style={{ padding: 24 }}>
                <Stack spacing={2}>
                <h1 >{inputField} wrapped!</h1>
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
                    Explore the original contract
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
export default Wrapper;