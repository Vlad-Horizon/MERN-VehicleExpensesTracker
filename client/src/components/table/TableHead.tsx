import React from 'react'
import { ArrowDown, ArrowUp } from '../../assets'

import './table.scss'

interface compotentProps {
  filter: string,
  sortDirection: string,
  handleSort: Function,
  props: object[],
}

export default function TableHead({filter, handleSort, sortDirection, props}: compotentProps) {
  const tableHeadList = () => {
    const table = props.map((item: any, i: number) => {
      const {title, className, sortName} = item;

      return (
        <th key={i}>
          <div className={`thButton ${className}`}>
            <div className={`innerThButton`} onClick={() => handleSort(sortName)}>
              <span className={`thButtonText ${sortName === filter && 'thButtonText_Active'}`}>{title}</span>
              <div className={`svgContainer ${sortName === filter && 'svgContainer_Active'}`}>
                {
                  sortName === filter ? 
                    sortDirection === 'up' ? (<ArrowDown />) : (<ArrowUp />) : (<ArrowDown />)
                }
              </div>
            </div>
          </div>
        </th>
      )
    })

    return table
  }

  return (
    <thead>
      <tr>
        {tableHeadList()}
        <th></th>
        <th></th>
        <th />
      </tr>
    </thead>
  )
}