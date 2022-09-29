import keccak256 from 'keccak256';
import { useAccount } from 'wagmi';

const { MerkleTree } = require('merkletreejs')

import allowlist from './allowlist.json';



let merkleTree: typeof MerkleTree;


function getMerkleTree() {



  if (!merkleTree) {
    const leaves = allowlist.map((address: any) => keccak256(address));
    merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  }
  //console.log('merkle tree: ', merkleTree)
  //console.log('Whitelist Merkle Tree\n', merkleTree.toString());
  return merkleTree;
}

export function getProof(address: string) {
  //console.log('ADDY#: ', address)
  
  if (address && typeof address !== 'undefined'){
    //console.log('PROOF', getMerkleTree().getHexProof(keccak256(address)));
    return getMerkleTree().getHexProof(keccak256(address ?? ''));
}

  
}

export function checkAllowlisted(address: string) {
    if (address && typeof address !== 'undefined'){
        const isAllowed = getMerkleTree().getLeafIndex(Buffer.from(keccak256(address ?? ''))) >= 0
        return (
            isAllowed
          );
    }


}
