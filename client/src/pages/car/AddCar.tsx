import React, { useEffect, useRef, useState } from 'react';
import { ButtonsHeader, DefaultButton, Galery, PathToPage, Popup, PopupGalery } from '../../components';

import NoPhoto from '../../assets/img/no-photo-620x495.jpg';

import './carAdd.scss';
import { CAR_PAGE } from '../../routes/paths';
import PopupConvertKeyboard from '../../components/popup/PopupConvertKeyboard';
import carApi from '../../services/carApi';
import { useParams, useNavigate } from 'react-router-dom';
import { createUrlToFile } from '../../utils/createUrlToFile';
import { base64DecodeFile } from '../../utils/base64DecodeFile';
import { useForm, useInputText, useInputFile, InputFile, InputText, DragAndDrop } from '../../components/form';
import { regPatterns } from '../../config/config';

interface CarListInterface {
  isEdit?: boolean;
}

interface carToEdit {
  images: string[];
  brend: string;
  model: string;
  year: string;
  number: string;
  price: number;
}

export default function CarList({ isEdit = false }: CarListInterface) {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [convertKeyboardStatys, setConvertKeyboardStatys] = useState<boolean>(false);
  const [editFiles, setEditFiles] = useState<boolean>(false);

  const onSubmit = async () => {
    try {
      if (!form.valid) return;

      if (isEdit && carId) {
        await carApi.editCar({
          carId: carId,
          brend: form.textInputs.carBrend.value,
          model: form.textInputs.carModel.value,
          year: form.textInputs.carYear.value,
          number: form.textInputs.carNumber.value,
          price: +form.textInputs.carPrice.value,
          images: form.fileInputs.carImages.objectFiles.map((file) => file.base64),
        });
        navigate('/');
        return;
      }
  
      await carApi.createCar({
        brend: form.textInputs.carBrend.value,
        model: form.textInputs.carModel.value,
        year: form.textInputs.carYear.value,
        number: form.textInputs.carNumber.value,
        price: +form.textInputs.carPrice.value,
        images: form.fileInputs.carImages.objectFiles.map((file) => file.base64),
      });
      navigate('/');
    } catch {

    }
  };

  const form = useForm({
    submitFunction: onSubmit,

    textInputs: {
      carBrend: useInputText({
        name: 'carBrend',
        placeholder: 'Brend',
        inputValue: '',
        reg: regPatterns.car.brend,
        required: true,
      }),
      carModel: useInputText({
        name: 'carModel',
        placeholder: 'Model',
        inputValue: '',
        reg: regPatterns.car.model,
        required: true,
      }),
      carYear: useInputText({
        name: 'carYear',
        placeholder: 'Year',
        inputValue: '',
        reg: regPatterns.car.year,
        required: true,
      }),
      carNumber: useInputText({
        name: 'carNumber',
        placeholder: 'Number',
        inputValue: '',
        reg: regPatterns.car.number,
        required: true,
      }),
      carPrice: useInputText({
        name: 'carPrice',
        placeholder: 'Price',
        inputValue: '',
        reg: regPatterns.car.price,
        required: true,
      }),
    },

    fileInputs: {
      carImages: useInputFile({
        name: 'carImages',
        placeholder: 'Drag and drop or select images',
        multiple: true,
        required: true,
        accept: '.jpg, .png, .jpeg, .webp',
      }),
    },
  });

  const getCarById = async () => {
    if (!isEdit || !carId) return;
    const car = await carApi.getCarById(carId);

    if (!car) return;
    const { images, brend, model, year, number, price } = car;

    form.textInputs.carBrend.setValue(brend);
    form.textInputs.carModel.setValue(model);
    form.textInputs.carYear.setValue(year);
    form.textInputs.carNumber.setValue(number);
    form.textInputs.carPrice.setValue(price.toString());
    form.fileInputs.carImages.setObjectFiles(
      images.map((image: string) => {
        return {
          file: base64DecodeFile(image),
          base64: image,
          url: createUrlToFile(base64DecodeFile(image)),
        };
      })
    );
  };

  useEffect(() => {
    getCarById();
  }, []);

  const deleteCar = async () => {
    if (!isEdit || !carId) return;
    await carApi.deleteCar(carId);
  };

  return (
    <>
      <DragAndDrop
        isDrag={form.fileInputs.carImages.isDrag}
        handleDragLeave={(e: any) => form.fileInputs.carImages.handleDragLeave(e)}
        handleDragOver={(e: any) => form.fileInputs.carImages.handleDragOver(e)}
        handlerDrop={(e: any) => form.fileInputs.carImages.handlerDrop(e)}
      >
        <div className="pageHeader">
          <PathToPage
            props={[
              ['Car list', CAR_PAGE.list],
              [`Car ${isEdit ? 'edit' : 'create'}`, `${isEdit ? `${CAR_PAGE.edit}/${carId}` : CAR_PAGE.add}`],
            ]}
          />

          <ButtonsHeader>
            {isEdit && (
              <DefaultButton
                text="Delete car"
                red
                events={{
                  onClick: () => deleteCar(),
                }}
                style={{ marginRight: '5px' }}
              />
            )}

            <DefaultButton text="Close" border to={CAR_PAGE.list} style={{ marginRight: '5px' }} />

            <DefaultButton
              text="Save"
              bg
              events={{
                onClick: () => {
                  form.submit();
                },
              }}
            />
          </ButtonsHeader>
        </div>

        <div className="addCarPage">
          <div className="imgContainer">
            <Galery src={form.fileInputs.carImages.objectFiles.map((item) => item.url)} defaultImg={NoPhoto} isUrl />
          </div>

          <div className="addCarForm">
            <div className="innerAddCarForm">
              <InputText defaultProps={form.textInputs.carBrend} />
              <InputText defaultProps={form.textInputs.carModel} />
              <InputText defaultProps={form.textInputs.carYear} />
              <InputText defaultProps={form.textInputs.carNumber} />
              <InputText defaultProps={form.textInputs.carPrice} />
              <InputFile defaultProps={form.fileInputs.carImages} />
            </div>

            {form.fileInputs.carImages.objectFiles.length > 0 && (
              <DefaultButton
                text="edit images"
                bg
                style={{
                  margin: '15px 10px',
                }}
                events={{
                  onClick: () => setEditFiles(true),
                }}
              />
            )}
          </div>
        </div>

        {convertKeyboardStatys && <PopupConvertKeyboard close={() => setConvertKeyboardStatys(false)} />}

        {editFiles && (
          <Popup
            popupLogo="Edit files"
            // submit={() => carIMG.fileBase64 && decodeBase64(carIMG.fileBase64[0])}
            // submit={() => console.log(1)}
            close={() => setEditFiles(false)}
          >
            <PopupGalery
              carImgFiles={form.fileInputs.carImages.objectFiles}
              setFilesSorted={form.fileInputs.carImages.setObjectFiles}
            />

            <div className="popupDownButtonsBlock">
              <DefaultButton
                text="Close"
                border
                events={{
                  onClick: () => {
                    setEditFiles(false);
                  },
                }}
              />
            </div>
          </Popup>
        )}
      </DragAndDrop>
    </>
  );
}
