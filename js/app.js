const wasm = import('../pkg/bls2brs.js')
  .catch(console.error);

const $ = document.querySelector.bind(document);

// Have to transcode the utf-8 javascript text to "Windows-1252" format just for the degree symbol for ramps
// GG Torque
const windows1252 = {"\u0000":0,"\u0001":1,"\u0002":2,"\u0003":3,"\u0004":4,"\u0005":5,"\u0006":6,"\u0007":7,"\u0008":8,"\u0009":9,"\u000a":10,"\u000b":11,"\u000c":12,"\u000d":13,"\u000e":14,"\u000f":15,"\u0010":16,"\u0011":17,"\u0012":18,"\u0013":19,"\u0014":20,"\u0015":21,"\u0016":22,"\u0017":23,"\u0018":24,"\u0019":25,"\u001a":26,"\u001b":27,"\u001c":28,"\u001d":29,"\u001e":30,"\u001f":31,"\u0020":32,"\u0021":33,"\u0022":34,"\u0023":35,"\u0024":36,"\u0025":37,"\u0026":38,"\u0027":39,"\u0028":40,"\u0029":41,"\u002a":42,"\u002b":43,"\u002c":44,"\u002d":45,"\u002e":46,"\u002f":47,"\u0030":48,"\u0031":49,"\u0032":50,"\u0033":51,"\u0034":52,"\u0035":53,"\u0036":54,"\u0037":55,"\u0038":56,"\u0039":57,"\u003a":58,"\u003b":59,"\u003c":60,"\u003d":61,"\u003e":62,"\u003f":63,"\u0040":64,"\u0041":65,"\u0042":66,"\u0043":67,"\u0044":68,"\u0045":69,"\u0046":70,"\u0047":71,"\u0048":72,"\u0049":73,"\u004a":74,"\u004b":75,"\u004c":76,"\u004d":77,"\u004e":78,"\u004f":79,"\u0050":80,"\u0051":81,"\u0052":82,"\u0053":83,"\u0054":84,"\u0055":85,"\u0056":86,"\u0057":87,"\u0058":88,"\u0059":89,"\u005a":90,"\u005b":91,"\u005c":92,"\u005d":93,"\u005e":94,"\u005f":95,"\u0060":96,"\u0061":97,"\u0062":98,"\u0063":99,"\u0064":100,"\u0065":101,"\u0066":102,"\u0067":103,"\u0068":104,"\u0069":105,"\u006a":106,"\u006b":107,"\u006c":108,"\u006d":109,"\u006e":110,"\u006f":111,"\u0070":112,"\u0071":113,"\u0072":114,"\u0073":115,"\u0074":116,"\u0075":117,"\u0076":118,"\u0077":119,"\u0078":120,"\u0079":121,"\u007a":122,"\u007b":123,"\u007c":124,"\u007d":125,"\u007e":126,"\u007f":127,"\u20ac":128,"\u0081":129,"\u201a":130,"\u0192":131,"\u201e":132,"\u2026":133,"\u2020":134,"\u2021":135,"\u02c6":136,"\u2030":137,"\u0160":138,"\u2039":139,"\u0152":140,"\u008d":141,"\u017d":142,"\u008f":143,"\u0090":144,"\u2018":145,"\u2019":146,"\u201c":147,"\u201d":148,"\u2022":149,"\u2013":150,"\u2014":151,"\u02dc":152,"\u2122":153,"\u0161":154,"\u203a":155,"\u0153":156,"\u009d":157,"\u017e":158,"\u0178":159,"\u00a0":160,"\u00a1":161,"\u00a2":162,"\u00a3":163,"\u00a4":164,"\u00a5":165,"\u00a6":166,"\u00a7":167,"\u00a8":168,"\u00a9":169,"\u00aa":170,"\u00ab":171,"\u00ac":172,"\u00ad":173,"\u00ae":174,"\u00af":175,"\u00b0":176,"\u00b1":177,"\u00b2":178,"\u00b3":179,"\u00b4":180,"\u00b5":181,"\u00b6":182,"\u00b7":183,"\u00b8":184,"\u00b9":185,"\u00ba":186,"\u00bb":187,"\u00bc":188,"\u00bd":189,"\u00be":190,"\u00bf":191,"\u00c0":192,"\u00c1":193,"\u00c2":194,"\u00c3":195,"\u00c4":196,"\u00c5":197,"\u00c6":198,"\u00c7":199,"\u00c8":200,"\u00c9":201,"\u00ca":202,"\u00cb":203,"\u00cc":204,"\u00cd":205,"\u00ce":206,"\u00cf":207,"\u00d0":208,"\u00d1":209,"\u00d2":210,"\u00d3":211,"\u00d4":212,"\u00d5":213,"\u00d6":214,"\u00d7":215,"\u00d8":216,"\u00d9":217,"\u00da":218,"\u00db":219,"\u00dc":220,"\u00dd":221,"\u00de":222,"\u00df":223,"\u00e0":224,"\u00e1":225,"\u00e2":226,"\u00e3":227,"\u00e4":228,"\u00e5":229,"\u00e6":230,"\u00e7":231,"\u00e8":232,"\u00e9":233,"\u00ea":234,"\u00eb":235,"\u00ec":236,"\u00ed":237,"\u00ee":238,"\u00ef":239,"\u00f0":240,"\u00f1":241,"\u00f2":242,"\u00f3":243,"\u00f4":244,"\u00f5":245,"\u00f6":246,"\u00f7":247,"\u00f8":248,"\u00f9":249,"\u00fa":250,"\u00fb":251,"\u00fc":252,"\u00fd":253,"\u00fe":254,"\u00ff":255};

document.addEventListener('DOMContentLoaded', async () => {
  const { load_file } = await wasm;

  // Given a File object, read it, pass it into wasm to be converted, resolve a blob 
  function convertFile(file) {
    return file.arrayBuffer()
      .then(buff =>
        new Uint8Array(buff).map(c => windows1252[String.fromCharCode(c)]))
      .then(buff => 
        new Blob([load_file(buff)], {type: 'octet/stream'}))
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

