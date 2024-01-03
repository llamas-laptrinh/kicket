//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.19;

contract MarketplaceAuction {
    struct Auction {
        uint256 tokenId;
        uint256 currentBidPrice;
        address payable currentBidPriceAddress;
        uint256 endAuction; // Timestamp for the end day&time of the auction
        uint256 bidCount;
    }

    constructor() {}

    // Auction

    function getAuction() public {}

    function createAuction() public view {}

    function placeBid() public view {}

    function claimNFT() public view {}

    // end auction
}
