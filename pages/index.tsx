import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SearchMain from '../components/SearchMain';
import { AdvisorType, EipWayIntro, PartnerType } from '../types/eips';
import { useState } from 'react';
import { Link, Box, Button, useMediaQuery } from '@mui/material';
import EmailSubscribe from '../components/EmailSubscribe';
import EastIcon from '@mui/icons-material/East';
import { Telegram } from '@/common/config';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { hotEips, newEips } from '@/common/HotEipConfig';
export const EipsContentBlock = styled('div')(({ theme }) => ({
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
  flexWrap: 'wrap',

  '.contentleft': {
    maxWidth: '568px',
    flex: 1,
  },
  '.contentRight': {
    maxWidth: '440px',
    flex: 1,
    textAlign: 'right',
  },
  [theme.breakpoints.down('md')]: {
    padding: '32px',
    flexDirection: 'column',
    '.contentleft': {
      width: '100%',
      flex: 1,
      maxWidth: '100%',
    },
    '.contentRight': {
      width: '100%',
      flex: 1,
      maxWidth: '100%',
      paddingTop: '20px',
    },
  },
}));

export default function Home() {
  const [eipsWay] = useState<EipWayIntro[]>(introList);
  const [partners] = useState<PartnerType[]>(partnerList);
  const [advisors] = useState<AdvisorType[]>(advisorList);
  const padWidth = useMediaQuery('(min-width:900px)');
  // const mobileWidth = useMediaQuery('(min-width:400px)');

  return (
    <Box sx={{ maxWidth: '100%', padding: '0!important' }}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        textAlign="center"
        margin="0 auto"
        height="620px"
        width={'100%'}
        sx={{
          backgroundImage: 'url(/images/banner.png)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Typography variant="h1" textAlign="center" color="#fff">
          Serve EIP builders, scale Ethereum.
        </Typography>
        <Box maxWidth="lg" margin="0 auto" width="100%">
          <SearchMain />
        </Box>
      </Box>
      <Box
        padding="64px 0"
        sx={{
          padding: padWidth ? '64px 0' : '32px 0',
        }}
      >
        <Typography variant="h2" textAlign="center" marginBottom="64px">
          Popular EIPs
        </Typography>
        <Box
          width="90%"
          maxWidth="lg"
          margin="0 auto"
          display="flex"
          justifyContent="space-between"
          flexWrap={{ xs: 'wrap', md: 'nowrap' }}
          gap="32px"
        >
          <Box
            width="100%"
            padding="32px"
            borderRadius="5px"
            border="1px solid #EAEBF0"
            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.04)"
          >
            <Typography
              color="#5F6D7E"
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              letterSpacing="-0.1px"
              paddingBottom="24px"
              borderBottom="1px solid #EAEBF0"
            >
              Popular EIPs/ ERCs
            </Typography>
            {hotEips.map((i) => (
              <Link key={i.key} href={`/eips/eip-${i.key}`} underline="none">
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  marginTop="24px"
                  position="relative"
                  paddingLeft="20px"
                  sx={{
                    '&::before': {
                      content: '" "',
                      position: 'absolute',
                      top: '50%',
                      left: '0',
                      transform: 'translate(0%, -50%)',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#437EF7',
                      borderRadius: '50%',
                    },
                    '& :hover': {
                      fontWeight: '700 !important',
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    width={{ xs: '40%', sm: '20%' }}
                    flexShrink="0"
                    color="#437EF7"
                  >
                    {i.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    width={{ xs: '80%', sm: '60%', lg: '80%' }}
                  >
                    {i.description}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
          <Box
            width="100%"
            padding="32px"
            borderRadius="5px"
            border="1px solid #EAEBF0"
            boxShadow="0px 1px 2px 0px rgba(16, 24, 40, 0.04)"
          >
            <Typography
              color="#5F6D7E"
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              letterSpacing="-0.1px"
              paddingBottom="24px"
              borderBottom="1px solid #EAEBF0"
              marginBottom="24px"
            >
              Latest EIPs/ERCs
            </Typography>
            {newEips.map((i) => (
              <Link key={i.key} href={`/eips/eip-${i.key}`} underline="none">
                <Box
                  display="flex"
                  justifyContent="flex-start"
                  marginTop="24px"
                  position="relative"
                  paddingLeft="20px"
                  sx={{
                    '&::before': {
                      content: '" "',
                      position: 'absolute',
                      top: '50%',
                      left: '0',
                      transform: 'translate(0%, -50%)',
                      width: '8px',
                      height: '8px',
                      backgroundColor: '#437EF7',
                      borderRadius: '50%',
                    },
                    '& :hover': {
                      fontWeight: '700 !important',
                    },
                  }}
                >
                  <Typography
                    variant="body1"
                    width={{ xs: '40%', sm: '20%' }}
                    flexShrink="0"
                    color="#437EF7"
                  >
                    {i.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    width={{ xs: '80%', sm: '60%', lg: '80%' }}
                  >
                    {i.description}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        padding="64px 0"
        sx={{
          padding: padWidth ? '64px 0' : '32px 0',
        }}
      >
        <Typography variant="h2" textAlign="center">
          What is EIPs?
        </Typography>
        <Typography
          variant="body2"
          maxWidth="800px"
          textAlign="center"
          margin="16px auto 0 auto"
          width="90%"
        >
          It is short for Ethereum Improvement Proposals, they are standards for
          the Ethereum platform, including core protocol specifications, client
          APIs, and contract standards.
        </Typography>
      </Box>
      <Box
        padding="64px 0"
        sx={{
          padding: padWidth ? '64px 0' : '32px 0',
        }}
      >
        <Typography variant="h2" textAlign="center">
          How EIPs work?
        </Typography>
        <Typography
          variant="body2"
          maxWidth="800px"
          textAlign="center"
          margin="16px auto 0 auto"
          width="90%"
        >
          <Link
            fontWeight={700}
            underline="hover"
            fontSize={15}
            marginTop={10}
            href="https://eips.ethereum.org/EIPS/eip-1"
          >
            {' '}
            View more{' '}
            <EastIcon sx={{ fontSize: '14px', verticalAlign: 'middle' }} />
          </Link>
        </Typography>
        <Box
          maxWidth="lg"
          display="flex"
          flexWrap="wrap"
          alignItems="flex-start"
          justifyContent="space-around"
          margin="20px auto 20px auto"
        >
          {eipsWay.length > 0 &&
            eipsWay.map((item, index) => (
              <Box
                flex={0}
                minWidth="218px"
                textAlign="center"
                padding="20px 0"
                key={index}
              >
                <Box
                  display="inline-flex"
                  width={48}
                  height={48}
                  alignItems="center"
                  justifyContent="center"
                  bgcolor="#F5FAFF"
                  borderRadius="5px"
                  color="#437EF7"
                  fontSize="24px"
                >
                  {item.index}
                </Box>
                <Typography variant={'h4'}>{item.title}</Typography>
                <Typography variant="body2" padding="0" width="100%">
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
                    {item.action}{' '}
                    <EastIcon
                      sx={{ fontSize: '14px', verticalAlign: 'middle' }}
                    />
                  </Link>
                )}
              </Box>
            ))}
          {/* 此处是自适应宽度flex warp后的最后一个元素左对齐方案 */}
          {eipsWay.length > 0 &&
            eipsWay.map((item, index) => (
              <Box width="218px" key={index + Math.random()}></Box>
            ))}
        </Box>
      </Box>
      <Box
        padding="64px 0"
        sx={{
          padding: padWidth ? '64px 0' : '32px 0',
        }}
      >
        <Typography variant="h2" textAlign="center">
          Supporters & Partners
        </Typography>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          margin="60px auto 20px auto"
        >
          {partners.length > 0 &&
            partnerList.map((item) => (
              <Box
                key={item.name}
                width="292px"
                height="144px"
                bgcolor="#F8F9FB"
                display="flex"
                alignItems="center"
                justifyContent="center"
                margin="0 8px"
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
        </Box>
      </Box>
      <Box
        padding="64px 0"
        sx={{
          padding: padWidth ? '64px 0' : '32px 0',
        }}
      >
        <Typography variant="h2" textAlign="center">
          Advisors
        </Typography>
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="center"
          margin="60px auto 20px auto"
        >
          {advisors.length > 0 &&
            advisors.map((item) => (
              <Box key={item.name} width="218px" textAlign="center">
                <Image
                  src={item.head}
                  alt={item.name}
                  width={162}
                  height={162}
                  style={{ borderRadius: '10px' }}
                />

                <Typography variant="h6" textAlign="center">
                  {item.name}
                </Typography>
                <Typography variant="body1" textAlign="center">
                  {item.intro}
                </Typography>
                <Typography variant="body2" textAlign="center">
                  <Link href={item.twitter} color="#000" target="_blank">
                    <TwitterIcon sx={{ fontSize: '20px', margin: '0 4px' }} />
                  </Link>
                  <Link href={item.github} color="#000" target="_blank">
                    <GitHubIcon sx={{ fontSize: '20px', margin: '0 4px' }} />
                  </Link>
                </Typography>
              </Box>
            ))}
        </Box>
      </Box>
      <EipsContentBlock>
        <EmailSubscribe />
      </EipsContentBlock>
      <EipsContentBlock>
        <Box className="contentleft">
          <Typography variant="h3">Our vision</Typography>
          <Typography variant="body2">
            EIPs.Fun aims to serve as the &quot;layer 2&quot; of the EIP
            ecosystem, simplifying and accelerating the adoption of EIPs, and
            seeking to catalyze the synergy of the EIP ecosystem.
          </Typography>
        </Box>
        <Box className="contentRight">
          <Button
            variant="outlined"
            sx={{
              color: '#272D37',
            }}
            href={Telegram}
            target="_blank"
            size="medium"
          >
            Join Us
          </Button>
          {/* <Button
              variant="contained"
              href="https://app.safe.global/home?safe=eth:0x36C4f0d9FD9ED768491EC2c492634218BC3e5A72"
              sx={{ marginLeft: '15px' }}
              size="medium"
              target="_blank"
            >
              Donate
            </Button> */}
        </Box>
      </EipsContentBlock>

      <div data-donate3-cid="bafkreigezyaaz2hebncag2bccsfjif4leivmp57ddhvlfm3piov6utxuuy" />
    </Box>
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
    title: 'Review & Feedback',
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
  { name: 'LXDAO', logo: '/images/lxdao.svg', link: 'https://lxdao.io' },
  {
    name: 'Plancker',
    logo: '/images/plancker.svg',
    link: 'https://plancker.org/',
  },
];
const advisorList = [
  {
    name: '5660.eth',
    head: '/images/5660.jpg',
    intro: 'Author of EIP6105, EIP6147',
    desc: 'Author of EIP6105, EIP6147',
    twitter: 'https://twitter.com/web3saltman',
    github: 'https://github.com/5660-eth',
  },
  {
    name: 'Victor Zhou',
    head: '/images/victorzhou.jpg',
    intro: 'Author of ERC1202, ERC5750; Initiator of AllERCdevs',
    desc: 'Author of ERC1202, ERC5750; Initiator of AllERCdevs',
    twitter: 'https://twitter.com/ZainanZhou',
    github: 'https://github.com/xinbenlv',
  },
];
