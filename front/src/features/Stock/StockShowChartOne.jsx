import "../../static/fonts/font.css"
import StockChart from "./StockChart";
import classes from './StockShowChartOne.module.css'

const BASE_URL = 'http://localhost:8090/stocks/watch'

const StockShowChartOne = (props) => {
  let headers = new Headers({
    'Content-Type' : 'application/json'
  });
  const accessToken = sessionStorage.getItem("USER");
  if(accessToken && accessToken !== null){
      headers.append("Authorization", "Bearer " + accessToken);
  }

    const clickDelHandler = async() => {
        await fetch(BASE_URL, {
          method: 'Delete',
          headers: headers,
          body: JSON.stringify({
            code: props.code
          })
        })
    
        window.location.reload();
      }
    
    const rate = props.changeRate;
    const sub = typeof rate === 'string'?rate.substr(0, 1) : '';

  return (
    <div className={classes.stock_data}>
        <button onClick={clickDelHandler} className={classes.stock_data_closebutton}>X</button>
        <div>
            <div className={classes.stock_data__header}>
            <h1>{props.name}</h1>
            <div className={
                (sub === '+') 
                ? classes.stock_data__header_sub__red
                : (sub === '0')
                ? classes.stock_data__header_sub__black
                : classes.stock_data__header_sub__blue
                }>
                <h2>{props.price}</h2>
                <h4>{props.changeRate}</h4>
                <h4>{props.change}</h4>
            </div>
            </div>

            <div className={classes.stock_data__chart}>
                <StockChart stockData={props.stockData}/>
            </div>
        </div>
    </div>
  )
}

export default StockShowChartOne