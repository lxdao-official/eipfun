import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';
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
import Link from 'next/link';
import axios from 'axios';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f7f7f7',
    color: '#2e343f',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: '1px solid #f7f7f7',
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.palette.action.hover,
  // },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
    borderRight: '1px solid #f7f7f7',
  },
}));

const ButtonWrap = styled(Box)({
  margin: '6px 0',
  paddingBottom: '24px',
});

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
const typeArr = ['Standards_Track', 'Meta', 'Informationl'];

const statusArr = [
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
  const [activeSecond, setActiveSecond] = useState('');

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
    axios
      .get('https://api-dev.eips.fun/eips/list', {
        params: {
          type,
          category,
          status,
          page,
          per_page: 20,
        },
      })
      .then((res) => {
        if (res.data.data && res.data.pagination) {
          setTotal(res.data.pagination.total);
          setCurrent(res.data.pagination.current + 1);
          setDataArr(res.data.data);
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
        setActiveSecond('');
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

  return (
    <>
      <Box sx={{ height: '1px', background: '#EAEBF0' }}></Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            lineHeight: '40px',
            padding: '32px 0 34px',
            fontSize: '32px',
            fontWeight: '700',
            color: '#2E343F',
          }}
        >
          Eips
        </Box>

        <ButtonWrap>
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
        </ButtonWrap>

        <ButtonWrap>
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
        </ButtonWrap>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Number</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Title</StyledTableCell>
                <StyledTableCell align="right">Author</StyledTableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {dataArr.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Link
                      style={{ textDecoration: 'underline', color: '#437EF7' }}
                      href="./eips/eip-1"
                    >
                      {row.eip}
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row.status}
                  </StyledTableCell>
                  <StyledTableCell>{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row.author}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack spacing={2} alignItems={'center'} sx={{ margin: '16px 0 20px' }}>
          <Pagination
            onChange={handlePageChange}
            count={total || 0}
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
    res = await axios.get('https://api-dev.eips.fun/eips/list');
  } catch (e) {}
  if (res && res.status === 200 && res.data && res.data.pagination) {
    return { data: res.data.data, pagination: res.data.pagination };
  }
};

export default Eips;
