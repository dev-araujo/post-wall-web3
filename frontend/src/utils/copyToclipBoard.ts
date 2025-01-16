const copyToclipBoard = (text: string, callback?: () => void) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      if (callback) {
        callback();
      }
    })
    .catch((err) => {
      console.error("Erro ao copiar texto:", err);
    });
};
export default copyToclipBoard;
