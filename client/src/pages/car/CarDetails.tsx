import React, { useEffect, useRef, useState } from 'react';
import {
  ButtonsHeader,
  CarNumber,
  DefaultButton,
  Galery,
  Hr,
  InputText,
  LineButtons,
  PathToPage,
  Popup,
  ScrollHorizontel,
  TableBody,
  TableContainer,
  TableHead,
} from '../../components';
import { useParams } from 'react-router';

import NoPhoto from '../../assets/img/no-photo-620x495.jpg';

import './carDetails.scss';
import { useInputText } from '../../hooks';
import { CAR_PAGE } from '../../routes/paths';
import carApi from '../../services/carApi';
import costApi from '../../services/carCostApi';

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
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [costId, setCostId] = useState<string | null>(null);

  const addName = useInputText({
    name: 'addName',
    label: 'Name',
    inputValue: '',
    reg: /^[A-ZА-Я][a-zа-я ]*$/,
    required: true,
    submit: isSubmit,
  });
  const addCategory = useInputText({
    name: 'addCategory',
    label: 'Category',
    inputValue: '',
    reg: /^[A-ZА-Я][a-zа-я ]*$/,
    required: true,
    submit: isSubmit,
  });
  const addDete = useInputText({
    name: 'addDete',
    label: 'Dete',
    inputValue: '',
    reg: /^([0-9]{2}|[0-9]{1})\.[0-9]{2}\.[0-9]{4}$/,
    required: true,
    submit: isSubmit,
  });
  const addPrice = useInputText({
    name: 'addPrice',
    label: 'Price',
    inputValue: '',
    reg: /^[0-9]+$/,
    required: true,
    submit: isSubmit,
  });
  const addNumber = useInputText({
    name: 'addNumber',
    label: 'Number',
    inputValue: '',
    reg: /^[0-9]+$/,
    required: true,
    submit: isSubmit,
  });
  const closePopup = () => {
    if (isEdit) {
      setCostId(null);
      setIsEdit(false);

      addName.reset();
      addCategory.reset();
      addDete.reset();
      addPrice.reset();
      addNumber.reset();
    }

    setAddCostsPopup(false);
  };

  const submitAddCosts = async () => {
    setIsSubmit(true);

    if (!addName.valid || !addCategory.valid || !addDete.valid || !addPrice.valid || !addNumber.valid) return;

    if (isEdit) {
      await costApi.editCost({
        carId: carId,
        costId: costId,
        name: addName.value,
        category: addCategory.value,
        date: addDete.value,
        price: +addPrice.value,
        number: +addNumber.value,
      });

      clearAddCostsInputs();
      return;
    }

    await costApi.addCost({
      carId: carId,
      name: addName.value,
      category: addCategory.value,
      date: addDete.value,
      price: +addPrice.value,
      number: +addNumber.value,
    });

    clearAddCostsInputs();
  };

  const [carDetails, setCarDetails] = useState<carDetailsProps>();

  useEffect(() => {
    getcarById();
  }, []);

  const getcarById = async () => {
    if (!carId) return;
    const cars = await carApi.getCarById(carId);
    setCarDetails(cars);
  };

  const clearAddCostsInputs = () => {
    addName.reset();
    addCategory.reset();
    addDete.reset();
    addPrice.reset();
    addNumber.reset();

    setIsSubmit(false);
    setAddCostsPopup(false);
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
    addName.setValue(toEdit.name);
    addCategory.setValue(toEdit.category);
    addDete.setValue(toEdit.date);
    addPrice.setValue(toEdit.price.toString());
    addNumber.setValue(toEdit.number.toString());
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
            <span>{carDetails ? `${carDetails.brend} ${carDetails.model}` : ''}</span>
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
              onClick: () => {
                setAddCostsPopup(true);
              },
            }}
          />
        </div>
      </div>

      <LineButtons list={tableCategoryesList} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />

      <TableContainer>
        <TableHead handleSort={handleSort} filter={filterParam} sortDirection={sortDirection} props={thContent} />
        <TableBody content={filteredData} onDelete={deleteRowInTable} onEdit={editRowInTable} />
      </TableContainer>

      {addCostsPopup && (
        <Popup
          name="Add costs"
          close={() => {
            closePopup();
          }}
          submit={() => {
            submitAddCosts();
          }}
        >
          <InputText
            name={addName.name}
            value={addName.value}
            viewName={addName.label}
            error={addName.error}
            errorText={addName.errorText}
            events={{
              onChange: addName.onChange,
            }}
          />

          <InputText
            name={addCategory.name}
            value={addCategory.value}
            viewName={addCategory.label}
            error={addCategory.error}
            errorText={addCategory.errorText}
            events={{
              onChange: addCategory.onChange,
            }}
          />

          <InputText
            name={addDete.name}
            value={addDete.value}
            viewName={addDete.label}
            error={addDete.error}
            errorText={addDete.errorText}
            events={{
              onChange: addDete.onChange,
            }}
          />

          <InputText
            name={addPrice.name}
            value={addPrice.value}
            viewName={addPrice.label}
            error={addPrice.error}
            errorText={addPrice.errorText}
            events={{
              onChange: addPrice.onChange,
            }}
          />

          <InputText
            name={addNumber.name}
            value={addNumber.value}
            viewName={addNumber.label}
            error={addNumber.error}
            errorText={addNumber.errorText}
            events={{
              onChange: addNumber.onChange,
            }}
          />
        </Popup>
      )}
    </>
  );
}
