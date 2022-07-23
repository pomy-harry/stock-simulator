import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const BackTestingResult = (props) => {
  return (
    <>
        {props.balances[0].balance}
        <br></br>
        {props.profits[0].profit}
        요약정보
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>초기자본 (원)</TableCell>
                    <TableCell align="right">최종자본 (원)</TableCell>
                    <TableCell align="right">연이율 (%)</TableCell>
                    <TableCell align="right">표준편차 (%)</TableCell>
                    <TableCell align="right">최고의 해 (년)</TableCell>
                    <TableCell align="right">최악의 해 (년)</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">{props.startMoney}원</TableCell>
                    <TableCell align="right">{props.endMoney}원</TableCell>
                    <TableCell align="right">{props.cagr}%</TableCell>
                    <TableCell align="right">{props.stdev}%</TableCell>
                    <TableCell align="right">{props.bestYear}년</TableCell>
                    <TableCell align="right">{props.worstYear}년</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

        <button onClick={props.onOpenBacktestResult}>다시 하기</button>
    </>
  )
}

export default BackTestingResult