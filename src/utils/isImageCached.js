/**
 * Copyright 2017 dialog LLC <info@dlg.im>
 * @flow
 */

function isImageCached(src: ?string): boolean {
  if (src) {
    const image = document.createElement('img');
    image.src = src;

    return image.complete;
  }

  return false;
}

export default isImageCached;
