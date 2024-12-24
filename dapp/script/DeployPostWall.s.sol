// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "forge-std/Script.sol";
import "../src/PostWall.sol";

contract DeployPostWallScript is Script {
    function run() public returns (PostWall) {
        vm.startBroadcast();
        PostWall postWall = new PostWall();
        vm.stopBroadcast();
        return postWall;
    }
}