extern crate bls2brs;
extern crate wasm_bindgen;

use wasm_bindgen::prelude::*;

use bls2brs::{bl_save, brs, convert};

#[wasm_bindgen]
pub fn load_file(body: &[u8]) -> std::vec::Vec<u8> {
    let reader = bl_save::Reader::new(body).unwrap();
    if let Ok(bls) = convert(reader) {
        let mut writer = vec![];
        brs::write_save(&mut writer, &bls.write_data).unwrap();
        writer
    } else {
        vec![]
    }
}
