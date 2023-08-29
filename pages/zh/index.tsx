import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SearchMain from '@/components/SearchMain';
import { AdvisorType, EipWayIntro, PartnerType } from '@/types/eips';
import { useState } from 'react';
import { Link, Box, Button, useMediaQuery } from '@mui/material';
import EmailSubscribe from '@/components/EmailSubscribe';
import EastIcon from '@mui/icons-material/East';
import { Telegram } from '@/common/config';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
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
    <>
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
            连接 EIP 贡献者，扩展以太坊
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
          <Typography variant="h2" textAlign="center">
            什么是 EIP ?
          </Typography>
          <Typography
            variant="body2"
            maxWidth="800px"
            textAlign="center"
            margin="16px auto 0 auto"
            width="90%"
          >
            EIP 是 ”Ethereum Improvement Proposal”
            的缩写，译成中⽂为“以太坊改进提案”。它们
            是以太坊平台的标准，包括核⼼协议规范、客户端应⽤程序接⼝（API）以及智能合约标准。
          </Typography>
        </Box>
        <Box
          padding="64px 0"
          sx={{
            padding: padWidth ? '64px 0' : '32px 0',
          }}
        >
          <Typography variant="h2" textAlign="center">
            EIP 如何运作？
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
              进一步阅读{' '}
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
            支持社区
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
            顾问伙伴
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
            <Typography variant="h3">愿景</Typography>
            <Typography variant="body2">
              {`EIPs Fun 希望成为 EIP ⽣态系统的“Layer2”，使 EIP 更易接近，促进它的采 ⽤，连接以太坊的建设者与爱好者们。`}
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
              加入我们
            </Button>
            <Button
              variant="contained"
              href="https://app.safe.global/home?safe=eth:0x36C4f0d9FD9ED768491EC2c492634218BC3e5A72"
              sx={{ marginLeft: '15px' }}
              size="medium"
              target="_blank"
            >
              捐赠
            </Button>
          </Box>
        </EipsContentBlock>
      </Box>
    </>
  );
}
const introList = [
  {
    title: '写作与提交',
    image: '/images/intro_1.jpg',
    intro: '克隆 EIP Fun 的 Github 仓库，写下你的想法，提交 PR',
    action: '现在提交',
    index: 1,
    actionLink: 'https://github.com/ethereum/EIPs',
  },
  {
    title: '评议与反馈',
    image: '/images/intro_2.jpg',
    intro: '评议结束后，EIP编辑会分配编码并合并 PR 至 EIP 主仓库中',
    action: '',
    index: 2,
  },
  {
    title: '社区评议',
    image: '/images/intro_3.jpg',
    intro: '以太坊社区评议并给与反馈',
    action: '',
    index: 3,
  },
  {
    title: '终审',
    image: '/images/intro_4.jpg',
    intro: ' EIP 编辑将分配”终审“状态并设置终审截止日期，通常是 14 天',
    action: '',
    index: 4,
  },
  {
    title: '终稿',
    image: '/images/intro_5.jpg',
    intro: '到了截止日期，EIP 进入”终稿“状态',
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
    intro: 'EIP6105 与 EIP6147的作者',
    desc: 'EIP6105 与 EIP6147的作者',
    twitter: 'https://twitter.com/web3saltman',
    github: 'https://github.com/5660-eth',
  },
  {
    name: 'Victor Zhou',
    head: '/images/victorzhou.jpg',
    intro: '周载南（Victor Zhou）ERC1202 与 ERC5750 的作者; AllERCdevs 发起者',
    desc: '周载南（Victor Zhou）ERC1202 与 ERC5750 的作者; AllERCdevs 发起者',
    twitter: 'https://twitter.com/ZainanZhou',
    github: 'https://github.com/xinbenlv',
  },
];
