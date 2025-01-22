
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">

# 🖥️ Rodando o Smart Contract (PostWall)

Este tutorial irá guiá-lo através do processo de compilação, implantação e teste do smart contract `PostWall` usando o Foundry. ✨

### ✅ Pré-requisitos

  * **Foundry:** Certifique-se de ter o Foundry instalado. Você pode encontrar o guia de instalação aqui: [Guia de instalação do Foundry](https://book.getfoundry.sh/getting-started/installation).
  * **Carteira Ethereum:** Você precisará de uma carteira Ethereum como a [MetaMask](https://metamask.io/) para interagir com o contrato. 🦊

### 🚀 Passos

Depois de clonar o repositório execute os seguintes passos:

1.  **Navegue até o diretório raiz do projeto:**

    Abra seu terminal e navegue até o diretório onde o projeto está localizado:

    ```bash
    cd dapp
    ```

2.  **Instale as dependências do Foundry:**

    Instale as dependências listadas no arquivo `foundry.toml`:

    ```bash
    forge install
    ```

3.  **Compile o smart contract:**

    Compile o contrato `PostWall` usando o comando:

    ```bash
    forge build
    ```

    Isso irá compilar os contratos no diretório `src` e gerar os artefatos necessários no diretório `out`.


4.  **Inicie uma blockchain local com o Anvil:**

    O Anvil é uma blockchain local para desenvolvimento que vem junto com o Foundry. Inicie-a com o comando:

    ```bash
    anvil
    ```

    Isso iniciará um nó Ethereum local. Deixe esse comando rodando em uma janela separada do seu terminal. 💻

5.  **Implante o smart contract na blockchain local:**

    Abra uma nova janela no seu terminal e execute o script de implantação. Este comando irá implantar o contrato `PostWall` na blockchain local que você iniciou com o Anvil:

    ```bash
    forge script script/DeployPostWall.s.sol --rpc-url http://localhost:8545 --broadcast
    ```

    Copie o endereço do contrato implantado que será exibido no terminal. Você precisará dele para interagir com o contrato. 📑



## 🌎 Implantação na Sepolia Testnet

1.  **Obtenha ETH de teste:** 

    Para testar o dApp na rede Sepolia Testnet, você precisará obter ETH de teste de um faucet Sepolia, como [**esta**](https://cloud.google.com/application/web3/faucet/ethereum/sepolia). 🚰


2.  **Implante o contrato na Sepolia:**

    Use o seguinte comando, substituindo `{sua-chave-privada}` pela sua chave privada da conta que você quer usar para implantar o contrato, e `{sua-url-rpc-sepolia}` pela URL RPC da rede Sepolia que você deve ter adicionado previamente no arquivo `.env`:


    ```bash
    forge script script/DeployPostWall.s.sol --rpc-url {sua-url-rpc-sepolia} --private-key {sua-chave-privada} --broadcast --verify --etherscan-api-key $ETHERSCAN_API_KEY -vvvv
    ```

---
    

* **Nota:** **NUNCA** exponha suas chaves privadas em um ambiente de produção. 🔐


