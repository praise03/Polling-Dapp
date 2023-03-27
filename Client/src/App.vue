<template>
<div>
	<notifications position="bottom right"/>
  <nav class=" border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
        <div class=" flex flex-wrap justify-between items-center mx-auto">
        <a href="#" class="p-2 flex items-center">
            <img src="/vite.svg" class="mr-3 h-6 sm:h-9" alt="Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Polling Dapp</span>
        </a>
        <div class="flex md:order-2">
            <button v-if="currentAccount !== ''" type="button" class="text-white float-right bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 ">{{ currentAccount.substring(0,5) }}...{{currentAccount.substring( ((currentAccount.length) -4) , currentAccount.length )}}</button>
            <button v-else @click="connectWallet" type="button" class="text-white float-right bg-black font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 ">Connect</button>
        </div>
        </div>
    </nav>
	<Poll :currentAccount="currentAccount"/>
</div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import Poll from './components/Poll.vue'
import { utils } from 'ethers'




  const currentAccount = ref('')
  const accountConnected = ref(false)

	const connectWallet = async() => {
		try {
			const { ethereum } = window;
			if(!ethereum){ alert("Metamask not installed"); return}
			const accounts: string[] = await ethereum.request({
				method: "eth_requestAccounts",
			})
			currentAccount.value = utils.getAddress(accounts[0])
		} catch (error){ console.log (error)}
	}

	const checkIfAccountConnected = async() => {
		try {
			console.log(currentAccount.value)
			const { ethereum } = window;
			if(!ethereum){ alert("Disclaimer: You need to install Metamask to perform some actions"); return}

			const accounts : string[] = await ethereum.request({ method: "eth_accounts" });

			if(accounts.length !== 0) {
				currentAccount.value = utils.getAddress(accounts[0])

				accountConnected.value = true
			}else{ accountConnected.value = false }
		}
		catch(error) {console.log(error)}
	}

	if (window.ethereum) {
		window.ethereum.on('accountsChanged', function () {
			checkIfAccountConnected()
		})
	}



	
	onBeforeMount(async () => {
		await checkIfAccountConnected()
		// console.log("From app " + currentAccount.value)
    });

</script>