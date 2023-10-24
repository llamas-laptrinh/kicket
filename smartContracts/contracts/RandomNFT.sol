

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17URIStorage.sol";

import "@klaytn/contracts/access/Ownable.sol";

import "@bisonai/orakl-contracts/src/v0.1/VRFConsumerBase.sol";

import "@bisonai/orakl-contracts/src/v0.1/interfaces/IVRFCoordinator.sol";

contract SageBadgeNFT is KIP17URIStorage, VRFConsumerBase, Ownable {

   IVRFCoordinator COORDINATOR;

    // Events

    event NftRequested(uint256 indexed requestId, address requester);

    event NftMinted(SageBadge sageBadge, address minter);

    enum SageBadge {

        sophos, 

        agathos, 

        spoudaios, 

        sphairos

    }

    mapping(uint256 => address) public s_requestIdToSender;

    uint256 public s_randomResult;

    address payable sOwner;

    uint256 private s_tokenCounter;

    uint256 public mintFee = 1 * 10**18;

    bytes32 keyHash = 0xd9af33106d664a53cb9946df5cd81a30695f5b72224ee64e798b278af812779c;

    uint32 callbackGasLimit = 500000;

    uint32 numWords = 1;

// VRF Coordinator contract address

// https://baobab.scope.klaytn.com/account/0x6B4c0b11bd7fE1E9e9a69297347cFDccA416dF5F

    constructor(address coordinator)

        VRFConsumerBase(coordinator)

        KIP17("Sage Badge NFT", "SBN")

    {

        COORDINATOR = IVRFCoordinator(coordinator);

        sOwner = payable(owner());

    }

    receive() external payable {}

    function requestRandomNFT()

        public

        payable

        returns (uint256 requestId)

    {

        require(msg.value == mintFee, "Mint Fee not enough");

        requestId = COORDINATOR.requestRandomWords{value: msg.value}(

            keyHash,

            callbackGasLimit,

            numWords,

            address(this)

        );

        s_requestIdToSender[requestId] = _msgSender();

        emit NftRequested(requestId, _msgSender());

    }

    function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)

        internal

        override

    {

        address nftOwner = s_requestIdToSender[requestId];

        uint256 newItemId = s_tokenCounter;

        s_randomResult = randomWords[0] % 111;

        SageBadge nftSageType = getSageTypeFromRarity(s_randomResult);

        string memory tokenUri = getRandomizedTokenUri(uint256(nftSageType));

        _safeMint(nftOwner, newItemId);

        _setTokenURI(newItemId, tokenUri);

        s_tokenCounter = s_tokenCounter + 1;

        emit NftMinted(nftSageType, nftOwner);

    }

    function getChanceArray() public pure returns (uint8[4] memory) {

        // index 0 -> 15-0: 5% chance: sophos

        // index 1: 30-10: 20% chance: agathos

        // index 2: 65-30: 35% chance: spoudaios

        // index 3: 110-65: 45% chance: sphairos

        return [10, 25, 50, 110];

    }

    function getSageTypeFromRarity(uint256 randomNumber)

        public

        pure

        returns (SageBadge sageBadge)

    {

        uint256 chanceSum = 0;

        uint8[4] memory chanceArray = getChanceArray();

        // loop through chanceArray: [15,30, 65, 110]

        for (uint256 i = 0; i < chanceArray.length; i++) {

            if (

                randomNumber >= chanceSum && randomNumber < chanceArray[i]

            ) {

                // if randomNumber: 0-14 => sophos

                // 15-29 => agathos ,

                // 30-64 => spoudaios

                // 65-110 => sphairos

                return SageBadge(i);

            }

            chanceSum = chanceArray[i];

        }

    }

    function getRandomizedTokenUri(uint256 randomNum)

        internal

        pure

        returns (string memory uri)

    {

        string[4] memory tokenUri = [

            "https://gateway.pinata.cloud/ipfs/QmczSfe1Z8hkuRFhEQR6DY6KaMEo2jbGNMXqdLZhvTbVSP/1_%20agathos.json",

            "https://gateway.pinata.cloud/ipfs/QmczSfe1Z8hkuRFhEQR6DY6KaMEo2jbGNMXqdLZhvTbVSP/2_%20sophos.json",

            "https://gateway.pinata.cloud/ipfs/QmczSfe1Z8hkuRFhEQR6DY6KaMEo2jbGNMXqdLZhvTbVSP/3_%20sphairos.json",

            "https://gateway.pinata.cloud/ipfs/QmczSfe1Z8hkuRFhEQR6DY6KaMEo2jbGNMXqdLZhvTbVSP/4_%20spoudaios.json"

        ];

        return tokenUri[randomNum];

    }

    function withdraw() public onlyOwner {

        require(sOwner.send(address(this).balance));

    }

    // getter functions

    function getMintFee() public view returns (uint256) {

        return mintFee;

    }

    function getTokenCounter() public view returns (uint256) {

        return s_tokenCounter;

    }

}