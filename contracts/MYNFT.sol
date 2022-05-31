//SPDX-License-Identifier: Unlicense

pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract myNFT is ERC721URIStorage,Ownable{
         using Counters for Counters.Counter;

         Counters.Counter private _tokenId;

         constructor() ERC721("code dev","CD"){}

         function mintNFT(address recipient,string memory tokenURI) public onlyOwner returns(uint256){
                _tokenId.increment();

                uint256 newItemId = _tokenId.current();
                _mint(recipient,newItemId);
                _setTokenURI(newItemId,tokenURI);

                return newItemId;
         }
}