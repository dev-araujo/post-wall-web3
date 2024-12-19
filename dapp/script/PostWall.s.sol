// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import {Script, console} from "forge-std/Script.sol";
import {PostWall} from "../src/PostWall.sol";

contract CounterScript is Script {
    PostWall public postWall;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        postWall = new PostWall();

        vm.stopBroadcast();
    }
}
