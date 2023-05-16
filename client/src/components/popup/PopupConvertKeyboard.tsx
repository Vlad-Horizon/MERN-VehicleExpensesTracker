import React, {useState, useEffect} from 'react'
import { useInputText } from '../../hooks';
import InputText from '../formsConponents/inputs/inputText/InputText'
import Popup from './Popup'

interface componentProps {
  close: Function,
}

const lates = [
  ['q', 'й'], ['Q', 'Й'],
  ['w', 'ц'], ['W', 'Ц'],
  ['e', 'у'], ['E', 'У'],
  ['r', 'к'], ['R', 'К'],
  ['t', 'е'], ['T', 'Е'],
  ['y', 'н'], ['Y', 'Н'],
  ['u', 'г'], ['U', 'Г'],
  ['i', 'ш'], ['I', 'Ш'],
  ['o', 'щ'], ['O', 'Щ'],
  ['p', 'з'], ['P', 'З'],
  ['[', 'х'], ['{', 'Х'],
  [']', 'ї'], ['}', 'Ї'],
  
  ['a', 'ф'], ['A', 'Ф'],
  ['s', 'і'], ['S', 'І'],
  ['d', 'в'], ['D', 'В'],
  ['f', 'а'], ['F', 'А'],
  ['g', 'п'], ['G', 'П'],
  ['h', 'р'], ['H', 'Р'],
  ['j', 'о'], ['J', 'О'],
  ['k', 'л'], ['K', 'Л'],
  ['l', 'д'], ['L', 'Д'],
  [';', 'ж'], [':', 'Ж'],
  [`'`, 'є'], ['"', 'Є'],

  ['z', 'я'], ['Z', 'Я'],
  ['x', 'ч'], ['X', 'Ч'],
  ['c', 'с'], ['C', 'С'],
  ['v', 'м'], ['V', 'М'],
  ['b', 'и'], ['B', 'И'],
  ['n', 'т'], ['N', 'Т'],
  ['m', 'ь'], ['M', 'Ь'],
  [',', 'б'], ['<', 'Б'],
  ['.', 'ю'], ['>', 'Ю'],
  ['/', '.'], ['?', ','],
]

export default function PopupConvertKeyboard({close}: componentProps) {
  const convertKeyboard = useInputText({name: 'convertKeyboard', label: 'Convert', inputValue: '', submit: true});

  const convertWords = async (str: string) => {
    if (!navigator.clipboard) return;

    const isCyrillic = /[а-яіїєґ]/i.test(str);

    let result = "";
    for (let i = 0; i < str.length; i++) {
      let char = str[i];
      for (let j = 0; j < lates.length; j++) {
        if (!isCyrillic) {
          if (char === lates[j][0]) {
            char = lates[j][1];
            break;
          }
        } else {
          if (char === lates[j][1]) {
            char = lates[j][0];
            break;
          }
        }
      }
      result += char;
    }
    copyText(result)
  }

  const copyText = (text: string) => {
    // Створюємо тимчасовий елемент textarea
    const textarea = document.createElement('textarea');
    // Задаємо йому значення тексту
    textarea.value = text;
    // Додаємо його до DOM
    document.body.appendChild(textarea);
    // Виділяємо текст в textarea
    textarea.select();
    // Копіюємо виділений текст в буфер обміну
    document.execCommand('copy');
    // Видаляємо тимчасовий елемент textarea
    document.body.removeChild(textarea);
  };

  return (
    <>
      <Popup
        name={'Convert keyboard'}
        submit={() => {convertWords(convertKeyboard.value)}}
        close={close}
      >
        <InputText 
          name={convertKeyboard.name}
          viewName={convertKeyboard.label}
          value={convertKeyboard.value}
          events={{
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => convertKeyboard.onChange(e),

            onPaste:(e: React.ClipboardEvent<HTMLDivElement>) => {
              const clipboardData = e.clipboardData;
              convertWords(clipboardData?.getData('text'));
            }
          }}
        />
      </Popup>
    </>
  )
}