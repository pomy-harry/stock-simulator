import React from 'react'
import classes from './StockSearch.module.css'
import StockSearchInput from '../../components/Inputs/StockSearchInput'

const StockSearch = () => {
  return (
    <form className={classes.stock__search__form}>
        <StockSearchInput className={classes.stock__search__input} />
    </form>
  )
}

export default StockSearch