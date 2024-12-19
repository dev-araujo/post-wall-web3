// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "forge-std/Test.sol";
import "../src/PostWall.sol";

contract PostWallTest is Test {
    PostWall public postWall;

    function setUp() public {
        postWall = new PostWall();
    }

    function testSendMessage() public {
        string memory messageText = "Hello, world!";
        postWall.sendMessage(messageText);

        PostWall.Message memory message;
        (message.sender, message.text, message.timestamp) = postWall.messages(
            0
        );

        assertEq(message.sender, address(this));
        assertEq(message.text, messageText);
        assertGt(message.timestamp, 0);
    }

    function testGetMessages() public {
        string memory messageText = "Hello again!";
        postWall.sendMessage(messageText);

        PostWall.Message[] memory allMessages = postWall.getMessages();
        assertEq(allMessages.length, 1);
        assertEq(allMessages[0].text, messageText);
    }

    function testEmptyMessage() public {
        vm.expectRevert(bytes("Message cannot be empty"));
        postWall.sendMessage("");
    }
}
