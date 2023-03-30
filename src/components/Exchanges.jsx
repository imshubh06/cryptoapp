import React, { useEffect, useState } from 'react'
import { Container, HStack} from '@chakra-ui/react'
import axios from 'axios'
import { server } from '..'
import Loader from './Loader'
import ErrorComponent from './ErrorComponent'
import ExchangesCard from './ExchagesCard'

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(false)

  useEffect(() => {

    const fetchExchanges = async () => {

      try {

        const { data } = await axios.get(`${server}/exchanges`)
        setExchanges(data);
        setLoading(false)

      } catch (error) {
        setLoading(false)
        setError(true)
      }



    }
    fetchExchanges();


  }, [])


  if (error) return <ErrorComponent message={"Error While Fetching"}/>


  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> : <>
          <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
            {
              exchanges.map((i) => (
                <ExchangesCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
              ))
            }
          </HStack>
        </>
      }
    </Container>
  )
}



export default Exchanges