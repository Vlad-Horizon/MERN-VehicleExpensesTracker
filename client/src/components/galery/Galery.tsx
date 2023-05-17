import React, { useEffect, useState } from 'react';
import { ScrollHorizontel } from '..';
import OpenImg from './OpenImg';
import MinImg from './MinImg';

import './galery.scss';
import { base64DecodeFile } from '../../utils/base64DecodeFile';
import { createUrlToFile } from '../../utils/createUrlToFile';

type FileType = string[] | null;

interface componentProps {
  src: FileType;
  defaultImg: string;
  isUrl?: boolean;
}

export default function Galery({ src, defaultImg, isUrl }: componentProps) {
  const [positionGalery, setPositionGalery] = useState<number>(0);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!src || src.length === 0) return;

    if (isUrl) {
      setImageUrls(src.map((image) => image));
      return;
    }

    setImageUrls(src.map((image) => createUrlToFile(base64DecodeFile(image))));
  }, [, src]);

  if (!src || src.length === 0) {
    return (
      <div className="galery">
        <OpenImg src={defaultImg} />
      </div>
    );
  }

  if (Array.isArray(imageUrls)) {
    return (
      <div className="galery">
        <OpenImg
          src={imageUrls[positionGalery]}
          set={setPositionGalery}
          value={positionGalery}
          steps={imageUrls.length}
        />

        <ScrollHorizontel
        // height='60px'
        >
          {imageUrls.map((item, i) => (
            <MinImg key={i} id={i} src={imageUrls[i]} set={setPositionGalery} value={positionGalery} />
          ))}
        </ScrollHorizontel>
      </div>
    );
  }

  return <div className="imgContainer_ImgContainer"></div>;
}
