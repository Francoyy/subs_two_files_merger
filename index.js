import fs from 'fs'
import { parseSync, stringifySync } from 'subtitle'

//Usage node index.js sub_en.srt sub_ch.srt sub_merged.srt

var args = process.argv.slice(2);
const subtitle_1_name = args[0];
const subtitle_2_name = args[1];
const subtitle_final_name = args[2];

console.log("Merging " subtitle_1_name " and " + subtitle_2_name " into " + subtitle_final_name);

let subtitle_1 = fs.readFileSync(`./src/${subtitle_1_name}`, 'utf8');
let subtitle_2 = fs.readFileSync(`./src/${subtitle_2_name}`, 'utf8');
  
  subtitle_1 = parseSync(subtitle_1);
  subtitle_2 = parseSync(subtitle_2);
  subtitle_1 = subtitle_1.filter(line => line.type === 'cue');
  subtitle_2 = subtitle_2.filter(line => line.type === 'cue')
  
  let merged = "";

  for (var i=0;i<subtitle_1.length;i++) {
    merged = subtitle_1[i].data.text + "\n" + subtitle_2[i].data.text;
    subtitle_1[i].data.text = merged;
  }
  fs.writeFileSync(`./res/${subtitle_final_name}`, stringifySync(subtitle_1, { format: 'srt' }))
