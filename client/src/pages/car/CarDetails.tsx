import React, { useEffect, useRef, useState } from 'react';
import {
  ButtonsHeader,
  CarNumber,
  DefaultButton,
  Galery,
  Hr,
  LineButtons,
  PathToPage,
  Popup,
  TableBody,
  TableContainer,
  TableHead,
} from '../../components';
import { useParams } from 'react-router';

import NoPhoto from '../../assets/img/no-photo-620x495.jpg';

import './carDetails.scss';
import { CAR_PAGE } from '../../routes/paths';
import carApi from '../../services/carApi';
import costApi from '../../services/carCostApi';
import { regPatterns } from '../../config/config';
import { useForm, useInputText, InputText } from '../../components/form';

interface carCostInterface {
  carId: string;
  name: string;
  category: string;
  date: string;
  number: number;
  price: number;
}

const thContent = [
  { title: 'Назва', sortName: 'name', className: 'w250 textLeft' },
  { title: 'Категорія', sortName: 'category', className: 'w200 textLeft' },
  { title: 'Дата', sortName: 'date', className: 'w100 textCenter' },
  { title: 'Ціна (грн)', sortName: 'price', className: 'w100 textRight' },
  { title: 'Кількість', sortName: 'number', className: 'w100 textRight' },
  { title: 'Сума', sortName: 'sum', className: 'w100 textRight' },
];

const tableCategoryesList = [
  { title: 'Всі', sortName: '' },
  { title: 'Запчастини', sortName: 'Запчастини' },
  { title: 'Оснастки', sortName: 'Оснастки' },
  { title: 'Паливо-мастильні', sortName: 'Паливо-мастильні' },
  { title: 'Малярка', sortName: 'Малярка' },
];

type carDetailsProps = {
  id: string;
  userId: string;
  brend: string;
  model: string;
  year: string;
  number: string;
  price: number;
  sum: number;
  costs: carDetailsCostsProps[] | [];
  images: string[];
};

type carDetailsCostsProps = {
  id: string;
  name: string;
  category: string;
  date: string;
  number: number;
  price: number;
};

type SortDirection = 'up' | 'down';

function sortArrayByParam(
  array: carDetailsCostsProps[],
  param: keyof carDetailsCostsProps,
  direction: SortDirection
): carDetailsCostsProps[] {
  return array.sort((a, b) => {
    const valueA = a[param];
    const valueB = b[param];

    let comparison = 0;

    if (valueA < valueB) {
      comparison = -1;
    } else if (valueA > valueB) {
      comparison = 1;
    }

    if (param === 'name') {
      return direction === 'down' ? comparison * -1 : comparison;
    }

    return direction === 'up' ? comparison * -1 : comparison;
  });
}

export default function CarDetails() {
  const { carId } = useParams();

  const [filterParam, setFilterParam] = useState<keyof carDetailsCostsProps>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('up');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [addCostsPopup, setAddCostsPopup] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [costId, setCostId] = useState<string | null>(null);
  const [carDetails, setCarDetails] = useState<carDetailsProps>();

  const onSubmit = async () => {
    if (isEdit) {
      await costApi.editCost({
        carId: carId,
        costId: costId,
        name: form.textInputs.addName.value,
        category: form.textInputs.addCategory.value,
        date: form.textInputs.addDate.value,
        price: +form.textInputs.addPrice.value,
        number: +form.textInputs.addNumber.value,
      });
      form.textInputs.addName.reset();
      form.textInputs.addCategory.reset();
      form.textInputs.addDate.reset();
      form.textInputs.addPrice.reset();
      form.textInputs.addNumber.reset();
      setAddCostsPopup(false);
      return;
    }
    await costApi.addCost({
      carId: carId,
      name: form.textInputs.addName.value,
      category: form.textInputs.addCategory.value,
      date: form.textInputs.addDate.value,
      price: +form.textInputs.addPrice.value,
      number: +form.textInputs.addNumber.value,
    });
    form.textInputs.addName.reset();
    form.textInputs.addCategory.reset();
    form.textInputs.addDate.reset();
    form.textInputs.addPrice.reset();
    form.textInputs.addNumber.reset();
    setAddCostsPopup(false);
  };

  const form = useForm({
    submitFunction: onSubmit,

    textInputs: {
      addName: useInputText({
        name: 'addName',
        placeholder: 'Name',
        inputValue: '',
        reg: regPatterns.carCost.name,
        required: true,
      }),
      addCategory: useInputText({
        name: 'addCategory',
        placeholder: 'Category',
        inputValue: '',
        reg: regPatterns.carCost.category,
        required: true,
      }),
      addDate: useInputText({
        name: 'addDate',
        placeholder: 'Dete',
        inputValue: '',
        reg: regPatterns.carCost.date,
        required: true,
      }),
      addPrice: useInputText({
        name: 'addPrice',
        placeholder: 'Price',
        inputValue: '',
        reg: regPatterns.carCost.price,
        required: true,
      }),
      addNumber: useInputText({
        name: 'addNumber',
        placeholder: 'Number',
        inputValue: '',
        reg: regPatterns.carCost.number,
        required: true,
      }),
    },
  });

  const closePopup = () => {
    if (isEdit) {
      setCostId(null);
      setIsEdit(false);
      form.textInputs.addName.reset();
      form.textInputs.addCategory.reset();
      form.textInputs.addDate.reset();
      form.textInputs.addPrice.reset();
      form.textInputs.addNumber.reset();
    }
    setAddCostsPopup(false);
  };

  useEffect(() => {
    getcarById();
  }, []);

  const getcarById = async () => {
    if (!carId) return;
    const cars = await carApi.getCarById(carId);
    setCarDetails(cars);
  };

  const tbodyData = () => {
    if (!carDetails) return [];
    return sortArrayByParam(carDetails.costs, filterParam, sortDirection);
  };

  // сортування
  const sortedData = tbodyData();
  const handleSort = (param: keyof carDetailsCostsProps) => {
    if (param === filterParam) {
      setSortDirection(sortDirection === 'up' ? 'down' : 'up');
    } else {
      setFilterParam(param);
      setSortDirection('up');
    }
  };

  // Фільтр
  const filteredData = sortedData.filter((row) => {
    if (row.category === searchKeyword) {
      return row;
    } else if (searchKeyword === '') {
      return row;
    }
    return;
  });

  const deleteRowInTable = async (id: string) => {
    if (!carId) return;
    costApi.deleteCost({ carId: carId, costId: id });
  };

  const editRowInTable = (id: string) => {
    if (!carDetails) return;
    const toEdit = carDetails.costs.find((item) => item.id === id);
    if (toEdit === undefined) return;
    setCostId(id);
    form.textInputs.addName.setValue(toEdit.name);
    form.textInputs.addCategory.setValue(toEdit.category);
    form.textInputs.addDate.setValue(toEdit.date);
    form.textInputs.addPrice.setValue(toEdit.price.toString());
    form.textInputs.addNumber.setValue(toEdit.number.toString());
    setAddCostsPopup(true);
    setIsEdit(true);
  };

  return (
    <>
      <div className="pageHeader">
        <PathToPage
          props={[
            ['Car list', CAR_PAGE.list],
            [`Car details`, `${CAR_PAGE.details}/${carId}`],
          ]}
        />

        <ButtonsHeader>
          <DefaultButton text="Close" border to={CAR_PAGE.list} style={{ marginRight: '5px' }} />
          <DefaultButton text="Edit" border to={`${CAR_PAGE.edit}/${carId}`} style={{ marginRight: '5px' }} />
        </ButtonsHeader>
      </div>

      <div className="carMainInfo">
        <div className="carImage">
          <Galery src={carDetails && carDetails.images.length > 0 ? carDetails.images : null} defaultImg={NoPhoto} />
        </div>

        <div className="carInfo">
          <div className="carName">
            <span>{carDetails && carDetails.brend ? `${carDetails.brend} ${carDetails.model}` : ''}</span>
          </div>
          <CarNumber number={carDetails && carDetails.number} />
          <Hr />
          <div className="purchasePrice">
            Купили: <span>{`${carDetails && carDetails.price} $`}</span>
          </div>
          <div className="costs">
            Витрати: <span>{`${carDetails && carDetails.sum} $`}</span>
          </div>
          <div>
            Рік авто: <span>{`${carDetails && carDetails.year}`}</span>
          </div>

          <DefaultButton
            text="Додати витрати"
            border
            events={{
              onClick: () => setAddCostsPopup(true),
            }}
            style={{ marginTop: '16px' }}
          />
        </div>
      </div>

      <LineButtons list={tableCategoryesList} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />

      <TableContainer>
        <TableHead handleSort={handleSort} filter={filterParam} sortDirection={sortDirection} props={thContent} />
        <TableBody content={filteredData} onDelete={deleteRowInTable} onEdit={editRowInTable} />
      </TableContainer>

      {addCostsPopup && (
        <Popup close={closePopup} popupLogo="Add cost">
          <InputText defaultProps={form.textInputs.addName} />
          <InputText defaultProps={form.textInputs.addCategory} />
          <InputText defaultProps={form.textInputs.addDate} />
          <InputText defaultProps={form.textInputs.addPrice} />
          <InputText defaultProps={form.textInputs.addNumber} />

          <div className="popupDownButtonsBlock">
            <DefaultButton text="Add" bg events={{ onClick: form.submit }} style={{ marginRight: '5px' }} />
            <DefaultButton
              text="Close"
              border
              events={{
                onClick: () => {
                  setAddCostsPopup(false);
                },
              }}
            />
          </div>
        </Popup>
      )}
    </>
  );
}
