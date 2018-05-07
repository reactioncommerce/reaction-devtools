import sharp from "sharp";
import { Binary } from 'mongodb';
const binaryCachedImages = {};

export async function init() {
    const cachedImages = {
        image: [],
        large: [],
        medium: [],
        small: [],
        thumbnail: []
    }
    console.log("Caching conversions");
    for (let i = 0; i < 10; i++) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        cachedImages.image.push(await sharp({
            create: {
                width: 600,
                height: 600,
                channels: 3,
                background: { r, g, b }
            }
            })
            .jpeg()
            .toBuffer());
        cachedImages.small.push(await sharp({
            create: {
                width: 235,
                height: 235,
                channels: 3,
                background: { r, g, b }
            }
            })
            .png()
            .toBuffer());
        cachedImages.thumbnail.push(await sharp({
            create: {
                width: 100,
                height: 100,
                channels: 3,
                background: { r, g, b }
            }
            })
            .png()
            .toBuffer());
    }
    cachedImages.large = cachedImages.image;
    cachedImages.medium = cachedImages.image;
    Object.keys(cachedImages).forEach((key) => {
        binaryCachedImages[key] = cachedImages[key].map(Binary);
    });
}


export function getImage(storeName) {
    const val = binaryCachedImages[storeName][Math.floor(Math.random() * binaryCachedImages[storeName].length)];
    return val;
}

/**
 * @method generateImage
 * @summary Generates an random colored image with specified width, height and quality
 * @param {number} width - width of the image
 * @param {number} height - height of the image
 * @param {number} quality - quality of the image
 * @param {function} callback - callback
 */
export async function createImage(storeName, caching = true) {
    if (caching) {
      return getImage(storeName);
    }
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    let img;
    if (storeName === "small") {
      img = await sharp({
        create: {
            width: 235,
            height: 235,
            channels: 3,
            background: { r, g, b }
        }
        })
        .png()
        .toBuffer();
    } else if (storeName === "thumbnail") {
      img = await sharp({
        create: {
            width: 100,
            height: 100,
            channels: 3,
            background: { r, g, b }
        }
        })
        .png()
        .toBuffer();
      
    } else {
      img = await sharp({
        create: {
            width: 600,
            height: 600,
            channels: 3,
            background: { r, g, b }
        }
        })
        .jpeg()
        .toBuffer();
    }
    return Binary(img);
  }