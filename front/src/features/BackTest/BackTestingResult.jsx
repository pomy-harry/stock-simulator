import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import ResultChart from './ResultChart'
import ResultChart2 from './ResultChart2'
import classes from './BackTestingResult.module.css'

const BackTestingResult = (props) => {
  return (
    <div>
        <div className={classes.info}>
            요약정보
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="right">초기자본 (원)</TableCell>
                        <TableCell align="right">최종자본 (원)</TableCell>
                        <TableCell align="right">연이율 (%)</TableCell>
                        <TableCell align="right">표준편차 (%)</TableCell>
                        <TableCell align="right">최고 수익률 (%)</TableCell>
                        <TableCell align="right">최악 수익률 (%)</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row" align="right">{String(props.startMoney).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</TableCell>
                        <TableCell align="right">{String(props.endMoney).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</TableCell>
                        <TableCell align="right">{props.cagr}%</TableCell>
                        <TableCell align="right">{props.stdev}%</TableCell>
                        <TableCell align="right">{props.bestYear}%</TableCell>
                        <TableCell align="right">{props.worstYear}%</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

        <div className={classes.info__detail}>
            <ResultChart balances={props.balances}></ResultChart>
        </div>
        <div className={classes.info__detail}>
            <ResultChart2 profits={props.profits}></ResultChart2>
        </div>

        <Button onClick={props.onOpenBacktestResult} className={classes.info__btn}>다시 하기</Button>
    </div>
  )
}

export default BackTestingResult