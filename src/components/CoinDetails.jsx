import { Badge, Box, Container, HStack, Image, Progress, Radio, RadioGroup, Stat, StatArrow, StatHelpText, StatLabel, StatNumber, Text, VStack, Button } from '@chakra-ui/react'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { server } from '..';
import ErrorComponent from './ErrorComponent';
import Loader from './Loader';
import { useParams } from 'react-router-dom'
import Chart from './Chart';

const CoinDetails = () => {

  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const params = useParams();


  const currency_symbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];

  const switchChartStats = (key) => {
    switch (key) {
      case "24h":
        setDays("24h")
        setLoading(true)
        break;

      case "7d":
        setDays("7d")
        setLoading(true)
        break;

      case "14d":
        setDays("14d")
        setLoading(true)
        break;

      case "30d":
        setDays("30d")
        setLoading(true)
        break;

      case "60d":
        setDays("60d")
        setLoading(true)
        break;

      case "200d":
        setDays("200d")
        setLoading(true)
        break;

      case "1y":
        setDays("365d")
        setLoading(true)
        break;

      case "max":
        setDays("max")
        setLoading(true)
        break;


      default:
        setDays("24h")
        setLoading(true)
        break;
    }
  }

  useEffect(() => {

    const fetchCoin = async () => {

      try {

        const { data } = await axios.get(`${server}/coins/${params.id}`)

        const { data: chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)


        setChartArray(chartData.prices)
        setCoin(data);
        setLoading(false)

      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
    fetchCoin();


  }, [currency, params.id, days])


  if (error) return <ErrorComponent message={"Error While Fetching"} />

  return <Container maxW={'container.xl'}>
    {
      loading ? <Loader /> : (
        <>




          <Box width={'full'} borderWidth={1}>
            <Chart arr={chartArray} currency={currency_symbol} days={days} />
          </Box>


          <HStack p={4} overflowX={'auto'}>
            {
              btns.map((i) => (
                <Button
                  key={i}
                  onClick={() => switchChartStats(i)}
                >
                  {i}
                </Button>
              ))
            }
          </HStack>


          <RadioGroup value={currency} onChange={setCurrency}>
            <HStack justifyContent={'center'} p={'8'}>
              <Radio value='inr'>INR</Radio>
              <Radio value='eur'>EUR</Radio>
              <Radio value='usd'>USD</Radio>
            </HStack>
          </RadioGroup>


          <VStack spacing={'4'} p={'16'} alignItems={'flex-start'}>
            <Text alignSelf={'center'} fontSize={'small'} opacity={'0.7'}>
              Last Updated on {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>
            <Image src={coin.image.large} w={'16'} h={'16'} objectFit={'contain'} />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>{currency_symbol}{coin.market_data.current_price[currency]}</StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>



            </Stat>

            <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'white'}>
              #{coin.market_cap_rank}
            </Badge>

            <CustomBar high={`${currency_symbol}${coin.market_data.high_24h[currency]}`} low={`${currency_symbol}${coin.market_data.low_24h[currency]}`} />

            <Box w={'full'} p={'4'}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} />
              <Item title={"Market Cap"} value={`${currency_symbol}${coin.market_data.market_cap[currency]}`} />
              <Item title={"All Time Low Cap"} value={`${currency_symbol}${coin.market_data.atl[currency]}`} />
              <Item title={"All Time High Cap"} value={`${currency_symbol}${coin.market_data.ath[currency]}`} />
            </Box>

          </VStack>
        </>
      )
    }

  </Container>

}

const CustomBar = ({ high, low }) => (
  <VStack w={'full'}>
    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>

      <Badge children={low} colorScheme={'red'} />
      <Text textAlign={'center'}>24H Range</Text>
      <Badge children={high} colorScheme={'green'} />

    </HStack>

  </VStack>
)


const Item = ({ title, value }) => (
  <HStack justifyContent={'space-between'}>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
    <Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{value}</Text>
  </HStack>
)
export default CoinDetails