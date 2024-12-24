// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

contract PostWall {
    struct Post {
        address author;
        string message;
        uint256 timestamp;
    }

    Post[] public posts;

    event PostCreated(address indexed author, string message, uint256 timestamp);

    function createPost(string memory _message) public {
        require(bytes(_message).length > 0, "Message cannot be empty");
        posts.push(Post(msg.sender, _message, block.timestamp));
        emit PostCreated(msg.sender, _message, block.timestamp);
    }

    function getPosts() public view returns (Post[] memory) {
        return posts;
    }
}