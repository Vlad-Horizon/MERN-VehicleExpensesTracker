import React, { useState, useRef } from 'react'
import { Close, Magnifi, Parameters } from '../../assets'
import {RadioButton} from '../index'
import useWindowSize from '../../hooks/useWindowSize';

import './search.scss'

export default function Search() {
  const [searchValue, setSearchValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const windowSize = useWindowSize().width;  

  const clearSearchValue = () => {
    setSearchValue('');
    inputRef.current?.focus();
  }

  if (windowSize <= 700) return <></>

  return (
    <div className='Search'>

      <RadioButton sx={{margin: '0 0 0 5px'}}>
        <Magnifi />
      </RadioButton>

      <div className='searchInputBlock'>
        <input 
          ref={inputRef}
          type='text'
          className={`searchInput ${searchValue && 'searchInputActive'}`}
          placeholder='Search...' 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        
        {
          searchValue && (
            <div className='inputButtonContainer'>
              <RadioButton
                events={{
                  onClick: () => {clearSearchValue()}
                }}
              >
                <Close />
              </RadioButton>
            </div>
          )
        }
      </div>

      <RadioButton>
        <Parameters />
      </RadioButton>
    </div>
  )
}