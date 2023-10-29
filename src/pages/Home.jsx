import axios from 'axios';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import MultipleImage from '../components/MultipleImage';

const Home = () => {




  return (
    <div className='bg-layer'>
      <div className='container text-center rounded  my-5 p-5'>
        <h1>welcome home</h1>
        <h6>Add Your Post</h6>

        <div>
          <MultipleImage />
        </div>
      </div>
    </div>
  )
}

export default Home
