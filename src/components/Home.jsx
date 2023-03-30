import React from 'react'
import {Box, Image, Text} from '@chakra-ui/react'
import btcSrc from '../assets/btc.png'

const Home = () => {
  return (
    <Box w={'full'} h={'85vh'}>
      <Image src={btcSrc} w={'full'} h={'full'} objectFit={'contain'}/>
      <Text
        fontSize={'6xl'}
        textAlign={'center'}
        fontWeight={'thin'}
        color={'blackalpha.700'}
        mt={-20}
      >xCrypto</Text>
    </Box>
  )
}

export default Home