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
    },
  };
});

function createData(
  number: number,
  status: string,
  title: string,
  author: string
) {
  return { number, status, title, author };
}

const rows = [
  createData(
    2,
    'living',
    'Homestead Hard-fork Changes',
    'Vitalik Buterin (@vbuterin)'
  ),
  createData(
    5,
    'living',
    'Gas Usage for `RETURN` and `CALL*`',
    'Christian Reitwiessner <c@ethdev.com>'
  ),
  createData(7, 'living', 'DELEGATECALL', 'Vitalik Buterin (@vbuterin)'),
  createData(
    100,
    'living',
    'Change difficulty adjustment to target mean block time including uncles',
    'Vitalik Buterin (@vbuterin)'
  ),
  createData(
    140,
    'living',
    'REVERT instruction',
    'Alex Beregszaszi (@axic), Nikolai Mushegian <nikolai@nexusdev.us>'
  ),
];

const typeArr = [
  'All',
  'Final',
  'Last Call',
  'Draft',
  'Stagnant',
  'Withdrawn',
  'Review',
];

const statusArr = [
  'Living',
  'Final',
  'Last Call',
  'Review',
  'Draft',
  'Stagnant',
  'Withdrawn',
];

export default function Eips() {
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
          {typeArr.map((item) => (
            <TypeButton
              className={item === 'All' ? 'active' : ''}
              variant="outlined"
              key={item}
            >
              {item}
            </TypeButton>
          ))}
        </ButtonWrap>

        <ButtonWrap>
          {statusArr.map((item) => (
            <TypeButton
              className={item === 'Living' ? 'active' : ''}
              variant="outlined"
              key={item}
            >
              {item}
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
              {rows.map((row) => (
                <StyledTableRow key={row.number}>
                  <StyledTableCell component="th" scope="row">
                    <Link href="./eips/eip1">{row.number}</Link>
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
            count={10}
            showFirstButton
            showLastButton
            color="primary"
          />
        </Stack>
      </Container>
    </>
  );
}
