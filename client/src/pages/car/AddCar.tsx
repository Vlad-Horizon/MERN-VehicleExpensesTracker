import React, { useEffect, useRef, useState } from 'react';
import {
  ButtonsHeader,
  DefaultButton,
  Galery,
  InputFiles,
  InputText,
  PathToPage,
  Popup,
  PopupGalery,
} from '../../components';
import { useForm, useInputText, useInputFiles } from '../../hooks';

import NoPhoto from '../../assets/img/no-photo-620x495.jpg';

import './carAdd.scss';
import { CAR_PAGE } from '../../routes/paths';
import PopupConvertKeyboard from '../../components/popup/PopupConvertKeyboard';
import carApi from '../../services/carApi';
import { useParams, useNavigate } from 'react-router-dom';
import { createUrlToFile } from '../../utils/createUrlToFile';
import { base64DecodeFile } from '../../utils/base64DecodeFile';

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
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [convertKeyboardStatys, setConvertKeyboardStatys] = useState<boolean>(false);
  const [editFiles, setEditFiles] = useState<boolean>(false);

  const carBrend = useInputText({
    name: 'carBrend',
    label: 'Car brend',
    inputValue: '',
    reg: /^[A-Z][a-z]*$/,
    required: true,
    submit: isSubmit,
  });
  const carModel = useInputText({
    name: 'carModel',
    label: 'Car model',
    inputValue: '',
    reg: /^[A-Z][a-z0-9 ]*$/,
    required: true,
    submit: isSubmit,
  });
  const carYear = useInputText({
    name: 'carYear',
    label: 'Car year',
    inputValue: '',
    reg: /^[0-9]{4}$/,
    required: true,
    submit: isSubmit,
  });
  const carNumber = useInputText({
    name: 'carNumber',
    label: 'Car number',
    inputValue: '',
    reg: /^[А-Я]{2}[0-9]{4}[А-Я]{2}$/,
    required: true,
    submit: isSubmit,
  });
  const carPrice = useInputText({
    name: 'carPrice',
    label: 'Car price',
    inputValue: '',
    reg: /^[0-9 ]+$/,
    required: true,
    submit: isSubmit,
  });

  const carIMG = useInputFiles({
    name: 'carPrice',
    label: 'Car image',
    required: false,
    submit: isSubmit,
    multifile: true,
    accept: '.jpg, .png, .jpeg, .webp',
  });
  const form = useForm({
    inputs: [carIMG.valid, carBrend.valid, carModel.valid, carYear.valid, carNumber.valid, carPrice.valid],
  });

  const getCarById = async () => {
    if (!isEdit || !carId) return;
    const car = await carApi.getCarById(carId);

    if (!car) return;
    const { images, brend, model, year, number, price } = car;

    carBrend.setValue(brend);
    carModel.setValue(model);
    carYear.setValue(year);
    carNumber.setValue(number);
    carPrice.setValue(price);
    carIMG.setFilesSorted(
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

  const submit = () => {
    setIsSubmit(true);
    if (!form.valid) return;

    if (isEdit && carId) {
      carApi.editCar({
        carId: carId,
        images: carIMG.files.map((file) => file.base64),
        brend: carBrend.value,
        model: carModel.value,
        year: carYear.value,
        number: carNumber.value,
        price: +carPrice.value,
      });
      navigate('/');
      return;
    }

    carApi.createCar({
      images: carIMG.files.map((file) => file.base64),
      brend: carBrend.value,
      model: carModel.value,
      year: carYear.value,
      number: carNumber.value,
      price: +carPrice.value,
    });
    navigate('/');
  };

  const deleteCar = async () => {
    if (!isEdit || !carId) return;
    await carApi.deleteCar(carId);
  };

  return (
    <>
      <div className="pageHeader">
        <PathToPage
          props={[
            ['Car list', CAR_PAGE.list],
            [`Car ${isEdit ? 'edit' : 'create'}`, `${isEdit ? `${CAR_PAGE.edit}/${carId}` : CAR_PAGE.add}`],
          ]}
        />

        <ButtonsHeader>
          {/* <DefaultButton
            text="Convert keyboard"
            bg
            events={{
              onClick: () => setConvertKeyboardStatys(true),
            }}
            style={{ marginRight: '5px' }}
          /> */}

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
              onClick: () => submit(),
            }}
          />
        </ButtonsHeader>
      </div>

      <div className="addCarPage">
        <div className="imgContainer">
          <Galery src={carIMG.files.map((item) => item.url)} defaultImg={NoPhoto} isUrl />
        </div>

        <div className="addCarForm">
          {!form.valid && isSubmit && <div className="textError">Помилка в заповненні форми</div>}

          <div className="innerAddCarForm">
            <InputText
              name={carBrend.name}
              value={carBrend.value}
              viewName={carBrend.label}
              error={carBrend.error}
              errorText={carBrend.errorText}
              events={{
                onChange: carBrend.onChange,
              }}
            />

            <InputText
              name={carModel.name}
              value={carModel.value}
              viewName={carModel.label}
              error={carModel.error}
              errorText={carModel.errorText}
              events={{
                onChange: carModel.onChange,
              }}
            />

            <InputText
              name={carYear.name}
              value={carYear.value}
              viewName={carYear.label}
              error={carYear.error}
              errorText={carYear.errorText}
              events={{
                onChange: carYear.onChange,
              }}
            />

            <InputText
              name={carNumber.name}
              value={carNumber.value}
              viewName={carNumber.label}
              error={carNumber.error}
              errorText={carNumber.errorText}
              events={{
                onChange: carNumber.onChange,
              }}
            />

            <InputText
              name={carPrice.name}
              value={carPrice.value}
              viewName={carPrice.label}
              error={carPrice.error}
              errorText={carPrice.errorText}
              events={{
                onChange: carPrice.onChange,
              }}
            />

            <InputFiles
              name={carIMG.name}
              label={carIMG.label}
              file={carIMG.files}
              setFile={carIMG.setFiles}
              accept={carIMG.accept}
              error={carIMG.error}
              errorText={carIMG.errorText}
              multiple={carIMG.multifile}
            />
          </div>

          {carIMG.files.length > 0 && (
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
          name="Edit files"
          // submit={() => carIMG.fileBase64 && decodeBase64(carIMG.fileBase64[0])}
          submit={() => console.log(1)}
          close={() => setEditFiles(false)}
        >
          <PopupGalery carImgFiles={carIMG.files} setFilesSorted={carIMG.setFilesSorted} />
        </Popup>
      )}
    </>
  );
}
