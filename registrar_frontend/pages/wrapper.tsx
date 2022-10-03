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

    const wrapperAddress = "0x2Cc8342d7c8BFf5A213eb2cdE39DE9a59b3461A7";


    const [inputField, setField] = React.useState<string>('Name');
    const [addressField, setAddressField] = React.useState<string>();
    const [inputBytes, setBytes] = React.useState<string>();
    const [owned, setOwnedBool] = React.useState(3);
    const [createdWrapper, setCreatedWrapper] = React.useState(0);
    const [wrappedMap, setWrappedMap] = React.useState(0);
    const [currentOwner, setOwner] = React.useState<string>();
    const[wrappedOwner, setWrappedOwner] = React.useState('');
  
    const { isConnected } = useAccount();
    const { address, isConnecting, isDisconnected } = useAccount();

    const account = useAccount({
      onConnect({ address, connector, isReconnected }) {
        console.log('Connected', { address, connector, isReconnected })
      },
    });
  
    console.log(account);

    const wrapperConfig = {
        addressOrName: wrapperAddress,
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
      setWrappedOwner('');




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
      console.log(res4.data);
      console.log('res4above');


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


        setWrappedMap((ethers.BigNumber.from(res4.data)).toNumber());
        //const isTransferred = true;
        console.log((ethers.BigNumber.from(res4.data)).toNumber());

        const res6 = await refetch6();
        console.log(res6.data);
        console.log('res6abovezzz');

        // const { refetch: refetch7 } = useContractRead({
        //     ...wrapperConfig,
        //     functionName: 'tokenOfOwnerByIndex',
        //     args:[address, (ethers.BigNumber.from(res4.data)).toNumber()],
        // });

        // console.log(refetch7);
        // console.log('refetch7 above');
    
        // const fetchrs6 = async ()=>{
        //     console.log('wrappppedmap', wrappedMap);
        //       const res6 = await refetch6();
        //       console.log('r6data');
        //       console.log(res6);
        //       //console.log(res4.data?.BigNumber);
        //       //console.log((ethers.BigNumber.from(res4.data)).toNumber());
        
        //       if (typeof res6.data !== "undefined" && res6.data.toString() == address) {
        
        //         setWrappedOwner(res6.data.toString());
        //       };
        //     }

        //     fetchrs6();


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
      setWrappedOwner('');

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
    const { config: wrapConfig2 } = usePrepareContractWrite({
        addressOrName: wrapperAddress,
        contractInterface: wrapperInterface,
        functionName: 'wrap',
        args:inputBytes,
        });
    
    
    const {
        data: wrapData,
        write: wrap,
        isLoading: wrapLoading,
        isSuccess: wrapStarted,
        error: wrapError,
        } = useContractWrite(wrapConfig2);

          //console.log(wrapError);
        
//---------OTHER WRAP-----------
    const{data: wr2Data, write: contractWrap, isLoading: wr2Loading, isSuccess: wr2Started, error: wr2Error}  = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: wrapperAddress,
        contractInterface: wrapperInterface,
        functionName: 'wrap',
        args:inputBytes,
    })
         

    //-----------UNWRAP-------------------------
    const{data: uwr2Data, write: contractUnwrap, isLoading: uwr2Loading, isSuccess: uwr2Started, error: uwr2Error}  = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: wrapperAddress,
        contractInterface: wrapperInterface,
        functionName: 'unwrap',
        args:wrappedMap,
    })
  
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
        hash: wr2Data?.hash,
        });

        const isWrapped = wrSuccess;

        console.log('note');

        console.log(inputBytes);

        console.log(isConnected, !isWrapped, isTransferred, isCreated, owned );


        React.useEffect(() => {
      
            if (isWrapped) {
              //const bytes = setBytes((ethers.utils.formatBytes32String(inputField)).toString());
              //console.log(bytes);
              const fetchrs4 = async ()=>{
                const res4 = await refetch4();

                console.log('bignumberdata');

                if (typeof res4.data !== "undefined" && (ethers.BigNumber.from(res4.data)).toNumber() !== 0) {
  
                  console.log('is name wrapped?')
                  console.log(res4.data._hex);
          
          
                  setWrappedMap((ethers.BigNumber.from(res4.data)).toNumber());
                  //const isTransferred = true;
                  console.log('Wrapped!!');
                };
              }
              fetchrs4();


            }
          }, [isWrapped]);



          React.useEffect(() => {

            if (wrappedMap !== 0){
                const fetchrs6 = async ()=>{
                    const res6 = await refetch6();
                    console.log('r66666666', res6.data);
        
                        if (typeof address !== "undefined" && typeof res6.data !== "undefined" && res6.data.toString() == address) {
        
                            setWrappedOwner(address.toString());
                        };
                      }
                fetchrs6();
        
            }

        }, [wrappedMap]);



    //----------TRACK TRANSACTION UNWRAP--------------
    const {
        data: uwrData,
        isSuccess: uwrSuccess,
        error: uwrError,
        } = useWaitForTransaction({
        hash: uwr2Data?.hash,
        });

        const isUnwrapped = uwrSuccess;



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

    const { refetch: refetch4 } =  useContractRead({
        ...wrapperConfig,
        functionName: 'nameToId',
        args:inputBytes,
    });



    //----------WRAPPED OWNED?-------------
    //tokenOfOwnerByIndex

    const { refetch: refetch6 } = useContractRead({
        ...wrapperConfig,
        functionName: 'ownerOf',
        args:wrappedMap,
    });


//-----------TESTING-----------------------

const check = ()=>{
    console.log('wrapper clicked');
    console.log(inputBytes)
    const hm = {}
    console.log('hm', isConnected , !isWrapped , wrappedMap == 0 , (isTransferred || owned == 6) , (isCreated || createdWrapper == 1));

    //const letsWrap = wrap?.();

    console.log('type');
    console.log(typeof contractWrap);

    if (typeof contractWrap !== "undefined"){
        contractWrap();
    }

    

    console.log(wrapData ,wrapLoading, wrapStarted, wrapError);

}


const unwrapcheck = ()=>{


    if (typeof contractUnwrap !== "undefined"){
        contractUnwrap();
    }

    

    console.log(wrapData ,wrapLoading, wrapStarted, wrapError);

}


    //------------------HTML-------------------------------------------------
  
    return (
      
      <div className="page">
      <div className="transfercontainer">

        
      <h3 className="pad-bottom pad-top transfermobile2">Create wrapper → Transfer to Wrapper → Wrap</h3>
        <div className="transfermobile" style={{ flex: '1 1 auto', display: 'column' }}>
          <div className="transfermobile2" style={{ padding: '24px 24px 24px 0' }}>
            <h4 className="pad-bottom15x">Wrap or Unwrap a name</h4>
            {/* {(!isCreated || createdWrapper !== 1) && (!isTransferred || owned !==6) && (!isWrapped || createdWrapper !==1 )  &&( */}
            <TextField 
                sx={{ input: { color: 'white' } }} 
                className="white" 
                id="outlined-basic" 
                disabled={createLoading || createStarted || wrapLoading || wrapStarted}
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

            {uwrError && (
              <p style={{ marginTop: 24, color: '#FF6257' }}>
                Error: {uwrError.message}
              </p>
            )}

            {isUnwrapped && (
                        <p style={{ marginTop: 24, color: '#9afa92' }}>
                            Unwrapped!
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
                disabled={wr2Loading || wr2Started || isWrapped}
                style={{ marginTop: 24, }}
                className="white button mobile-button"
                onClick={() => check()}
              >
                {wr2Loading && 'Pending...'}
                {wr2Started && 'Wrapping...'}
                {!wr2Loading && !wr2Started && 'Wrap'}
              </Button>
            )}

        {isConnected && wrappedMap !== 0 && wrappedOwner == address &&(
              <Button
                size="large"
                variant="contained"
                color="success"
                disabled={uwr2Loading || uwr2Started || isUnwrapped}
                style={{ marginTop: 24, }}
                className="white button mobile-button"
                onClick={() => unwrapcheck()}
              >
                {uwr2Loading && 'Pending...'}
                {uwr2Started && 'Unwrapping...'}
                {!uwr2Loading && !uwr2Started && 'Unwrap'}
              </Button>
            )}

            
          </div>
        </div>
      
  
        <div style={{ flex: '0 0 auto' }}>
          <FlipCard>
            <FrontCard isCardFlipped={(isWrapped || wrappedMap !== 0) && !uwr2Loading}>
              
            <div className="main-img gradient center-content" style={{ padding: 24 }}>
            <h1>{inputField}</h1>
            </div>
              
            </FrontCard>
            <BackCard isCardFlipped={(isWrapped || wrappedMap !== 0) && !uwr2Loading}>
              <div className="main-img gradient center-content" style={{ padding: 24 }}>
                <Stack spacing={2}>
                <h1 >{inputField}</h1>
                <p >
                  View on{' '}
                  <a href={'https://opensea.io/collection/linageenamewrapper'} target="_blank" rel="noopener noreferrer">
                    Opensea
                  </a>
                </p>
                <p >
                  View on{' '}
                  <a href={`https://etherscan.io/tx/${wr2Data?.hash}`} target="_blank" rel="noopener noreferrer">
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