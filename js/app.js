const wasm = import('../pkg/bls2brs.js')
  .catch(console.error);

const $ = document.querySelector.bind(document);


document.addEventListener('DOMContentLoaded', async () => {
  const { load_file } = await wasm;

  // Given a File object, read it, pass it into wasm to be converted, resolve a blob 
  function convertFile(file) {
    // return new Promise((resolve, reject) => {
      /*const reader = new FileReader();
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

      reader.readAsBinaryString(file);*/
      return file
        .arrayBuffer()
        .then(load_file)
        .then(brs => new Blob([brs], { type: 'octet/stream' }))
    // })
  }

  $('#file').addEventListener('change', event => {
    event.preventDefault();

    const fileInput = event.target;

    Array.from(fileInput.files)
      .forEach(f => {
        const newName = f.name.replace(/(.bls|)$/, '.brs');
        const isBls = f.name.match(/\.bls$/);

        /*
          I'm too lazy to setup the boilerplate for
          React or Vue but not lazy enough to not
          make all the elements by hand :|
         */
        

        // Element creation helper function
        const makeElem = (tag='div', className='', ...children) => {
          const el = document.createElement(tag);
          el.className = className;

          // Append all the child nodes
          children.forEach(c => {
            const child = typeof c === 'string'
              ? document.createTextNode(c) 
              : c;
            el.appendChild(child);
          });

          return el;
        }

        // Icon helper function
        const icon = name => makeElem('i', 'icon ' + name);

        // Close warning icon
        const closeIcon = icon('close');
        
        // Create file message
        const elem = makeElem('div', 'ui message', closeIcon);

        closeIcon.addEventListener('click', () => {
          $('#converted').removeChild(elem);
        });

        if(isBls) {
          elem.className += ' icon';
          const loadingIcon = icon('notched circle loading');
          const loadingMsg = makeElem('div', 'content',
            makeElem('div', 'header', 'Converting File...'),
            makeElem('p', '',
              makeElem('code', '', f.name),
              ' is being converted'
            )
          );

          elem.appendChild(loadingIcon);
          elem.appendChild(loadingMsg);

          convertFile(f)
            .then(blob => {
              elem.removeChild(loadingMsg);
              elem.removeChild(loadingIcon);

              const successIcon = icon('check');
              const downloadButton = makeElem('a', 'ui icon button primary', icon('download'));

              downloadButton.href = window.URL.createObjectURL(blob);
              downloadButton.download = newName;

              const successMsg = makeElem('div', 'content',
                makeElem('div', 'header', newName),
                makeElem('p', '',
                  'Conversion Succeeded!',
                  downloadButton,
                )
              );
              elem.className += ' info';
              elem.appendChild(successIcon);
              elem.appendChild(successMsg);
              // Success!
              // downloadFile(blob, newName)
            })
            .catch(e => {
              console.error('Conversion Error', f.name, e);

              // Remove old text
              elem.removeChild(loadingMsg);
              elem.removeChild(loadingIcon);

              // Populate with very vague error message
              elem.className = 'ui message error';
              elem.appendChild(makeElem('div', 'header', 'Error Converting File'));
              elem.appendChild(makeElem('p', '',
                makeElem('u', '', f.name),
                ' could not be converted'
              ));
            });
        } else {
          // Provide invalid format warning message
          elem.className += ' warning';
          elem.appendChild(makeElem('div', 'header', 'Invalid File Format'));
          elem.appendChild(makeElem('p', '',
            makeElem('u', '', f.name),
            ' is not the correct format (.bls)'
          ));
        }

        $('#converted').appendChild(elem);
      });
    fileInput.value = '';
  });
});

