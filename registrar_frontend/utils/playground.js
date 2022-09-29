// import { useAccount } from 'wagmi';

const { ethers } = require('ethers')

const keccak256 = require('keccak256')

const { MerkleTree } = require('merkletreejs')

const allowlist =require('./allowlist2.json');

const hashListFile = require('./hashList.json');




// function encodeLeaves(allowlist) {
//     var hashList = [];

//     Object.entries(allowlist).forEach(([key, value]) => {
//         //console.log(encodeLeaf(key, value));
//         hashList = hashList.concat(encodeLeaf(key, value))
//       });

//     return hashList;
// }


  

// function getProof(address) {
//     console.log('spot#: ', allowlist[address])
//     const hashItem = encodeLeaf(address, allowlist[address])
//     console.log(hashItem);
    
//     if (hashItem && typeof hashItem !== 'undefined'){
//         console.log('in if statement');
//         console.log('PROOF', getMerkleTree().getHexProof(keccak256(hashItem)));
//         return getMerkleTree().getHexProof(keccak256(hashItem ?? ''));
//   }
// }

// const hashList = encodeLeaves(allowlist)

// const merkleTree = new MerkleTree(hashList, keccak256, {
//     hashLeaves: true,
//     sortPairs: true
// })


// function getMerkleTree() {

//     const hashList = encodeLeaves(allowlist)



//     //if (!merkleTree) {
//     const leaves = hashList.map((hashList) => keccak256(hashList));
//     const merkleTree = new MerkleTree(leaves, keccak256, { hashLeaves: true, sortPairs: true });
//     //}
//     //console.log('merkle tree: ', merkleTree)
//     //console.log('Whitelist Merkle Tree\n', merkleTree.toString());
//     return merkleTree;
//   }




// console.log('tree root is: ')
// console.log( merkleTree.getHexRoot());

// const leaf = keccak256(hashList[0]);
// console.log('leaf');
// console.log(leaf);

// const proof = merkleTree.getHexProof(leaf);
// //console.log('proof');
// //console.log(proof)


// const isAllowed = merkleTree.getLeafIndex(Buffer.from(leaf))

//console.log('isallowed');
//console.log(isAllowed)




//---------IGNORE ABOVE---------------------

//const fs = require('fs');

function encodeLeaf(address, spots) {
    return ethers.utils.defaultAbiCoder.encode(["address", "uint64"],[address, spots])
}

function encodeLeaves(allowlist) {
    var hashList = [];

    Object.entries(allowlist).forEach(([key, value]) => {
        //console.log(encodeLeaf(key, value));
        hashList = hashList.concat(encodeLeaf(key, value))
      });

      var fs = require('fs');

      require('fs').writeFile(

        'hashList.json',
    
        JSON.stringify(hashList),
    
        function (err) {
            if (err) {
                console.error('Crap happens');
            }
        }
    );

    return hashList;
}


function getLeafProof(address){
    if( checkAllocation(address) < 1 ){
        return -1
    }

    const hashItem = encodeLeaf(address, checkAllocation(address));
    const leaf = keccak256(hashItem);
    console.log('leaf');
    console.log(leaf)

    const merkleTree = getMerkleTree();
    console.log('proof');
    

    const proof = merkleTree.getHexProof(leaf);
    console.log(proof)

    return proof

}


function getMerkleTreeRoot(){
    const hashList = encodeLeaves(allowlist)

    //const hashList = hashListFile;

    const merkleTree = new MerkleTree(hashList, keccak256, {
        hashLeaves: true,
        sortPairs: true
    })

    return merkleTree.getHexRoot()

}


function checkAllowlisted(address) {

    if( checkAllocation(address) < 1 ){
        return -1
    }

    hashItem = encodeLeaf(address, checkAllocation(address));
    const leaf = keccak256(hashItem);


    const merkleTree = getMerkleTree();

    if (address && typeof address !== 'undefined'){
        const isAllowed = merkleTree.getLeafIndex(Buffer.from(leaf))
        return (
            isAllowed
          );
    }


}

function checkAllocation(address){
    if(allowlist[address]){
        return allowlist[address]
    }
    return 0
}




function getMerkleTree(){
    const hashList = encodeLeaves(allowlist)

    //const hashList = hashListFile;

    const merkleTree = new MerkleTree(hashList, keccak256, {
        hashLeaves: true,
        sortPairs: true
    })

    return merkleTree

}




console.log('Playground')

console.log(getLeafProof('0x8802cF6b248a4136b1C8172375245a85108cDc30'))

console.log(checkAllowlisted('0x8802cF6b248a4136b1C8172375245a85108cDc30'))


console.log('root is:')
console.log(getMerkleTreeRoot())

//["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2","0x277c9cbe75782653fdaf6fee11662e13f4bfcdccf4041475b83d65ee59207b0b","0x5e7e1cdea98b9e730a4ff16edd3c87e9a1d862b4e2e7a90f0d9444a511a3b1dc"]
