import { Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const ExchangesCard = ({ name, img, rank, url }) => {
  return <a href={url} target={'blank'}>
  <VStack
    w={52}
    p={8}
    shadow={'md'}
    m={'4'}
    borderRadius={'lg'}
    transition={'all 0.5s'}
    css={{
      "&:hover": {
        transform: "scale(1.1)",
      }
    }}
  >
    <Image src={img} w={10} h={10} objectFit={'contain'} />
    <Heading size={'md'} noOfLines={1}>{rank}</Heading>
    <Text noOfLines={1}>{name}</Text>
  </VStack>
</a>
}

export default ExchangesCard