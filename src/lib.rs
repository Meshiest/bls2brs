extern crate bls2brs;
extern crate wasm_bindgen;
use std::io::Write;
use wasm_bindgen::prelude::*;

use bls2brs::{bl_save, brs, convert};

struct WriteStr(Vec<u8>);

impl WriteStr {
    fn new() -> Self {
        WriteStr(vec![])
    }
}

impl Write for WriteStr {
    fn write(&mut self, extend: &[u8]) -> std::io::Result<usize> {
        self.0.extend(extend.iter().cloned());
        Ok(self.0.len())
    }
    fn flush(&mut self) -> std::io::Result<()> {
        Ok(())
    }
}

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn load_file(body: &str) {
    let reader = bl_save::Reader::new(body.as_bytes()).unwrap();
    log(format![
        "{}\n  Desc: {}\n Brick Count: {}\n",
        "A",
        reader.description(),
        reader.brick_count().unwrap_or(0),
    ]
    .as_str());
    if let Ok(bls) = convert(reader) {
        log("B");
        let mut writer = WriteStr::new();
        log("C");
        brs::write_save(&mut writer, &bls.write_data).unwrap();
        log("D");
        log(&String::from_utf8_lossy(&writer.0));
    } else {
        log("bad");
    };
}
