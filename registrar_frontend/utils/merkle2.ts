import { ethers } from 'ethers';
import keccak256 from 'keccak256';
import { useAccount } from 'wagmi';
import allowlistImport from './allowlist2.json';
import hashListFile from './hashList.json';

const { MerkleTree } = require('merkletreejs')


const allowlist: {[key: string]: number} = allowlistImport;
let merkleTree: typeof MerkleTree;


function encodeLeaf(address: string, spots: number) {
  return ethers.utils.defaultAbiCoder.encode(["address", "uint64"],[address, spots])
}

function encodeLeaves(allowlist: {[key: string]: number}) {
  var hashList: string[] = [];

  Object.entries(allowlist).forEach(([key, value]) => {
    //console.log(encodeLeaf(key, value));
    hashList = hashList.concat(encodeLeaf(key, value))
  });

return hashList;
}


export function getLeafProof(address: string){
  if( checkAllocation(address) < 1 ){
      return -1
  }

  const hashItem = encodeLeaf(address, checkAllocation(address));
  const leaf = keccak256(hashItem);
  //console.log('leaf');
  //console.log(leaf)

  const merkleTree = getMerkleTree();
  //console.log('proof');
  

  const proof = merkleTree.getHexProof(leaf);
  //console.log(proof)

  return proof

}


export function getMerkleTreeRoot(){

  //const hashList = encodeLeaves(allowlist)
  const hashList = hashListFile;

  const merkleTree = new MerkleTree(hashList, keccak256, {
      hashLeaves: true,
      sortPairs: true
  })

  console.log('hex root is: ', merkleTree.getHexRoot())
  return merkleTree.getHexRoot()

}


export function checkAllowlisted(address: string) {

  if( checkAllocation(address) < 1 ){
      return -1
  }

  const hashItem = encodeLeaf(address, checkAllocation(address));
  const leaf = keccak256(hashItem);


  const merkleTree = getMerkleTree();

  if (address && typeof address !== 'undefined'){
      const isAllowed = merkleTree.getLeafIndex(Buffer.from(leaf))
      return (
          isAllowed
        );
  }


}


export function checkAllocation(address: string){
  if(allowlist[address]){
    console.log('alllo: ', allowlist[address]);
    return allowlist[address]
  }
  return 0
}




function getMerkleTree(){
  //const hashList = encodeLeaves(allowlist)

  const hashList = hashListFile;

  const merkleTree = new MerkleTree(hashList, keccak256, {
      hashLeaves: true,
      sortPairs: true
  })

  return merkleTree

}
