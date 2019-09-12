const wasm = import('../pkg/bls2brs.js')
  .catch(console.error);

const $ = document.querySelector.bind(document);


document.addEventListener('DOMContentLoaded', async () => {
  const { greet, load_file } = res = await wasm;
  console.log(res, load_file);

  $('#blsForm').addEventListener('submit', event => {
    event.preventDefault();

    const reader = new FileReader();
    reader.onloadend = e => {
      load_file(reader.result);
    };

    const fileInput = event.target.file;
    reader.readAsBinaryString(fileInput.files[0]);
  });
});

