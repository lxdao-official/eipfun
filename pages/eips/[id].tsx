/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
// import dynamic from 'next/dynamic';
import { Container, Box, Link, Button, Typography } from '@mui/material';
import EmailSubscribe from '@/components/EmailSubscribe';
import { formatMeta, formatComEIP, EIPHeader } from '@/utils/str';
import { getHeader, createLink } from '@/utils/getHeader';
import { readFile } from 'node:fs/promises';
import ReactMarkdown from 'react-markdown';
import path from 'path';
import tocbot from 'tocbot';
import details from '@/styles/details.module.css';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import Affix from '@/components/Affix';
import _ from 'lodash';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

import { flatten } from '@/utils/index';

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
  id: string;
  mdStrData: string;
  sideMenu: string[];
};

export default function EIPDetails({ meta, mdStrData, sideMenu }: EIProps) {
  console.log('mdStrData: ', mdStrData);
  const [show, setShow] = useState(false);
  const [menuIndex, setMenuIndex] = useState(0);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const originalTop = (document.querySelector('#original') as HTMLElement)
  //       .offsetTop;
  //     const offsets: number[] = [];
  //     document.querySelectorAll('.eip-toc').forEach((item, i) => {
  //       if (i !== 0) {
  //         offsets.push((item as HTMLElement).offsetTop + originalTop);
  //       }
  //     });
  //     setOffsets(offsets);
  //   }, 200);
  // }, []);

  // useEffect(() => {
  //   function watchHeight() {
  //     const originalTop = (document.querySelector('#original') as HTMLElement)
  //       .offsetTop;
  //     if (originalTop <= window.pageYOffset) {
  //       setTocFixed(true);
  //     } else {
  //       setTocFixed(false);
  //     }
  //     if (window.pageYOffset <= offsets[0]) {
  //       return setMenuIndex(0);
  //     }
  //     if (window.pageYOffset >= offsets[offsets.length - 1]) {
  //       return setMenuIndex(offsets.length - 1);
  //     }
  //     setMenuIndex(
  //       offsets.findIndex(
  //         (item, i, arr) =>
  //           window.pageYOffset >= item && window.pageYOffset < arr[i + 1]
  //       )
  //     );
  //   }
  //   window.addEventListener('scroll', _.throttle(watchHeight, 400));
  //   return () => {
  //     window.removeEventListener('scroll', _.throttle(watchHeight, 400));
  //   };
  // }, [offsets]);

  useEffect(() => {
    tocbot.init({
      // Where to render the table of contents.
      tocSelector: '.js-toc',
      // Where to grab the headings to build the table of contents.
      contentSelector: '.js-toc-content',
      // Which headings to grab inside of the contentSelector element.
      headingSelector: 'h1, h2, h3, h4',
      hasInnerContainers: false,
    });

    setInterval(() => {
      tocbot.refresh();
    }, 20000);
  }, []);

  const handleShow = () => {
    setShow((state) => !state);
    if (show) {
      window.scrollTo({
        top: (document.querySelector('#original-tit') as any).offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const formatLink = (str: string) => {
    if (str.includes('<')) {
      let [name, linkText] = str.split('<');
      let link;
      linkText = linkText.replace('>', '');
      link = 'mailto:' + linkText;
      return (
        <>
          {name}
          {'<'}
          <Link underline="hover" href={link}>
            {linkText}
          </Link>
          {'>'}
        </>
      );
    } else if (str.includes('(')) {
      let [name, linkText] = str.split('(');
      let link;
      linkText = linkText.replace(')', '');
      link = 'https://github.com/' + linkText.replace('@', '');
      return (
        <>
          {name}(
          <Link underline="hover" target="_blank" href={link}>
            {linkText}
          </Link>
          )
        </>
      );
    } else {
      return str;
    }
  };
  const TITLE = `EIP-${meta.eip}: ${meta.title} | EIPs Fun - Serve EIP builders, scale Ethereum`;
  const DESCRIPTION =
    (meta.abstract ? meta.abstract : '') +
    (meta.description ? meta.description : '') +
    (meta.summary ? meta.summary : '');

  // todo add images for sharing

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="EIPs.Fun - Website" />
        <meta property="og:title" content={TITLE} key="title" />
        <meta
          property="og:description"
          content={DESCRIPTION}
          key="description"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@huntarosan" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown-light.min.css"
          integrity="sha512-bm684OXnsiNuQSyrxuuwo4PHqr3OzxPpXyhT66DA/fhl73e1JmBxRKGnO/nRwWvOZxJLRCmNH7FII+Yn1JNPmg=="
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/tocbot/4.18.2/tocbot.css"
        />
      </Head>

      <Box borderTop={1} borderColor="#EAEBF0" />
      <Container maxWidth="lg">
        <Box py={4}>
          <Typography
            display="inline-block"
            className={details.iconArrow}
            component="span"
            variant="h5"
            lineHeight="24px"
          >
            <Link href="/eips" underline="hover" color="#272D37">
              EIPs
            </Link>
          </Typography>
          <Link display="inline-block" underline="none" lineHeight="24px">
            EIP-{meta.eip}
          </Link>
        </Box>

        <Box
          sx={{
            position: 'relative',
            background:
              "#272D37 url('/images/eip_details_bg.png') no-repeat top left/contain",
          }}
          height={[120, 120, 260, 260]}
          borderRadius={1}
        >
          <Box
            sx={(theme) => ({
              position: 'absolute',
              fontSize: '80px',
              color: '#fff',
              [theme.breakpoints.down('md')]: { fontSize: '40px' },
            })}
            right={50}
            bottom={10}
          >
            EIP-{meta.eip}
          </Box>
        </Box>

        <Typography
          variant="h2"
          fontSize={40}
          lineHeight="48px"
          fontWeight="bold"
          mt={4}
        >
          {meta.title}
        </Typography>

        {(meta.abstract || meta.description) && (
          <Typography pt={2} component={Box} variant="body1" color="#5F6D7E">
            {meta.abstract || meta.description}
          </Typography>
        )}

        <Box pb={4} pt={2}>
          <Typography
            display="inline-block"
            component="span"
            variant="body2"
            color="#FF8A00"
            fontSize={14}
            borderRadius="5px"
            px={1}
            mr={2}
            style={{ background: '#FFF1E4' }}
          >
            {meta.status}
          </Typography>

          <Typography
            display="inline-block"
            component="span"
            variant="body2"
            color="#437EF7"
            fontSize={14}
            borderRadius="5px"
            px={1}
            mr={2}
            style={{ background: '#F5FAFF' }}
          >
            {meta.type}
            {meta.category ? ': ' + meta.category : ''}
          </Typography>
        </Box>

        <Box pb={4}>
          <Typography fontWeight="bold" fontSize={14} component="span">
            Created:{' '}
          </Typography>
          <Typography component="span" fontSize={14} fontWeight="normal">
            {meta.created}
          </Typography>
          {meta['last-call-deadline'] ? (
            <>
              <Typography
                fontWeight="bold"
                fontSize={14}
                component="span"
                ml={1}
              >
                Last Call Deadline:{' '}
              </Typography>
              <Typography component="span" fontSize={14} fontWeight="normal">
                {meta['last-call-deadline']}
              </Typography>
            </>
          ) : null}
        </Box>

        {meta.requires && meta.requires?.length > 0 && meta.requires != 0 && (
          <Box pb={4} sx={{ fontSize: '14px' }}>
            <Typography fontWeight="bold" fontSize={14} component="span">
              Requires:{' '}
            </Typography>
            {meta.requires && meta.requires.includes(', ') ? (
              meta.requires.split(', ').map((item: string, i: number) => (
                <React.Fragment key={item}>
                  {i !== 0 ? ', ' : ''}
                  <Link underline="none" href={`/eips/eip-${item}`}>
                    EIP-{item}
                  </Link>
                </React.Fragment>
              ))
            ) : (
              <Link underline="none" href={`/eips/eip-${meta.requires}`}>
                EIP-{meta.requires}
              </Link>
            )}
          </Box>
        )}

        <Typography
          sx={(theme) => ({
            [theme.breakpoints.up('md')]: {
              background:
                "url('/images/eip_details_author.png') no-repeat left center/32px",
              paddingLeft: '40px',
            },
          })}
          py={0.75}
          variant="subtitle2"
          component={Box}
          className={details.floatWrap}
        >
          {meta?.author?.includes(', ')
            ? meta.author.split(', ').map((item: string, i: number) => (
                <span style={{ float: 'left', lineHeight: '24px' }} key={item}>
                  {i !== 0 ? ', ' : ''}
                  {formatLink(item)}
                </span>
              ))
            : formatLink(meta.author)}
        </Typography>

        <Box pt={4} pb={3}>
          {meta['discussions-to'] && (
            <Button
              sx={{ marginRight: '16px' }}
              variant="contained"
              startIcon={
                <span
                  style={{
                    display: 'inline-block',
                    width: '22px',
                    height: '22px',
                    background:
                      "url('/images/eip_details_discussions.png') center center no-repeat",
                  }}
                />
              }
              size="large"
              href={meta['discussions-to']}
            >
              Discussions
            </Button>
          )}

          <Button
            variant="outlined"
            size="large"
            sx={{
              color: '#272D37',
              borderColor: '#DAE0E6',
              '&:hover': {
                color: '#437ef7',
              },
            }}
            href={`https://eips.ethereum.org/EIPS/eip-${meta.eip}`}
          >
            Original link
          </Button>
        </Box>

        <Box className={details.floatWrap}>
          <Box sx={{ float: 'left' }} width={[1, 1, 0.72, 830]}>
            <Box pb={3}>
              <Typography fontSize={22} component="span" variant="h6">
                1 min read
              </Typography>
              {meta.summary ? null : (
                <Typography component="span" variant="body2" color="#5F6D7E">
                  {' '}
                  by chatGPT-4
                </Typography>
              )}
            </Box>

            <Box
              px={4}
              pt={3}
              pb={5}
              border={1}
              borderColor="#f5f5f5"
              borderRadius="6px"
              sx={{ boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.06)' }}
            >
              {meta.summary ? null : (
                <Box
                  mb={2.5}
                  pl={5.25}
                  sx={{
                    background:
                      "url('/images/eip_details_chatgpt.png') no-repeat left center/contain",
                  }}
                >
                  <Typography
                    sx={{ background: '#F5FAFF' }}
                    display="inline-block"
                    px={1.5}
                    variant="subtitle2"
                    lineHeight="28px"
                    color="#437EF7"
                    fontSize={14}
                    fontWeight="bold"
                  >
                    By ChatGPT-4
                  </Typography>
                </Box>
              )}

              <Typography
                color="#24292f"
                variant="body1"
                lineHeight={1.5}
                dangerouslySetInnerHTML={{
                  __html: meta.summary || meta.chatgpt4,
                }}
              ></Typography>
            </Box>

            <Typography
              id="original-tit"
              pt={6}
              pb={3}
              variant="h6"
              fontSize="22px"
              fontWeight="bold"
            >
              Original
            </Typography>

            <Box
              id="original"
              position="relative"
              px={4}
              pt={3}
              pb={5}
              border={1}
              borderColor="#f5f5f5"
              borderRadius={1.5}
              mb={6}
              sx={{ boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.06)' }}
            >
              <Box
                sx={[
                  {
                    // height: show ? 'auto' : '526px',
                    // overflow: 'hidden',
                  },
                ]}
                position="relative"
                className="markdown-body js-toc-content"
              >
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  components={{
                    h2: ({ node, children, ...props }) => {
                      return (
                        <h2 {...props} id={children}>
                          {children}
                        </h2>
                      );
                    },
                    h3: ({ node, children, ...props }) => {
                      return (
                        <h3 {...props} id={children}>
                          {children}
                        </h3>
                      );
                    },
                    code: ({ node, inline, className, children, ...props }) => {
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
                    h1: ({ node, ...props }) =>
                      HeadingRenderer({ ...props, level: 1 }),
                    h2: ({ node, ...props }) =>
                      HeadingRenderer({ ...props, level: 2 }),
                    h3: ({ node, ...props }) =>
                      HeadingRenderer({ ...props, level: 3 }),
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
              <Box mt={4} sx={{ textAlign: 'center' }}>
                <Button variant="contained" onClick={handleShow}>
                  {show ? 'Show less' : 'View more'}
                </Button>
              </Box>
            </Box>

            {meta['extended resources'] &&
              meta['extended resources']!.length > 0 && (
                <>
                  <Box pb={3}>
                    <Typography variant="h5" component="span">
                      Quick read
                    </Typography>
                    <Typography
                      color="#5F6D7E"
                      variant="body2"
                      component="span"
                    >
                      {' '}
                      by Analyst
                    </Typography>
                  </Box>

                  <Box className={details.floatWrap}>
                    {meta['extended resources'].map((item) => (
                      <Box
                        sx={{
                          float: 'left',
                          '&:nth-of-type(2n)': { marginRight: 0 },
                        }}
                        width={[1, 1, 398, 398]}
                        mb={6.5}
                        mr={4}
                        key={item.title}
                      >
                        <Box height={84} borderRadius="6px">
                          <img
                            style={{
                              display: 'block',
                              width: '100%',
                              height: '100%',
                              border: 'none',
                            }}
                            src={item.imgSrc}
                            alt={item.alt}
                          />
                        </Box>
                        <Typography
                          component={Box}
                          variant="h6"
                          py={2}
                          fontWeight="bold"
                          fontSize={18}
                          lineHeight={'30px'}
                        >
                          {item.title}
                        </Typography>
                        <Box>
                          <Link href={item.link} underline="none">
                            Learn more →
                          </Link>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
          </Box>

          <Box sx={{ float: 'right' }} width={[1, 1, 0.26, 300]}>
            {meta?.projects && meta.projects.length > 0 && (
              <Box
                pt={3}
                px={3}
                border={1}
                borderColor="#eaebf0"
                borderRadius={'10px'}
              >
                <Typography fontWeight="bold" variant="h6" pb={3}>
                  Adopted by projects
                </Typography>

                {meta.projects?.map((item) => (
                  <Link href={item.link} key={item.title} underline="hover">
                    <Box height={100}>
                      <img
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          border: 'none',
                        }}
                        src={item.imgSrc}
                        alt={item.alt}
                      />
                    </Box>
                    <Typography py={2} color="#272d37" variant="subtitle1">
                      {item.title}
                    </Typography>
                  </Link>
                ))}
              </Box>
            )}

            <Box>
              <Affix top={0}>
                <Box className="js-toc" border="1px solid #ECECEC"></Box>
              </Affix>
            </Box>
          </Box>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          borderRadius="10px"
          px={4}
          py={5}
          my={5}
          sx={{ background: '#F8F9FB' }}
        >
          <EmailSubscribe />
        </Box>
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
  const sideMenu = getHeader(con.toString());
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
      sideMenu,
    },
  };
}
