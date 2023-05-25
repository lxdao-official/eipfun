import Image from 'next/image';

import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import SearchMain from '../../components/SearchMain';
import { EipWayIntro, PartnerType } from '../../types/eips';
import { useState } from 'react';
import { Link, Box, Button, Container } from '@mui/material';
import EmailSubscribe from '../../components/EmailSubscribe';
import EastIcon from '@mui/icons-material/East';
import { Telegram } from '@/common/config';

export default function Home() {
  const [eipsWay] = useState<EipWayIntro[]>(introList);
  const [partners] = useState<PartnerType[]>(partnerList);
  const EipsBanner = styled('div')(() => ({
    // width: 1440,
    maxWidth: 1440,
    height: 620,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundImage: 'url(/images/banner.png)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    margin: '0px auto',
    textAlign: 'center',
    color: '#fff',
    // paddingTop: 120,
    position: 'relative',
  }));

  // const EipsContent = styled('div')(() => ({
  //   // width: 1440,
  //   margin: '64px auto ',
  //   textAlign: 'center',
  // }));
  const EipsCardList = styled('div')(() => ({
    // width: 1280,
    maxWidth: 1280,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    margin: '20px auto 20px auto',
  }));
  const EipsPartnerList = styled('div')(() => ({
    // width: 1280,
    maxWidth: 1280,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: '60px auto 20px auto',
    i: {
      width: 218,
    },
  }));

  const EipsContentBlock = styled('div')(() => ({
    // width: 1152,
    maxWidth: 1152,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: '#F8F9FB',
    borderRadius: 10,
    padding: '40px 64px',
    margin: '40px auto',
    fontWeight: 400,
    h3: {
      fontSize: 32,
      lineHeight: '42px',
      color: '#272D37',
      fontWeight: 600,
    },
    p: {
      fontSize: 16,
      lineHeight: '20px',
      color: '#5F6D7E',
      // margin:'10px 0',
      fontWeight: 400,
      padding: 0,
    },
    '.contentleft': {
      maxWidth: 568,
      flex: 1,
    },
    '.contentRight': {
      maxWidth: 440,
      flex: 1,
      textAlign: 'right',
    },
  }));

  return (
    <>
      <Container
        maxWidth={false}
        sx={{ maxWidth: '1440px', padding: 0 }}
        fixed={true}
      >
        <EipsBanner>
          <Typography variant="h1" textAlign="center" color="#fff">
            Serve EIP builders, scale Ethereum.
          </Typography>
          {/* <Typography
            variant="h3"
            textAlign="center"
            color="#5F6D7E"
            fontSize="18px"
            lineHeight="22px"
            marginTop="40px"
          >
            EIPs.fun is run by the contributors, for the contributor, and owned
            by the contributors.
          </Typography> */}
          <SearchMain />
        </EipsBanner>
        <Box>
          <Typography variant="h2" textAlign={'center'} marginTop={'64px'}>
            What is EIPs?{' '}
          </Typography>
          <Typography variant="body2" width={'100%'} textAlign={'center'}>
            It is short for Ethereum Improvement Proposals, they are standards
            for the Ethereum platform, including <br /> core protocol
            specifications, client APIs, and contract standards.
          </Typography>
        </Box>
        <Box>
          <Typography variant="h2">How EIPs work?</Typography>
          <EipsCardList>
            {eipsWay.length > 0 &&
              eipsWay.map((item, index) => (
                <Box
                  flex={0}
                  maxWidth={218}
                  minWidth={218}
                  width={218}
                  textAlign={'center'}
                  padding={'20px 0'}
                  key={index}
                >
                  <Box
                    display={'inline-flex'}
                    width={48}
                    height={48}
                    alignItems={'center'}
                    justifyContent={'center'}
                    bgcolor={'#F5FAFF'}
                    borderRadius={'5px'}
                    color={'#437EF7'}
                    fontSize={24}
                  >
                    {item.index}
                  </Box>
                  <Typography
                    variant={'h4'}
                    padding={'16px 0 0 0'}
                    color={'#272D37'}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant={'body2'}
                    padding={'5px 0'}
                    width={'100%'}
                  >
                    {item.intro}
                  </Typography>

                  {item.action && item.actionLink && (
                    <Link
                      fontWeight={700}
                      underline="hover"
                      fontSize={15}
                      marginTop={10}
                      href={item.actionLink}
                    >
                      {' '}
                      {item.action} <EastIcon sx={{ fontSize: '14px' }} />
                    </Link>
                  )}
                </Box>
              ))}
            {/* 此处是自适应宽度flex warp后的最后一个元素左对齐方案 */}
            {eipsWay.length > 0 &&
              eipsWay.map((item, index) => <i key={index + Math.random()}></i>)}
          </EipsCardList>
        </Box>
        <Box>
          <Typography variant="h2">Supporters & Partners</Typography>
          <EipsPartnerList>
            {partners.length > 0 &&
              partnerList.map((item) => (
                <Box
                  key={item.name}
                  width={'200px'}
                  height={'100px'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Link href={item.link}>
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={144}
                      height={40}
                    />
                  </Link>
                </Box>
              ))}
          </EipsPartnerList>
        </Box>
        <EipsContentBlock>
          <EmailSubscribe />
        </EipsContentBlock>
        <EipsContentBlock>
          <Box className="contentleft">
            <Typography variant="h3">How EIPs Fun works?</Typography>
            <Typography variant="body1">
              This is an open source and public goods.Running by a EIPs Fun DAO.
              xxx Donation means a lot for us, please donate.
            </Typography>
          </Box>
          <Box className="contentRight">
            <Button variant="outlined" href={Telegram} size="medium">
              Join Us
            </Button>
            <Button
              variant="contained"
              href="https://app.safe.global/home?safe=eth:0x36C4f0d9FD9ED768491EC2c492634218BC3e5A72"
              sx={{ marginLeft: 5 }}
              size="medium"
            >
              Donate
            </Button>
          </Box>
        </EipsContentBlock>
      </Container>
    </>
  );
}
const introList = [
  {
    title: 'Write & Submit',
    image: '/images/intro_1.jpg',
    intro: 'Clone the repository, write your idea, commit and push a PR',
    action: 'Propose now',
    index: 1,
    actionLink: 'https://github.com/ethereum/EIPs',
  },
  {
    title: 'Review & feedback',
    image: '/images/intro_2.jpg',
    intro:
      'Once review is done, any editor assigns an EIP number and merges the PR',
    action: '',
    index: 2,
  },
  {
    title: 'Peer Review',
    image: '/images/intro_3.jpg',
    intro: 'The community review and give you feedback',
    action: '',
    index: 3,
  },
  {
    title: 'Last Call',
    image: '/images/intro_4.jpg',
    intro: 'Any editor sets this status with a deadline',
    action: '',
    index: 4,
  },
  {
    title: 'Final',
    image: '/images/intro_5.jpg',
    intro: 'Deadline reached, status auto changes to “Final”',
    action: '',
    index: 5,
  },
];
const partnerList = [
  { name: 'LXDao', logo: '/images/lxdao.svg', link: 'https://lxdao.io' },
  {
    name: 'Plancker',
    logo: '/images/plancker.svg',
    link: 'https://plancker.org/',
  },
];
