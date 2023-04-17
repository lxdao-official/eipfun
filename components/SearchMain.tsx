import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, ButtonProps, InputAdornment, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Film {
  title: string;
  year: number;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function SearchHeader() {
  const SearchMain = styled('div')(({ theme }) => ({
    width: 860,
    display: 'flex',
    alignItems: 'top',
    padding: '20px 0',
    justifyContent: 'space-around',
    margin: '60px auto 0 auto',
  }));
  const SearchButton = styled(Button)<ButtonProps>(({ theme }) => ({
    width: 141,
    height: 56,
    lineHeight: '56px',
  }));
  const EIPsSearch = styled(TextField)<TextFieldProps>(({ theme }) => ({
    width: 707,
    height: 58,
    lineHeight: '58px',
    // backgroundColor: '#fff',
    overflow: 'hidden',
    '.MuiInputBase-root': {
      backgroundColor: '#fff',
    },
  }));
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Film[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...topFilms]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <SearchMain>
      <Autocomplete
        id="search-header"
        open={open}
        disableClearable
        onClose={() => {
          setOpen(false);
        }}
        onInputChange={(event, value) => {
          if (value.length > 2) {
            setOpen(true);
          }
        }}
        options={options.map((option) => option.title)}
        autoSelect={false}
        freeSolo
        renderInput={(params) => (
          <EIPsSearch
            placeholder="Search EIPs by number/word..."
            {...params}
            size="medium"
            InputProps={{
              type: 'search',
              ...params.InputProps,
            }}
          />
        )}
      />
      <SearchButton variant="contained" size="large">
        Search
      </SearchButton>
    </SearchMain>
  );
}

// Top films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];
