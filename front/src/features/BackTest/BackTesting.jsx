import React from 'react'
import StartYear from './StartYear'
import EndYear from './EndYear';
import Rebalancing from './Rebalancing';
import Seed from './Seed';


const BackTesting = () => {

  return (
    <div >
        <StartYear/>
        <EndYear/>
        <Rebalancing/>
        <Seed/>
    </div>
  )
}

export default BackTesting