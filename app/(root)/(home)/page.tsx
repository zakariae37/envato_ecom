import Categories from '@/components/shared/Categories'
import CheapProducts from '@/components/shared/CheapProducts'
import FreeProducts from '@/components/shared/FreeProducts'
import Header from '@/components/shared/Header'
import Marketplace from '@/components/shared/Marketplace'
import Products from '@/components/shared/Products'
import Themes from '@/components/shared/Themes'
import React from 'react'

const Home = () => {
  return (
    <>
      <Header />
      <Categories />
      <Themes />
      <Products searchParams={{}}  />
      <CheapProducts />
      <Marketplace />
      <FreeProducts searchParams={{}}/>
    </>
  )
}

export default Home