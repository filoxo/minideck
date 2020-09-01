import React from "react";
// Parcel claims to be able to use glob paths but
//     import images from '../img/**/*'
// fails so we must resort to imports by file extension
import pngs from "../img/*.png";
import svgs from "../img/*.svg";
import jpgs from "../img/*.jpg";
import jpegs from "../img/*.jpeg";

const imgsDir = "img";

/*
Img allows for retrieving images either the Parcel+MDX way:

    import Img from './img/dog.png'
    <img src={Img} />

or the Markdown syntax way:

    ![](./img/dog.png)

NOTE: ONLY images imported above are able to be loaded since
Parcel can't dynamically load images.
*/
function mapNameToImport(name, ext) {
  switch (ext) {
    case "png":
      return pngs[name];
    case "svg":
      return svgs[name];
    case "jpg":
      return jpgs[name];
    case "jpeg":
      return jpegs[name];
    default:
      return;
  }
}

export default function Img({ src, ...props }) {
  let fileSrc = src;
  const [dir, name, ext] = fileSrc.split(/[./]/).filter(Boolean);
  if (dir === imgsDir) {
    fileSrc = mapNameToImport(name, ext);
    if (!fileSrc)
      throw new Error(`No file named ${name}.${ext} found in ./${imgsDir}/`);
  }

  return <img {...props} src={fileSrc} />;
}
