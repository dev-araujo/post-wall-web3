
  <img  src="https://img.shields.io/static/v1?label=license&message=MIT&color=5965E0&labelColor=121214" alt="License">

# 🎨 Tutorial: Rodando o Frontend (React + TypeScript)

Este tutorial irá guiá-lo através do processo de configuração e execução do frontend do aplicativo Post Wall.

### ✅ Pré-requisitos

  * **Node.js:** Versão 16 ou superior.
  * **npm:** Versão 8 ou superior.
  * **Carteira Ethereum:** Você precisará de uma carteira Ethereum como a [MetaMask](https://metamask.io/) para interagir com o contrato. 🦊

### 🚀 Passos

Depois de clonar o repositório execute os seguintes passos:


1.  **Navegue até o diretório do frontend:**

    Abra seu terminal e navegue até o diretório `frontend` dentro do projeto:

    ```bash
    cd frontend
    ```

2.  **Instale as dependências:**

    Instale as dependências do projeto listadas no arquivo `package.json`:

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**

      * Crie um arquivo chamado `.env` na raiz do diretório `frontend`. 📄

      * Adicione a seguinte linha ao arquivo `.env`:

        ```
        VITE_CONTRACT_ADDRESS={seu-endereco-de-contrato}
        VITE_SEPOLIA_CONTRACT_ADDRESS={sua-url-rpc-sepolia}
        ```

          * **`VITE_CONTRACT_ADDRESS`:** Substitua `{seu-endereco-de-contrato}` pelo endereço do contrato `PostWall` que você [copiou após implantá-lo na blockchain local (ou na Sepolia Testnet)](../dapp/README.md).
          * **`VITE_SEPOLIA_CONTRACT_ADDRESS`:** Substitua `{sua-url-rpc-sepolia}` por uma URL RPC para a Sepolia Testnet. Você pode usar um serviço como Alchemy ou Infura para obter uma URL RPC.

4.  **Inicie o aplicativo React:**

    Inicie o servidor de desenvolvimento do React com o comando:

    ```bash
    npm run dev
    ```

    Isso iniciará o aplicativo React. O aplicativo estará acessível em `http://localhost:5173/` (ou outra porta, se 5173 estiver em uso).

### 🤝 Interagindo com o dApp

1.  **Conecte sua carteira MetaMask:** 🦊

      * Abra o aplicativo em seu navegador.
      * Clique no botão "Connect Wallet" no canto superior direito.
      * Siga as instruções para conectar sua carteira MetaMask.
      * Certifique-se de que sua carteira MetaMask esteja conectada à rede correta:
          * **"Localhost 8545"** para interagir com a blockchain local.
          * **"Sepolia"** para interagir com a Sepolia Testnet.

2.  **Poste uma mensagem:** 💬

      * Após conectar sua carteira, você verá um formulário para postar uma mensagem.
      * Digite sua mensagem e clique no botão "Post".
      * Confirme a transação em sua carteira MetaMask.

3.  **Veja as mensagens:** 👀

      * Após postar uma mensagem, a página será atualizada para mostrar todas as mensagens postadas, incluindo a sua.

-----

