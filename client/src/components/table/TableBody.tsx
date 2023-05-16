import React from 'react';
import { Edit, Tresh } from '../../assets';
import RadioButton from '../radioButton/RadioButton';

import './table.scss';

interface compotentProps {
  content: carDetailsCostsProps[];
  onDelete: any;
  onEdit: any;
}

type carDetailsCostsProps = {
  id: string;
  name: string;
  category: string;
  date: string;
  number: number;
  price: number;
};

export default function TableBody({ content, onDelete, onEdit }: compotentProps) {
  const tableBodyList = () => {
    const table = content.map((item, i) => {
      const { id, name, category, date, price, number } = item;
      const sum = number * price;

      return (
        <tr key={`${i}${id}`}>
          <td className="w250 textLeft">{name}</td>
          <td className="w200 textLeft">{category}</td>
          <td className="w100 textCenter">{date}</td>
          <td className="w100 textRight">{price}</td>
          <td className="w100 textRight">{number}</td>
          <td className="w100 textRight">{sum}</td>
          <td className="w100 textCenter">
            <RadioButton
              children={<Tresh />}
              events={{
                onClick: () => onDelete(id),
              }}
            />
          </td>
          <td className="w100 textCenter">
            <RadioButton
              children={<Edit />}
              events={{
                onClick: () => onEdit(id),
              }}
            />
          </td>
          <td />
        </tr>
      );
    });

    return table;
  };

  return <tbody>{tableBodyList()}</tbody>;
}
