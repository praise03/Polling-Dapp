<script setup lang="ts">
import constants from "../constants";
import { computed, reactive, Ref, ref, toRefs } from "vue";
import { ethers, Signer } from "ethers";
import { poll } from "ethers/lib/utils";
import { useNotification } from "@kyvg/vue3-notification";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { PollingContract__factory } from "../../../types/factories/PollingContract__factory";

const RPC = import.meta.env.VITE_APP_SEPOLIA_RPC_URL;
const privateKey = import.meta.env.VITE_APP_PRIVATE_KEY;

const { notify } = useNotification();

// const props = defineProps<{ currentAccount: string }>();
// const { currentAccount } = toRefs(props);

const currentAccount = ref("");

interface Poll {
  id: number;
  topic: string;
  options: string[];
  votes: number[];
}

const abi = constants.abi;
const contractAddress = constants.contractAddress;

let PollingContract;
let provider = null;
const topic = ref("");
const polls = ref([] as Poll[]);
const selectedOption = ref();
const showForm = ref(false);
const isLoading = ref(false);
const toggle = () => {
  showForm.value = !showForm.value;
};
const votedPolls = ref([]);

const formOptions = reactive([
  {
    name: "",
  },
]);

const options = computed(() => {
  const array = [];
  for (let i = 0; i < formOptions.length; i++) {
    array.push(formOptions[i].name);
  }
  return array;
});

const addOption = () => {
  formOptions.push({ name: "" });
};

const removeOption = (index) => {
  formOptions.splice(index, 1);
};

const loadContract = async () => {
  if (!window.ethereum) {
    provider = new ethers.providers.JsonRpcProvider(RPC);
  } else {
    provider = new ethers.providers.Web3Provider(
      window.ethereum as any,
      "sepolia"
    );
  }
  if (currentAccount.value == "") {
    PollingContract = PollingContract__factory.connect(
      constants.contractAddress,
      provider
    );
  } else {
    PollingContract__factory.connect(
      constants.contractAddress,
      provider.getSigner(currentAccount.value)
    );
  }
};

if (window.ethereum) {
  window.ethereum.on("accountsChanged", async function () {
    const accounts = await provider.send("eth_requestAccounts", []);
    currentAccount.value = accounts[0];
    await fetchPolls();
  });
}

const fetchPolls = async () => {
  isLoading.value = true;
  if (PollingContract == null) {
    await loadContract();
  }
  try {
    polls.value = [];
    const numPolls = (await PollingContract._pollId()).toString();
    for (let i = 1; i <= numPolls; i++) {
      const poll = await PollingContract.getPoll(i);
      const votes = [];
      poll.votes.forEach((element) => {
        votes.push(element.toString());
      });
      const parsedPoll: Poll = {
        id: poll["id"].toString(),
        topic: poll["topic"],
        options: poll["options"],
        votes: votes,
      };
      polls.value.push(parsedPoll);
      await hasVoted();
      isLoading.value = false;
    }
  } catch (error) {
    console.log(error);
    isLoading.value = false;
  }
};
fetchPolls();

const refresh = () => {
  topic.value = "";
  const defaultValue = [
    {
      name: "",
    },
  ];
  //i KNoW
  formOptions.length = 0;
  Object.assign(formOptions, defaultValue);
  showForm.value = false;
};

const createPoll = async () => {
  if (topic.value == "" || options.value.length == 0) {
    alert("Kindly fill the fields first");
    return;
  }
  if (currentAccount.value == "") {
    alert("Connect wallet to perform this action");
    return;
  }
  try {
    isLoading.value = true;
    const tx = await PollingContract.CreatePoll(topic.value, options.value);
    await tx.wait(1);
    isLoading.value = false;
    await fetchPolls();
    refresh();
    notify({
      title: "Poll Created Successfully 🎉",
    });
  } catch (error) {
    console.log(error);
  }
};

const vote = async (pollId) => {
  if (selectedOption.value == undefined) {
    alert("Please pick an option");
    return;
  }
  if (currentAccount.value == "") {
    alert("Connect wallet to perform this action");
    return;
  }
  try {
    isLoading.value = true;
    const tx = await PollingContract.vote(pollId, String(selectedOption.value));
    console.log(tx);
    console.log("gasPrice ", tx.gasPrice.toString());
    console.log(tx.gasLimit.toString());
    await tx.wait(1);
    isLoading.value = false;

    await fetchPolls();

    notify({
      title: "Vote Recorded 🎉",
    });
  } catch (e) {
    console.log(e);
  }
};

const hasVoted = async () => {
  if (currentAccount.value == "") {
    return;
  }
  const numPolls = await PollingContract._pollId();
  votedPolls.value = [];
  for (let index = 1; index <= numPolls; index++) {
    const response = await PollingContract.hasVoted(
      currentAccount.value,
      index
    );
    if (response) {
      votedPolls.value.push(index);
    }
  }
};

//   const fetchPoll = async () => {
// const web3 = new Web3(window.ethereum);
// const contract = new web3.eth.Contract(
//   constants.abi,
//   constants.contractAddress
// );
// const send = async () => {
//   const accounts = web3.eth.getAccounts();
//   const _from = accounts[0];
//   const tx = {
//     from: _from,
//     to: constants.contractAddress,
//     gas: 500000,
//     data: contract.methods.vote(2, 1).encodeABI(),
//   };
//   const signature = await web3.eth.accounts.signTransaction(tx, privateKey);
//   console.log(signature);
//   web3.eth
//     .sendSignedTransaction(signature.rawTransaction)
//     .on("receipt", (receipt) => {
//       console.log(receipt);
//     });
// await contract.methods.vote(2, 1).send({
//    from: accounts[0]
// });
//   };
// await send();

// notify({
//     title: "Poll Created Successfully 🎉",
// });
</script>

<template>
  <div class="p-2">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    />
    <button
      @click="toggle"
      class="text-white float-right bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-black dark:focus:ring-blue-800"
    >
      + Create New Poll
    </button>

    <div
      v-if="showForm"
      class="mt-12 backdrop-blur-sm bg-white/30 w-full sm:max-w-xs"
    >
      <form @submit.prevent class="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Topic
          </label>
          <input
            v-model="topic"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            required
          />
        </div>
        <div class="mb-6" v-for="(option, index) in formOptions" :key="index">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Option {{ index + 1 }}
          </label>
          <div class="flex">
            <input
              required
              type="text"
              v-model="option.name"
              class="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              class="h-max bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click="removeOption(index)"
              v-show="index || (!index && formOptions.length > 1)"
            >
              -
            </button>
          </div>
          <span>
            <button
              class="bg-black text-white font-bold py-2 px-3 rounded focus:outline-none focus:shadow-outline float-right"
              @click="addOption()"
              v-show="index == formOptions.length - 1"
            >
              + Add Option
            </button>
          </span>
        </div>
        <div class="w-full flex items-center justify-between">
          <input
            @click="createPoll()"
            value="Create Poll"
            class="w-full mt-3 bg-black text-white font-bold py-2 cursor-pointer px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          />
        </div>
      </form>
    </div>

    <br /><br />

    <div class="w-full flex flex-col flex-wrap sm:flex sm:flex-row">
      <div
        v-for="(poll, pollIndex) in polls"
        :key="poll.id"
        class="h-max p-2 m-2 min- sm:w-[48%] text-sm font-medium text-white bg-black/60 backdrop-blur-sm border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 text-white"
      >
        <h4 :id="String(poll.id)" class="font-bold p-3 bg-black/10 border-b-2">
          {{ poll.topic }}
        </h4>
        <ul class="">
          <li
            v-for="(option, index) in poll.options"
            :key="String(index) + String(pollIndex)"
            class="w-full hover:bg-black border-b border-gray-200 rounded-t-lg dark:border-gray-600"
          >
            <div class="flex items-center pl-3">
              <input
                :id="String(option) + String(pollIndex)"
                v-model="selectedOption"
                type="radio"
                :value="index"
                name="list-radio"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                class="w-full py-3 ml-2 text-sm font-medium text-white dark:text-gray-300"
                >{{ option }}
              </label>
              <p class="float-right font-extrabold text-md">
                {{ poll.votes[index] }}
              </p>
            </div>
          </li>
        </ul>
        <button
          v-if="votedPolls.includes(Number(poll.id))"
          disabled
          class="cursor-not-allowed w-full bg-white/70 text-black font-bold py-2 p rounded"
        >
          Vote
        </button>
        <button
          v-else
          class="w-full bg-white/70 text-black font-bold py-2 p rounded cursor-pointer"
          @click="vote(poll.id)"
        >
          Vote
        </button>
      </div>
    </div>
  </div>
</template>
