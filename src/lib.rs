extern crate bls2brs;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

use bls2brs::{bl_save, brs, convert};

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[wasm_bindgen]
pub fn load_file(body: &str) -> std::vec::Vec<u8> {
    let reader = bl_save::Reader::new(body.as_bytes()).unwrap();
    if let Ok(bls) = convert(reader) {
        let mut writer = vec![];
        brs::write_save(&mut writer, &bls.write_data).unwrap();
        writer
    } else {
        vec![]
    }
}
