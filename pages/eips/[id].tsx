import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Box, Link, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailSubscribe from '@/components/EmailSubscribe';
import { formatMeta, formatComEIP, EIPHeader } from '@/utils/str';
import { readFile } from 'node:fs/promises';
import ReactMarkdown from 'react-markdown';
import path from 'path';
import tocbot from 'tocbot';
import details from '@/styles/details.module.css';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Affix from '@/components/Affix';
import Status from '@/components/details/Status';
import Time from '@/components/details/Time';
import Author from '@/components/details/Author';
import Requires from '@/components/details/Requires';
import OriginalLink from '@/components/details/OriginalLink';
import ChatGpt from '@/components/details/ChatGpt';
import ExtendedResources from '@/components/details/ExtendedResources';
import Projects from '@/components/details/Projects';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { flatten } from '@/utils/index';
import { EipsContentBlock } from '../index';

type HIProps = {
  level: number;
  children?: React.ReactNode;
};

export const HeadingRenderer: React.FC<HIProps> = ({ level, children }) => {
  let reactChildren = React.Children.toArray(children);
  let text = reactChildren.reduce(flatten, '');
  let slug = text.toLowerCase().replace(/[!?\s]/g, '-');

  return React.createElement(
    'h' + level,
    { id: slug, className: 'eip-toc' },
    children
  );
};

type EIProps = {
  meta: {
    'extended resources'?: {
      title: string;
      imgSrc: string;
      alt: string;
      link: string;
    }[];
    projects?: { link: string; title: string; imgSrc: string; alt: string }[];
    [propName: string]: any;
  };
  mdStrData: string;
};

export default function EIPDetails({ meta, mdStrData }: EIProps) {
  const [show, setShow] = useState(false);
  const detailsWrapperElement = React.createRef<HTMLDivElement>();

  useEffect(() => {
    if (show) {
      tocbot.init({
        tocSelector: '.js-toc', // Where to render the table of contents.
        contentSelector: '.js-toc-content', // Where to grab the headings to build the table of contents.
        headingSelector: 'h1, h2, h3, h4', // Which headings to grab inside of the contentSelector element.
        hasInnerContainers: true,
      });
    } else {
      tocbot.destroy();
    }
  }, [show]);

  const handleShow = () => {
    setShow((state) => !state);
    window.scrollTo({
      top: (document.querySelector('#original-tit') as any).offsetTop,
      behavior: 'smooth',
    });
  };

  const TITLE = `EIP-${meta.eip}: ${meta.title} | EIPs Fun - Serve EIP builders, scale Ethereum`;
  const DESCRIPTION =
    (meta.abstract ? meta.abstract : '') +
    (meta.description ? meta.description : '') +
    (meta.summary ? meta.summary : '') +
    (meta.chatgpt4 ? meta.chatgpt4.replaceAll('<br />', '') : '');
  const ERCorEIP = meta?.category === 'ERC' ? 'ERC' : 'EIP';

  // todo add images for sharing

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta
          property="twitter:url"
          content={`https://eips.fun/eips/eip-${meta.eip}`}
        />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@eipsfun" />
        <meta name="twitter:creator" content="@LXDAO" />
        <meta
          name="twitter:image"
          content="http://gg.chendahai.cn/static/image/apple.jpg"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EIPs.Fun - Website" />
        <meta
          property="og:url"
          content={`https://eips.fun/eips/eip-${meta.eip}`}
        />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta
          property="og:image"
          content="http://graphics8.nytimes.com/images/2011/12/08/technology/bits-newtwitter/bits-newtwitter-tmagArticle.jpg"
        />
      </Head>

      <Box borderTop={1} borderColor="#EAEBF0" />
      <Container maxWidth="lg">
        <Box pt={4} pb={[2, 2, 3, 3]}>
          <Typography
            display="inline-block"
            component="span"
            variant="h5"
            lineHeight="24px"
          >
            <Link href="/eips" underline="hover" color="#272D37">
              EIPs
            </Link>
            <ArrowForwardIosIcon
              sx={{
                width: 15,
                height: 15,
                marginLeft: 0.5,
                marginRight: 0.5,
                verticalAlign: 'middle',
              }}
            />
          </Typography>
          <Link display="inline-block" underline="none" lineHeight="24px">
            {ERCorEIP}-{meta.eip}
          </Link>
        </Box>

        <Box
          sx={{
            position: 'relative',
            background:
              "#272D37 url('/images/eip_details_bg.png') no-repeat top left/contain",
          }}
          height={[66, 66, 260, 260]}
          borderRadius={1}
        >
          <Box
            sx={(theme) => ({
              position: 'absolute',
              fontSize: '80px',
              color: '#fff',
              [theme.breakpoints.down('md')]: { fontSize: '20px' },
            })}
            right={[12, 12, 50, 50]}
            bottom={10}
          >
            {ERCorEIP}-{meta.eip}
          </Box>
        </Box>

        <Typography
          variant="h2"
          fontSize={[24, 24, 40, 40]}
          lineHeight={['38px', '38px', '48px', '48px']}
          fontWeight="bold"
          mt={[2, 2, 3, 3]}
        >
          {meta.title}
        </Typography>

        {(meta.abstract || meta.description) && (
          <Typography pt={2} component={Box} variant="body1" color="#5F6D7E">
            {meta.abstract || meta.description}
          </Typography>
        )}

        <Status
          status={meta.status}
          type={meta.type}
          category={meta.category}
        />

        <Time
          created={meta.created}
          lastCallDeadline={meta['last-call-deadline']}
        />

        <Requires data={meta.requires} />

        <Author authors={meta.author} />

        <OriginalLink eip={meta.eip} discussions={meta['discussions-to']} />

        <Box
          sx={{
            '&::after': {
              content: '""',
              display: 'table',
              clear: 'both',
            },
          }}
          mt={3}
        >
          <Box sx={{ float: 'left' }} width={[1, 1, 0.72, 830]}>
            <Box pb={3}>
              <Typography
                fontSize={22}
                component="span"
                variant="h6"
                lineHeight="30px"
              >
                1 min read
              </Typography>
            </Box>

            <ChatGpt chatgpt4={meta.chatgpt4} summary={meta.summary} />

            <Typography
              id="original-tit"
              pt={6}
              pb={3}
              variant="h6"
              fontSize="22px"
              lineHeight="30px"
              fontWeight="bold"
            >
              Original
            </Typography>

            <Box
              position="relative"
              px={4}
              pt={3}
              pb={5}
              border={1}
              borderColor="#f5f5f5"
              borderRadius={1.5}
              mb={6}
              sx={{ boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.06)' }}
              ref={detailsWrapperElement}
            >
              <Box
                sx={{
                  height: show ? 'auto' : '526px',
                  overflow: 'hidden',
                  '& hr': { display: 'none' },
                }}
                position="relative"
                className={details['markdown-body'] + ' js-toc-content'}
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    code: ({ inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            background: 'transparent',
                          }}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...props} className={className}>
                          {children}
                        </code>
                      );
                    },
                    h1: (props) => HeadingRenderer({ ...props, level: 1 }),
                    h2: (props) => HeadingRenderer({ ...props, level: 2 }),
                    h3: (props) => HeadingRenderer({ ...props, level: 3 }),
                    h4: (props) => HeadingRenderer({ ...props, level: 4 }),
                  }}
                >
                  {mdStrData}
                </ReactMarkdown>
                {!show && (
                  <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    width={1}
                    height={160}
                    sx={{
                      background:
                        'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 1))',
                    }}
                  />
                )}
              </Box>
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  onClick={handleShow}
                  sx={{ padding: '0 24px', borderRadius: '6px' }}
                >
                  {show ? 'Show less' : 'View more'}
                </Button>
              </Box>
            </Box>

            <Box>
              <Typography variant="h5" component="span">
                Quick read
              </Typography>
              <Typography color="#5F6D7E" variant="body2" component="span">
                {' '}
                by Analyst
              </Typography>
            </Box>

            <ExtendedResources data={meta['extended resources']} />
          </Box>

          <Box
            sx={{ float: 'right' }}
            width={[1, 1, 0.26, 302]}
            mt={[4, 4, 0, 0]}
          >
            <Box
              p={3}
              mb={3}
              border={1}
              borderColor="#fff"
              borderRadius={'10px'}
              boxShadow="0px 4px 40px rgba(16, 24, 40, 0.06)"
            >
              <Typography
                fontWeight="bold"
                variant="h6"
                lineHeight="28px"
                fontSize="18px"
              >
                Adopted by projects
              </Typography>

              <Projects data={meta.projects} />
            </Box>

            {show && (
              <Box>
                <Affix
                  parent={detailsWrapperElement}
                  top={20}
                  className={details.tocWrap}
                >
                  <Box p={3} border="1px solid #EAEBF0" borderRadius="10px">
                    <Typography fontWeight="bold" variant="h6">
                      Contents
                    </Typography>
                    <Box className="js-toc toc"></Box>
                  </Box>
                </Affix>
              </Box>
            )}
          </Box>
        </Box>

        <EipsContentBlock>
          <EmailSubscribe />
        </EipsContentBlock>
      </Container>
    </>
  );
}

type IContent = {
  params: {
    id: string;
  };
};

export async function getServerSideProps(context: IContent) {
  let id = context.params.id;
  let originalEIP;
  if (id.includes('.md')) {
    id = id.replace('.md', '');
  }
  if (id.includes('#')) {
    id = id.split('#')[0];
  }
  try {
    originalEIP = await readFile(
      path.join(process.cwd(), 'public', 'original-eips', `${id}.md`),
      'utf8'
    );
  } catch (e: any) {
    console.log(e);
    if (e.errno === -2) {
      return {
        redirect: {
          destination: '/404',
          permanent: false,
        },
      };
    }
  }

  if (!originalEIP) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }

  const [, metaStr, ...con] = originalEIP.split('---');
  const meta: EIPHeader = formatMeta(metaStr);

  try {
    let comEIP = await readFile(
      path.join(process.cwd(), 'content', 'en', `${id}.md`),
      'utf8'
    );
    Object.assign(meta, formatComEIP(comEIP));
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      meta,
      mdStrData: con.toString(),
    },
  };
}
