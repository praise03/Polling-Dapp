const { run, network } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    console.log("Account balance:", (await deployer.getBalance()).toString());
  
    const PollingContract = await ethers.getContractFactory("PollingContract");
    const pollingContract = await PollingContract.deploy();
  
    console.log("Poll contract deployed at: ", pollingContract.address);

    if(!["hardhat", "localhost"].includes(network.name) && (process.env.ETHERSCAN_API_KEY)){
        console.log("Verifying contract.....")
        try{
            await run("verify:verify", {
                address: "0x088F9144c46C597A837f2A9cC30B73a4F0617383",
            })
        }catch (e) {
        if (e.message.toLowerCase().includes("already verified")){
            console.log("Contract Already Verified")
        }else{ console.log(e) }
        }
    }
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });

