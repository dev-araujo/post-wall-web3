import PostWall from "../abi/PostWall.json";
import { ethers } from "ethers";

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
const provider = new ethers.providers.JsonRpcProvider(
  import.meta.env.VITE_SEPOLIA_CONTRACT_ADDRESS
);
const contract = new ethers.Contract(contractAddress, PostWall.abi, provider);

export const fetchPosts = async () => {
  try {
    return await contract.getPosts();
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    return [];
  }
};

export const createPost = async (message: string, account: string | null) => {
  if (!account) {
    console.error("Conta não conectada.");
    return;
  }

  const signer = new ethers.providers.Web3Provider(window.ethereum).getSigner();
  const contractWithSigner = contract.connect(signer);

  try {
    const tx = await contractWithSigner.createPost(message);
    await tx.wait();
    return true;
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return false;
  }
};
