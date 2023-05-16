import React, {useState, useEffect} from 'react'
import { Tresh } from '../../../assets'
import RadioButton from '../../radioButton/RadioButton'
import PopupGalery from './PopupGalery';

import './popupGalery.scss'

interface filesInterface {
  file: File,
  base64: string,
  url: string,
}

interface componentProps {
  carImgFiles: filesInterface[],
  setFilesSorted: Function,
}

export default function PopupImgContainer({carImgFiles, setFilesSorted}: componentProps) {
  const [selectImgToEdit, setSelectImgToEdit] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    if (isChecked) {
      setSelectImgToEdit(Array.from(Array(carImgFiles.length).keys()));
      return;
    }
    setSelectImgToEdit([]);
  }, [isChecked])
  
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const deleteImg = (imgId: number) => {
    setFilesSorted(carImgFiles.filter((item, i) => i !== imgId));
  }

  const deleteImgArray = () => {
    setFilesSorted(carImgFiles.filter((item, i) => !selectImgToEdit.includes(i)));
    setSelectImgToEdit([]);
  }

  const addToStateImg = (imgId: number) => {
    setSelectImgToEdit([...selectImgToEdit, imgId]);
  }

  return (
    <div className='popupImgContainer'>
        <div className='popupHeader'>
          <div className='checkBox'>
            <input 
              id='checkBoxSelectImg'
              type="checkBox" 
              checked={isChecked} 
              onChange={() => handleCheckboxChange()} 
            />
            <label htmlFor="checkBoxSelectImg">{`Is select ${selectImgToEdit.length}`}</label>
          </div>

          <div className='popupHeaderButton'>
            <RadioButton 
              children={<Tresh />}
              events={{
                onClick: () => deleteImgArray(),
              }}
            />
          </div>
        </div>

        <div className="popupGaleryContent">
          <div className="innerPopupGaleryContent">

          {
            carImgFiles.map((item, i) => {
              const {file, base64, url} = item;

              return (
                <PopupGalery 
                  key={i}
                  src={url}
                  id={i}
                  onClick={addToStateImg}
                  selectValue={selectImgToEdit}
                  setSelectValue={setSelectImgToEdit}
                />
              )
            })
          }
          </div>
      </div>
    </div>
  )
}