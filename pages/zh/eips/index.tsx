import React, { useEffect, useState } from 'react';
import { Box, Button, Link, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { sendGet } from '@/network/axios-wrapper';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f7f7f7',
    color: '#2e343f',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: '1px solid #f7f7f7',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    borderRight: '1px solid #f7f7f7',
  },
}));

const TypeButton = styled(Button)(() => {
  return {
    marginRight: '16px',
    borderColor: 'transparent',
    color: '#272D37',
    background: '#F7F7F8',
    '&:hover': {
      color: '#437EF7',
    },
    '&.active': {
      color: '#437EF7',
      background: '#F5FAFF',
    },
  };
});

const categorysArr = ['All', 'Core', 'Networking', 'Interface', 'ERC'];
const typeArr = ['Meta', 'Informational'];

const statusArr = [
  'All',
  'Living',
  'Final',
  'Last_Call',
  'Review',
  'Draft',
  'Stagnant',
  'Withdrawn',
  'Idea',
];

type IProps = {
  data: {
    id: number;
    eip: number;
    title: string;
    author: string;
    status: string;
    type: string;
    category?: string;
  }[];
  pagination: {
    total: number;
    current: number;
    per_page: number;
  };
};

function Eips({ data, pagination }: IProps) {
  const [total, setTotal] = useState(pagination.total);
  const [current, setCurrent] = useState(0);
  const [dataArr, setDataArr] = useState(data);

  const [active, setActive] = useState('All');
  const [activeSecond, setActiveSecond] = useState('All');

  useEffect(() => {
    getPageData({
      page: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, activeSecond]);

  const getPageData = ({
    type = typeArr.includes(active) ? active : undefined,
    category = categorysArr.includes(active) && active !== 'All'
      ? active
      : undefined,
    status = statusArr.includes(activeSecond) && activeSecond !== 'All'
      ? activeSecond
      : undefined,
    page,
  }: {
    type?: string;
    category?: string;
    status?: string;
    page?: number;
  }) => {
    sendGet('/eips/list', {
      type,
      category,
      status,
      page,
      per_page: 20,
    })
      .then((res) => {
        if (res.data && res.pagination) {
          setTotal(res.pagination.total);
          setCurrent(res.pagination.current + 1);
          setDataArr(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickType = (value: string, status = 'first') => {
    if (status === 'first') {
      setActive(value);
      if (value === 'All') {
        setActiveSecond('All');
      }
    } else {
      setActiveSecond(value);
    }
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrent(page);
    getPageData({
      page: page - 1,
    });
  };

  const fomatLink = (str: string) => {
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
          <Link underline="hover" href={link}>
            {linkText}
          </Link>
          )
        </>
      );
    } else {
      return str;
    }
  };

  return (
    <>
      <Box borderTop={1} borderColor="#EAEBF0" />
      <Container maxWidth="lg">
        <Typography color="#2E343F" py={4} variant="h4" fontWeight="bold">
          EIPs
        </Typography>

        <Box pb={3} my={0.75}>
          {categorysArr.map((item) => (
            <TypeButton
              className={item === active ? 'active' : ''}
              variant="outlined"
              key={item}
              onClick={() => handleClickType(item)}
            >
              {item}
            </TypeButton>
          ))}
          {typeArr.map((item) => (
            <TypeButton
              className={item === active ? 'active' : ''}
              variant="outlined"
              key={item}
              onClick={() => handleClickType(item)}
            >
              {item.replace('_', ' ')}
            </TypeButton>
          ))}
        </Box>

        <Box pb={3} my={0.75}>
          {statusArr.map((item) => (
            <TypeButton
              className={item === activeSecond ? 'active' : ''}
              variant="outlined"
              key={item}
              onClick={() => handleClickType(item, 'status')}
            >
              {item.replace('_', ' ')}
            </TypeButton>
          ))}
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: '0.08' }}>Number</StyledTableCell>
                <StyledTableCell sx={{ width: '0.08' }}>Status</StyledTableCell>
                <StyledTableCell sx={{ width: '0.22' }}>Type</StyledTableCell>
                <StyledTableCell sx={{ width: '0.32' }}>Title</StyledTableCell>
                <StyledTableCell sx={{ width: '0.3' }}>Author</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dataArr.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Link
                      style={{ color: '#437EF7', fontWeight: 'bold' }}
                      href={`./eips/eip-${row.eip}`}
                    >
                      {row.eip}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.status}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.type.replace('_', ' ')}
                    {row.category ? ': ' + row.category : ''}
                  </StyledTableCell>
                  <StyledTableCell>{row.title}</StyledTableCell>
                  <StyledTableCell>
                    {row?.author?.includes(', ')
                      ? row.author.split(', ').map((item, i) => (
                          <React.Fragment key={item}>
                            {i !== 0 ? ', ' : ''}
                            {fomatLink(item)}
                          </React.Fragment>
                        ))
                      : fomatLink(row.author)}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} alignItems={'center'} sx={{ margin: '16px 0 20px' }}>
          <Pagination
            onChange={handlePageChange}
            count={Math.ceil(total / 20) || 0}
            page={current || 1}
            showFirstButton
            showLastButton
            color="primary"
          />
        </Stack>
      </Container>
    </>
  );
}

Eips.getInitialProps = async () => {
  let res;
  try {
    res = await sendGet('/eips/list');
  } catch (e) {}
  if (res && res.data && res.pagination) {
    return { data: res.data, pagination: res.pagination };
  }
};

export default Eips;
