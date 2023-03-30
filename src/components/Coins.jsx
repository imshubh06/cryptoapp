import React, { useEffect, useState } from 'react'
import { Button, Container, HStack, Radio, RadioGroup } from '@chakra-ui/react'
import axios from 'axios'
import { server } from '..'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import CoinsCard from './CoinsCard'

const Coins = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const [page, setPage] = useState(1)
  const [currency, setCurrency] = useState("inr")

  const currency_symbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = new Array(132).fill(1);

  const changePage=(page)=>{
    setPage(page);
    setLoading(true);
  }

  useEffect(() => {

    const fetchCoins = async () => {

      try {

        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data);
        setLoading(false)

      } catch (error) {
        setLoading(false)
        setError(true)
      }



    }
    fetchCoins();


  }, [currency, page])


  if (error) return <ErrorComponent message={"Error While Fetching"} />


  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> : <>

        <RadioGroup value={currency} onChange={setCurrency}>
          <HStack justifyContent={'center'} p={'8'}>
            <Radio value='inr'>INR</Radio>
            <Radio value='eur'>EUR</Radio>
            <Radio value='usd'>USD</Radio>
          </HStack>
        </RadioGroup>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
              coins.map((i) => (
                <CoinsCard key={i.id} id={i.id} name={i.name} img={i.image} price={i.current_price} symbol={i.symbol} currency_symbol={currency_symbol} />
              ))
            }
          </HStack>
          <HStack py={'16'} w={'full'} overflowX={'auto'} >
            {
              btns.map((item, index) => (
                <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={()=>changePage(index+1)}>
                  {index+1}
                </Button>
              ))
            }
          </HStack>
        </>
      }
    </Container>
  )
}





export default Coins