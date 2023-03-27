// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

contract PollingContract {
    struct Poll {
        uint id;
        string topic;
        string[] options;
        uint256[] votes;
    }

    uint256 public _pollId;

    mapping(uint => Poll) public polls;

    mapping (address => mapping (uint256 => bool) ) public hasVoted;

    function CreatePoll(string memory _topic, string[] memory _options)
        public
        returns (Poll memory)
    {
        require(
            bytes(_topic).length > 0 && _options.length > 0,
            "Incomplete parameters"
        );
        ++_pollId;
        polls[_pollId] = Poll({
            id: _pollId,
            topic: _topic,
            options: _options,
            votes: new uint256[](_options.length)
        });
        return polls[_pollId];
    }

    function getPoll(uint256 pollId) public view returns (Poll memory poll) {
        return polls[pollId];
    }

    function vote(uint256 pollId, uint256 optionIndex)
        public
        returns (uint256)
    {
        require(!(hasVoted[msg.sender][pollId]), "You have voted already");
        polls[pollId].votes[optionIndex] += 1;
        hasVoted[msg.sender][pollId] = true;
        return polls[pollId].votes[optionIndex];
    }
}

// 1. create Poll struct
// 2.create poll mapping(to retrieve polls for voting)
// 3.create addPoll function: take topic and options as calldata, store topic, options and id in polls
// mapping to represent the created poll.
// 4.for votes in Poll struct instantiate new uint256 array with length options.length
// 5.Create relationship between options and votes array(they should have the same index)
// 6. To vote increase value on the votes array correlating(same index) with the option array
//7. create voters mapping to know if account has voted already

//checks
//empty parameters
//voting twice


// 1. create Poll struct
// 2.create poll mapping(to retrieve polls for voting)
// 3.create addPoll function: take topic and options as calldata, store topic, options and id in polls
// mapping to represent the created poll.
// 4.for votes in Poll struct instantiate new uint256 array with length options.length
// 5.Create relationship between options and votes array(they should have the same index)
// 6. To vote increase value on the votes array correlating(same index) with the option array

//checks
//empty parameters
//voting twice
