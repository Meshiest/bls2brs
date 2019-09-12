const wasm = import('../pkg/bls2brs.js')
  .catch(console.error);

const $ = document.querySelector.bind(document);


document.addEventListener('DOMContentLoaded', async () => {
  const { load_file } = await wasm;

  // Given a File object, read it, pass it into wasm to be converted, resolve a blob 
  function convertFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = e => {
        try {

          const brs = load_file(reader.result);
          if(!brs.length) {
            console.error('Error converting bls');
            reject(new Error('No Bricks'));
            return;
          }

          resolve(new Blob([brs], { type: 'octet/stream' }));
        } catch (e) {
          console.error('Error converting bls', e)
          reject(e);
        }
      };

      reader.readAsBinaryString(file);
    })
  }


  // Click on a magical link to download a file
  function downloadFile(blob, filename) {
    const elem = document.createElement('a');
    document.body.appendChild(elem);
    elem.style.display = 'none';

    const objUrl = elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    elem.click();

    window.URL.revokeObjectURL(objUrl);
    document.body.removeChild(elem);
  }

  $('#blsForm').addEventListener('submit', event => {
    event.preventDefault();

    const fileInput = event.target.file;

    const promises = Array.from(fileInput.files)
      .map(f => {
        console.log('Converting', f.name);
        const newName = f.name.replace(/(.bls|)$/, '.brs');
        convertFile(f)
          .then(blob =>
            downloadFile(blob, newName)
          )
          .catch(e => {
            console.error('oops', e);
            return Promise.resolve();
          });
      });

    Promise.all(promises)
      .then(() => {
        console.log('done!');
      })
  });
});

