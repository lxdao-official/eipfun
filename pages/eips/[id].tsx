import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Container, Box, Link, Button, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import EmailSubscribe from '@/components/EmailSubscribe';
import { formatMeta, formatComEIP, EIPHeader } from '@/utils/str';
import { readFile, readdir } from 'node:fs/promises';
import ReactMarkdown from 'react-markdown';
import path from 'path';
import tocbot from 'tocbot';
import details from '@/styles/details.module.css';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Affix from '@/components/Affix';
import Status from '@/components/details/Status';
import Time from '@/components/details/Time';
import Video from '@/components/details/Video';
import Author from '@/components/details/Author';
import Requires from '@/components/details/Requires';
import OriginalLink from '@/components/details/OriginalLink';
import ChatGpt from '@/components/details/ChatGpt';
import ExtendedResources from '@/components/details/ExtendedResources';
import Projects from '@/components/details/Projects';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { flatten } from '@/utils/index';
import { EipsContentBlock } from '../index';
import useGetLang from '@/hooks/useGetLang';
import Relationship from '@/components/details/Relationship';

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

interface AIProps {
  href?: string;
  children?: React.ReactNode;
}

const ARenderer: React.FC<AIProps> = ({ href, children }) => {
  if (href?.startsWith('./') && href.endsWith('.md')) {
    return React.createElement(
      'a',
      { href: href.replace('.md', '') },
      children
    );
  }

  if (href === '../LICENSE.md') {
    return React.createElement(
      'a',
      { href: 'https://eips.ethereum.org/LICENSE', target: '_blank' },
      children
    );
  }

  return React.createElement('a', { href: href }, children);
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

  interface LangObj {
    en: string;
    zh: string;
  }
  const T = ({ en, zh }: LangObj) => {
    const lang = useGetLang();
    if (lang === 'en') {
      return en;
    } else if (lang === 'zh') {
      return zh;
    }
    return en;
  };

  const handleShow = () => {
    setShow((state) => !state);
    window.scrollTo({
      top: (document.querySelector('#original-tit') as any).offsetTop,
      behavior: 'smooth',
    });
  };

  const TITLE = `EIP-${meta.eip}: ${meta.title} | EIP Fun - Serve Ethereum Builders, Scale the Community`;
  const DESCRIPTION =
    (meta.abstract ? meta.abstract : '') +
    (meta.description ? meta.description : '') +
    (meta.summary ? meta.summary : '');
  const ERCorEIP = meta?.category === 'ERC' ? 'ERC' : 'EIP';
  const updateFileUrl = `https://github.com/lxdao-official/eipfun/blob/main/content/en/eip-${meta.eip}.md?plain=1`;

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta
          property="twitter:url"
          content={`https://eip.fun/eips/eip-${meta.eip}`}
        />
        <meta name="keywords" content={TITLE} />
        <meta name="description" content={DESCRIPTION} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@eipfun" />
        <meta name="twitter:creator" content="@LXDAO" />
        <meta
          name="twitter:image"
          content="https://eip.fun/images/logo_summary.jpg"
        />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EIP.Fun - Website" />
        <meta
          property="og:url"
          content={`https://eip.fun/eips/eip-${meta.eip}`}
        />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta
          property="og:image"
          content="https://eip.fun/images/logo_summary.jpg"
        />
      </Head>

      <Box borderTop={1} borderColor="#EAEBF0" />
      <Container maxWidth="lg" sx={{ overflow: 'hidden', px: [3, 3, 2, 2] }}>
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
          height={[66, 66, 180, 180]}
          borderRadius={1}
        >
          <Box
            sx={(theme) => ({
              position: 'absolute',
              fontSize: '60px',
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
          variant="h1"
          fontSize={[24, 24, 40, 40]}
          lineHeight={['38px', '38px', '48px', '48px']}
          fontWeight="bold"
          mt={[1, 1, 3, 3]}
          textAlign="left"
        >
          {meta.title}
        </Typography>

        {(meta.abstract || meta.description) && (
          <Typography
            mt={[1, 1, 2, 2]}
            component={Box}
            variant="body1"
            color="#5F6D7E"
          >
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
          T={T}
        />

        <Requires data={meta.requires} T={T} />

        <Author authors={meta.author} />

        <OriginalLink
          eip={meta.eip}
          discussions={meta['discussions-to']}
          list={meta?.list}
          T={T}
          url={updateFileUrl}
        />

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
          <Box sx={{ float: 'left' }} width={[1, 1, 0.72, 828]}>
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

            <ChatGpt summary={meta.summary} url={updateFileUrl} />

            <Typography
              pt={6}
              pb={3}
              variant="h6"
              fontSize="22px"
              lineHeight="30px"
              fontWeight="bold"
            >
              Video{meta.videos?.length ? 's' : ''}
            </Typography>
            <Video list={meta.videos || []} url={updateFileUrl} T={T} />

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
              sx={{ boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.06)' }}
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
                    a: (props) => ARenderer(props),
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
              <Box sx={{ textAlign: 'center' }} pt={show ? 5 : 0}>
                <Button
                  variant="contained"
                  onClick={handleShow}
                  sx={{ padding: '0 24px', borderRadius: '6px' }}
                >
                  {show ? 'Show less' : 'View more'}
                </Button>
              </Box>
            </Box>

            <Relationship data={meta['related eips']} T={T} />

            <Typography
              component={Box}
              variant="h6"
              fontSize="22px"
              lineHeight="30px"
              fontWeight="bold"
            >
              Further reading
            </Typography>

            <ExtendedResources
              data={meta['further reading']}
              url={updateFileUrl}
              T={T}
            />
          </Box>

          <Box
            sx={{ float: 'right' }}
            width={[1, 1, 0.26, 308]}
            mt={[4, 4, 0, 0]}
          >
            <Box
              p={3}
              mb={3}
              border={1}
              borderColor="#fff"
              borderRadius={'10px'}
              boxShadow="0px 4px 16px rgba(16, 24, 40, 0.06)"
            >
              <Typography
                fontWeight="bold"
                variant="h6"
                lineHeight="28px"
                fontSize="18px"
              >
                Adopted by projects
              </Typography>

              <Projects data={meta.projects} url={updateFileUrl} T={T} />
            </Box>

            {show && (
              <Box>
                <Affix
                  parent={detailsWrapperElement}
                  top={20}
                  className={details.tocWrap}
                >
                  <Box p={3}>
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

        <EipsContentBlock sx={{ maxWidth: '1168px' }}>
          <EmailSubscribe />
        </EipsContentBlock>
      </Container>
    </>
  );
}

export const getStaticPaths = async () => {
  let markdownFiles: string[] | undefined, paths;
  try {
    markdownFiles = await readdir(
      path.join(process.cwd(), 'public', 'original-eips')
    );
  } catch (e) {
    console.log(e);
  }

  if (markdownFiles && markdownFiles.length) {
    paths = markdownFiles.map((item) => {
      return {
        params: {
          id: item.replace('.md', ''),
        },
      };
    });
  }
  return {
    paths,
    fallback: false, // false or "blocking"
  };
};

type IContent = {
  params: {
    id: string;
  };
};
export const getStaticProps = async ({ params: { id } }: IContent) => {
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

  const [, metaStr, ...con] = originalEIP.split('---\n');
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
      mdStrData: con.join('---\n'),
    },
  };
};
