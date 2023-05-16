import React, { useEffect, useRef, useState } from 'react'
import { DefaultButton, Galery, Hr, InputText, LineButtons, Popup, ScrollHorizontel, TableBody, TableContainer, TableHead } from '../../components'

import NoPhoto from '../../assets/img/no-photo-620x495.jpg'

import './carDetails.scss'
import { useInputText } from '../../hooks'
import { CAR_PAGE } from '../../routes/paths'

const thContent = [
  {title: 'Назва',      sortName: 'name',     className: 'w250 textLeft'},
  {title: 'Категорія',  sortName: 'category', className: 'w200 textLeft'},
  {title: 'Дата',       sortName: 'date',     className: 'w100 textCenter'},
  {title: 'Ціна (грн)', sortName: 'price',    className: 'w100 textRight'},
  {title: 'Кількість',  sortName: 'number',   className: 'w100 textRight'},
  {title: 'Сума',       sortName: 'sum',      className: 'w100 textRight'},
]

const tableCategoryesList = [
  {title: 'Всі', sortName: ''},
  {title: 'Запчастини', sortName: 'Запчастини'},
  {title: 'Оснастки', sortName: 'Оснастки'},
  {title: 'Паливо-мастильні', sortName: 'Паливо-мастильні'},
  {title: 'Малярка', sortName: 'Малярка'},
]

export default function CarDetails() {
  const [filterParam, setFilterParam] = useState<keyof Item>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('up');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [addCostsPopup, setAddCostsPopup] = useState<boolean>(false);
  // 
  const [tbContent, setTbContent] = useState([
    {id: 0, name: 'Диск для болгарки 2мм',   category: 'Оснастки',           date: '10.04.2023', price: 50,  number: 1,    sum: 50},
    {id: 1, name: 'Гайки М8',                category: 'Оснастки',           date: '10.04.2023', price: 10,  number: 100,  sum: 1000},
    {id: 2, name: 'АГайки М8',               category: 'Оснастки',           date: '11.04.2023', price: 10,  number: 100,  sum: 1000},
    {id: 3, name: 'Тормозна жидкість',       category: 'Паливо-мастильні',   date: '10.04.2023', price: 150, number: 1,    sum: 150},
    {id: 4, name: 'Карб',                    category: 'Запчастини',         date: '9.04.2023',  price: 90,  number: 1,    sum: 90},
    {id: 5, name: 'Фарба зеоена 2л',         category: 'Малярка',            date: '9.04.2023',  price: 190, number: 1,    sum: 190},
  ])
  // 
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [costId, setCostId] = useState<number | null>(null);
  const addName = useInputText({name: 'addName', label: 'Name', inputValue: '', reg: /^[A-ZА-Я][a-zа-я ]*$/, required: true, submit: isSubmit});
  const addCategory = useInputText({name: 'addCategory', label: 'Category', inputValue: '', reg: /^[A-ZА-Я][a-zа-я ]*$/, required: true, submit: isSubmit});
  const addDete = useInputText({name: 'addDete', label: 'Dete', inputValue: '', reg: /^([0-9]{2}|[0-9]{1})\.[0-9]{2}\.[0-9]{4}$/, required: true, submit: isSubmit});
  const addPrice = useInputText({name: 'addPrice', label: 'Price', inputValue: '', reg: /^[0-9]+$/, required: true, submit: isSubmit});
  const addNumber = useInputText({name: 'addNumber', label: 'Number', inputValue: '', reg: /^[0-9]+$/, required: true, submit: isSubmit});
  const addSum = useInputText({name: 'addSum', label: 'Sum', inputValue: '', reg: /^[0-9]+$/, required: true, submit: isSubmit});

const closePopup = () => {  
  if (isEdit) {
    setCostId(null);
    setIsEdit(false);
    
    addName.reset();
    addCategory.reset();
    addDete.reset();
    addPrice.reset();
    addNumber.reset();
    addSum.reset();
  }

  setAddCostsPopup(false)
}

  const submitAddCosts = () => {    
    setIsSubmit(true);

    if (
      !addName.valid ||
      !addCategory.valid ||
      !addDete.valid ||
      !addPrice.valid ||
      !addNumber.valid ||
      !addSum.valid
    ) return;

    if (isEdit) {
      setTbContent(prevState => prevState.map(obj => {
        if (obj.id === costId) {
          return {
            id: obj.id, 
            name: addName.value, 
            category: addCategory.value, 
            date: addDete.value, 
            price: +addPrice.value, 
            number: +addNumber.value, 
            sum: +addSum.value
          };
        }
        return obj;
      }));

      clearAddCostsInputs();
      return;
    }

    setTbContent([...tbContent, {
      id: tbContent.length, 
      name: addName.value, 
      category: addCategory.value, 
      date: addDete.value, 
      price: +addPrice.value, 
      number: +addNumber.value, 
      sum: +addSum.value
    }]);

    clearAddCostsInputs();
  }

  const clearAddCostsInputs = () => {
    addName.reset();
    addCategory.reset();
    addDete.reset();
    addPrice.reset();
    addNumber.reset();
    addSum.reset();

    setIsSubmit(false);
    setAddCostsPopup(false);
  }

  // сортування
  const sortedData = sortArrayByParam(tbContent, filterParam, sortDirection);
  const handleSort = (param: keyof Item) => {
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
      return row
    } else if (searchKeyword === '') {
      return row
    }

    return
  }
  );

  const deleteRowInTable = (id: number) => {
    setTbContent(tbContent.filter(item => item.id !== id));
  }

  const editRowInTable = (id: number) => {
    const toEdit = tbContent.find(item => item.id === id);
    if (toEdit === undefined) return

    setCostId(id);

    addName.setValue(toEdit.name);
    addCategory.setValue(toEdit.category);
    addDete.setValue(toEdit.date);
    addPrice.setValue(toEdit.price.toString());
    addNumber.setValue(toEdit.number.toString());
    addSum.setValue(toEdit.sum.toString());

    setAddCostsPopup(true);
    setIsEdit(true);
  }

  return (
    <>
    <DefaultButton 
      text='Close'
      border
      to={CAR_PAGE.list}
      style={{marginRight: '5px'}}
    />
    
      <div className='carMainInfo'>
        <div className='carImage'>
          <Galery
            src={['https://vag.ua/wp-content/uploads/2021/12/%D0%A4%D0%BE%D1%82%D0%BE-1.jpg', 'https://nextcar.ua/images/companies/1/audi-etron-gt-official/audi-e-tron-gt.jpg?1612941904950', 'https://olmaks.ua/wp-content/uploads/2021/03/audi-e-tron_gt_quattro-rul.jpg']}
            defaultImg={NoPhoto}
          />
        </div>

        <div className='carInfo'>
          <div className='carName'>
            <span>{`Audi Q8 2022`}</span>
          </div>
          <div className='CarNumber'>
            <div className='numberContainer'>
              <div className='cauntry'>
                <div className='flag'>
                  <div className='blue'></div>
                  <div className='yelow'></div>
                </div>
                <div className='ua'>
                  <span>UA</span>
                </div>
              </div>
              <div className='field'>
                <span>АВ</span>
                <span>1234</span>
                <span>АВ</span>
              </div>
            </div>
          </div>          
          <Hr />
          <div className='purchasePrice'>Купили: <span>120 000 $</span></div>
          <div className='costs'>Витрати: <span>0 $</span></div>
          <div>Дата покупки: <span>04.11.2022</span></div>

          <DefaultButton
            text='Додати витрати'
            border
            events={{
              onClick: () => {setAddCostsPopup(true)}
            }}
          />
        </div>
      </div>

      <LineButtons 
        list={tableCategoryesList}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />

      <TableContainer>
        <TableHead
          handleSort={handleSort}
          filter={filterParam}
          sortDirection={sortDirection}
          props={thContent}
        />
        <TableBody 
          content={filteredData}
          onDelete={deleteRowInTable}
          onEdit={editRowInTable}
        />
      </TableContainer>


      {
        addCostsPopup && (
          <Popup
            name='Add costs'
            close={() => {closePopup()}}
            submit={() => {submitAddCosts()}}
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

            <InputText 
              name={addSum.name}
              value={addSum.value}
              viewName={addSum.label}
              error={addSum.error}
              errorText={addSum.errorText}
              events={{
                onChange: addSum.onChange,
              }}
            />
          </Popup>
        )
      }
    </>
  )
}

// 

type SortDirection = 'up' | 'down';

type Item = {
  id: number;
  name: string;
  category: string;
  date: string;
  price: number;
  number: number;
  sum: number;
};

function sortArrayByParam(array: Item[], param: keyof Item, direction: SortDirection): Item[] {
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