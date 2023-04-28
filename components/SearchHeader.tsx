import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import { InputAdornment, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';
const ADDR = process.env.NEXT_PUBLIC_BACKEND_ADDR||'https://api-dev.eips.fun';

const EIPsSearch = styled(TextField)<TextFieldProps>(({}) => ({
  width: 850,
  height: 58,
  lineHeight: '58px',
  // backgroundColor: '#fff',
  overflow: 'hidden',
  '.MuiInputBase-root': {
    backgroundColor: '#fff',
  },
}));
const SearchOption = styled('li')(({}) => ({
  padding: '5px 20px!important',
  borderBottom: '1px solid #f3f3f3',
  width: '100%',
  color: '#2E343F',
  margin: 0,
  fontSize:14,
  b: {
    color: '#437EF7',
  },
  
}));
const SearchLoading = styled('div')(({}) => ({
  textAlign: 'center',
  margin: '0 auto',
  div: {
    margin: '0 auto',
  },
}));

type EipCommonResult = {
  eip: string;
  title?: TrustedHTML;
  ts_headline?: TrustedHTML;
  rank?: number;
};
type EipResult = {
  eip: string;
  title: TrustedHTML;
};
type EipTitleResult = {
  eip: string;
  ts_headline: TrustedHTML;
  rank: number;
  title?: TrustedHTML;
};
type EipContentResult = {
  eip: string;
  ts_headline: TrustedHTML;
  title: TrustedHTML;
  rank: number;
};
interface ResultList {
  eip_list?: Array<EipResult>;
  title_list?: Array<EipTitleResult>;
  content_list?: Array<EipContentResult>;
}
interface AxiosResponse {
  data: {
    data?: ResultList;
  };
}
function useSearch(searchText: string) {
  let url = `${ADDR}/eips/search?content=${searchText}`;

  return useQuery(
    ['todos', { searchText }],
    () => {
      return axios.get(url).then((res: AxiosResponse) => {
        console.log(res.data.data);
        let optionsList: EipCommonResult[] = [];
        if (res.data.data?.eip_list) {
          optionsList = res.data.data.eip_list;
        }
        if (res.data.data?.content_list) {
          optionsList = optionsList.concat(res.data.data?.content_list);
        }
        if (res.data.data?.title_list) {
          res.data.data?.title_list.map((item) => {
            item.title = item.ts_headline;
          });
          optionsList = optionsList.concat(res.data.data?.title_list);
        }
        return optionsList.slice(0, 20);
      });
    },
    {
      enabled: searchText.length > 0,
    }
    // { keepPreviousData: true, staleTime: 5 * 60 * 1000 }
  );
}
export default function SearchHeader() {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedSearch = useDebounce(inputValue, 500);
  const router = useRouter();

  const {
    isFetching,
    isError,
    data: options,
    error,
  } = useSearch(debouncedSearch);

  return (
      <Autocomplete
        id="search-header"
        sx={{ width: 460, height: 46 }}
        disableClearable
        options={options || []}
        onInputChange={(e, value) => {
          setInputValue(value);
        }}
        getOptionLabel={(option: any) =>
          typeof option === 'string' ? option : option.title
        }
        filterOptions={(x) => x}
        // value={inputValue}
        autoSelect={false}
        // freeSolo
        autoComplete={false}
        // noOptionsText={`No results for "${inputValue} "`}
        loading={isFetching}
        loadingText={
          <SearchLoading>
            <ReactLoading type="spin" color="#C4C4C4" height={20} width={20} />
          </SearchLoading>
        }
        renderOption={(props, option: any) => {
          return (
            <SearchOption
              {...props}
              onClick={() => {
                router.push(`/eips/eip-${option.eip}`);
              }}
            >
                EIP:<b>{option.eip}</b> -{' '}
                <span dangerouslySetInnerHTML={{ __html: option.title }}></span>
            </SearchOption>
          );
        }}
        freeSolo
        renderInput={(params) => (
          <TextField
            placeholder="Search EIPs by number/word..."
            {...params}
            size="small"
            InputProps={{
              type: 'search',
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
  );
}
