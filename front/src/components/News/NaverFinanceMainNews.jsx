import React from 'react'
import classes from './NaverFinanceMainNews.module.css'

const NaverFinanceMainNews = (props) => {
  return (
    <a className={classes.news} href={props.link} target='_blank' rel="noreferrer">
        <div className={classes.news__img}>
            <img src={props.img} alt="" />
        </div>
        <div className={classes.news__contents}>
            <h5>{props.title}</h5>
            <p>{props.description}</p>                
        </div>
    </a>
  )
}

export default NaverFinanceMainNews