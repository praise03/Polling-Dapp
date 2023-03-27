const { assert, expect } = require("chai");
const { network, deployments, ethers, getNamedAccounts } = require("hardhat");
const { resolve } = require("path");

describe("NFT Marketplace Unit Tests", function () {
	let PollingContract;
    
    beforeEach(async () => {
		const PollingContactFactory = await ethers.getContractFactory(
			"PollingContract"
		);
		PollingContract = await PollingContactFactory.deploy();
        const account = await ethers.getSigner()
        PollingContract = PollingContract.connect(account);
	});

    describe("Creates Poll", function() {
        it("Creates a poll", async() => {
            await expect(PollingContract.CreatePoll("", [])).to.be.revertedWith("Incomplete parameters")
            await PollingContract.CreatePoll(topic='What is Today?', options=['Monday', 'Tuesday', 'Wednesday'])
            //check if number of polls has from 0 to 1
            assert.equal(await PollingContract._pollId(), 1);
        })

        it("allows accounts to vote on options", async() => {
            await PollingContract.CreatePoll(topic='What is Today?', options=['Monday', 'Tuesday', 'Wednesday'])
            assert.equal((await PollingContract.getPoll(pollId=1)).votes[2], 0 )
            //Today is tuesday
            await PollingContract.vote(pollId=1, optionIndex=2)
            assert.equal((await PollingContract.getPoll(pollId=1)).votes[2], 1 )
        })

        it("Prevents an account from voting twice", async() => {
            await PollingContract.CreatePoll(topic='What is Today?', options=['Monday', 'Tuesday', 'Wednesday'])
            //cast first vote
            await PollingContract.vote(pollId=1, optionIndex=2)
            await expect(PollingContract.vote(pollId=1, optionIndex=2)).to.be.revertedWith("You have voted already")
        })
    })

})