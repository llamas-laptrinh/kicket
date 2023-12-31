//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

// import "vrc25/contracts/VRC25.sol";
//Console functions to help debug the smart contract just like in Javascript
import "hardhat/console.sol";
//OpenZeppelin's NFT Standard Contracts. We will extend functions from this in our implementation
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTMarketplace is ERC721URIStorage {
    //_tokenIds variable has the most recent minted tokenId
    uint256 private _tokenIds;
    //Keeps track of the number of items sold on the marketplace
    uint256 private _itemsSold;
    //owner is the contract address that created the smart contract
    address payable owner;
    //The fee charged by the marketplace to be allowed to list an NFT
    uint256 listPrice = 0.01 ether;

    //The structure to store info about a listed token
    struct ListedToken {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool currentlyListed;
        uint256 endSaleTime;
    }

    //the event emitted when a token is successfully listed
    event TokenListedSuccess(
        uint256 indexed tokenId,
        address owner,
        address seller,
        uint256 price,
        bool currentlyListed
    );

    //This mapping maps tokenId to token info and is helpful when retrieving details about a tokenId
    mapping(uint256 => ListedToken) private idToListedToken;

    constructor() ERC721("Kicket Marketplace", "KETMK") {
        owner = payable(msg.sender);
    }

    function getListedTokenForId(
        uint256 tokenId
    ) public view returns (ListedToken memory) {
        return idToListedToken[tokenId];
    }

    //The first time a token is created, it is listed here
    function createToken(string memory tokenURI) public returns (uint) {
        //Increment the tokenId counter, which is keeping track of the number of minted NFTs
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;

        //Mint the NFT with tokenId newTokenId to the address who called createToken
        _safeMint(msg.sender, newTokenId);
        // _mint(msg.sender, newTokenId);
        //Map the tokenId to the tokenURI (which is an IPFS URL with the NFT metadata)
        _setTokenURI(newTokenId, tokenURI);

        //Helper function to update Global variables and emit an event
        // createListedToken(newTokenId, price);
        idToListedToken[newTokenId] = ListedToken(
            newTokenId,
            payable(address(this)),
            payable(msg.sender),
            0,
            false,
            block.timestamp
        );

        emit TokenListedSuccess(
            newTokenId,
            address(this),
            msg.sender,
            0,
            false
        );
        return newTokenId;
    }

    fallback() external payable {}

    receive() external payable {}

    function listToken(
        uint256 tokenId,
        uint256 price,
        uint256 endSaleTime
    ) public payable {
        createListedToken(tokenId, price, endSaleTime);
    }

    function unListToken(uint256 tokenId) public {
        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        idToListedToken[tokenId].currentlyListed = false;
    }

    function createListedToken(
        uint256 tokenId,
        uint256 price,
        uint256 endSaleTime
    ) private {
        //Make sure the sender sent enough ETH to pay for listing
        require(msg.value == listPrice, "Hopefully sending the correct price");
        //Just sanity check
        require(price > 0, "Make sure the price isn't negative");

        //Update the mapping of tokenId's to Token details, useful for retrieval functions
        require(
            idToListedToken[tokenId].currentlyListed == false,
            "NFTs have listed"
        );

        idToListedToken[tokenId].currentlyListed = true;
        idToListedToken[tokenId].price = price;
        idToListedToken[tokenId].endSaleTime = endSaleTime;
        _transfer(msg.sender, address(this), tokenId);
        //Emit the event for successful transfer. The frontend parses this message and updates the end user
        emit TokenListedSuccess(
            tokenId,
            address(this),
            msg.sender,
            price,
            true
        );
    }

    //This will return all the NFTs currently listed to be sold on the marketplace
    function getAllNFTs() public view returns (ListedToken[] memory) {
        uint nftCount = _tokenIds;
        ListedToken[] memory tokens = new ListedToken[](nftCount);
        uint currentIndex = 0;

        //at the moment currentlyListed is true for all, if it becomes false in the future we will
        //filter out currentlyListed == false over here
        for (uint i = 0; i < nftCount; i++) {
            uint currentId = i + 1;
            if (idToListedToken[currentId].currentlyListed) {
                ListedToken storage currentItem = idToListedToken[currentId];
                tokens[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        //the array 'tokens' has the list of all NFTs in the marketplace
        return tokens;
    }

    //Returns all the NFTs that the current user is owner or seller in
    function getMyNFTs() public view returns (ListedToken[] memory) {
        uint totalItemCount = _tokenIds;
        uint itemCount = 0;
        uint currentIndex = 0;

        //Important to get a count of all the NFTs that belong to the user before we can make an array for them
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToListedToken[i + 1].owner == msg.sender ||
                idToListedToken[i + 1].seller == msg.sender
            ) {
                itemCount += 1;
            }
        }

        //Once you have the count of relevant NFTs, create an array then store all the NFTs in it
        ListedToken[] memory items = new ListedToken[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToListedToken[i + 1].owner == msg.sender ||
                idToListedToken[i + 1].seller == msg.sender
            ) {
                uint currentId = i + 1;
                ListedToken storage currentItem = idToListedToken[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        uint price = idToListedToken[tokenId].price;
        address seller = idToListedToken[tokenId].seller;
        require(
            block.timestamp > idToListedToken[tokenId].endSaleTime,
            "Sale time was ended"
        );
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

        //update the details of the token
        idToListedToken[tokenId].currentlyListed = true;
        idToListedToken[tokenId].seller = payable(msg.sender);
        _itemsSold += 1;

        //Actually transfer the token to the new owner
        _transfer(address(this), msg.sender, tokenId);
        //approve the marketplace to sell NFTs on your behalf
        approve(address(this), tokenId);

        //Transfer the listing fee to the marketplace creator
        payable(owner).transfer(listPrice);
        //Transfer the proceeds from the sale to the seller of the NFT
        payable(seller).transfer(msg.value);
    }
}
