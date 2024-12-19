// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract PostWall {
    struct Message {
        address sender;
        string text;
        uint256 timestamp;
    }

    Message[] public messages;

    event NewMessage(address indexed sender, string text, uint256 timestamp);

    function sendMessage(string memory _text) public {
        require(bytes(_text).length > 0, "Message cannot be empty");

        Message memory newMessage = Message(msg.sender, _text, block.timestamp);
        messages.push(newMessage);

        emit NewMessage(msg.sender, _text, block.timestamp);
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }
}
