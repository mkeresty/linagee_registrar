import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import router, { useRouter } from 'next/router';
import Link from 'next/link';
import AdbIcon from '@mui/icons-material/Adb';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import LNR from '../utils/lnr-ethers-module-1.1.0.mjs';
import { useUnmountEffect } from 'framer-motion';
import { getProvider } from '@wagmi/core';
import { useSigner } from 'wagmi';
import { ethers } from 'ethers';

import { resolve } from '../utils/lnrtools'

const pages = [
  { name: "Mint", url: "/" },
  { name: "Transfer", url: "/transfer" },
  { name: "Wrap", url: "/wrapper" },
  { name: "History", url: "/history" },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const [name, setName] = useState<string>("CONNECT")
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const provider = getProvider({
    chainId: 1,
  })

  const { address, isConnected } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()
  const { data: signer, isError, isLoading } = useSigner()

  const handleName = async(address: string) =>{
    //console.log("siugner is ", signer)


    if(!signer){
      return
    }
    var lnr = new LNR(ethers, signer);

    try{
      var name = await lnr.lookupAddress(address);
      if(name){
        setName(name)
      }
      else{
        setName(address.substring(0,6) + "..." + address.slice(address.length-4))
      }
    } 
    catch(e){
      setName(address.substring(0,6) + "..." + address.slice(address.length-4))
    }
  }



  React.useEffect(()=>{

    //console.log("address is ", address)
    if(address){
    const tryConnect = async () => {
      await handleName(address);
    }

    tryConnect()
  }

  })

  return (
    <AppBar position="static" className="sketch-font">
      <Container  maxWidth="xl">
        <Toolbar  disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'inherit',
              fontWeight: 700,
              letterSpacing: '.15rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img width="50px" height="50px" src={'LNR_L_Icon_White.svg'} />
          </Typography>
          

          <Box  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
            className="sketch-font"
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              
              sx={{
                display: { xs: 'block', md: 'none' },
                
              }}
            >
              {pages.map((page) => (
                <Link key={page.name}  href={`${page.url}`} >
                <MenuItem className="sketch-font" key={page.name} onClick={handleCloseNavMenu} >
                  <Typography key={page.name}   fontFamily="inherit" textAlign="center" sx={{fontSize: 'h6.fontSize', fontWeight: 700,}}>{page.name}</Typography>
                </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'inherit',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            
          </Typography>
          <Box className="sketch-font" sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link key={page.name} href={`${page.url}`}>
              <Button
              className="sketch-font"
              href={page.url}
                key={page.name}
                onClick={() => { 
                  //router.push(`${page.url}`);
                  handleCloseNavMenu;
                  }
                }
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
                {/* <ConnectButton /> */}
                {!isConnected && (
                <Button                 
                className="lower"
                size="large"
                variant="outlined"
                color="secondary"
                 onClick={() => connect()}>Connect</Button>
                )}
                {isConnected && (
                <Button         
                className="lower"        
                size="large"
                variant="outlined"
                color="secondary"
                onClick={() => disconnect()}>{name}</Button>
                )}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
