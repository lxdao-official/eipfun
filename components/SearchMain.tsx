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
const ADDR = process.env.NEXT_PUBLIC_BACKEND_ADDR || 'https://api-dev.eips.fun';

const EIPsSearch = styled(TextField)<TextFieldProps>(({}) => ({
  maxWidth: 850,
  height: 58,
  lineHeight: '58px',
  // backgroundColor: '#fff',
  overflow: 'hidden',
  '.MuiInputBase-root': {
    backgroundColor: '#fff',
  },
}));
const SearchOption = styled('li')(({}) => ({
  flexDirection: 'column',
  padding: '20px!important',
  borderBottom: '1px solid #f3f3f3',
  width: '100%',
  color: '#2E343F',
  margin: 0,
  h3: {
    width: '100%',
    fontSize: 18,
    fontWeight: 600,
    margin: 0,
  },
  p: {
    width: '100%',
    fontSize: 12,
    margin: 0,
  },
  b: {
    color: '#437EF7',
  },
}));
const SearchLoading = styled('div')(({}) => ({
  textAlign: 'center',
  margin: '10px auto',
  div: {
    margin: '0 auto',
  },
}));
const SearchMain = styled('div')(({}) => ({
  display: 'flex',
  alignItems: 'top',
  padding: '20px 0',
  justifyContent: 'space-around',
  margin: '60px auto 0 auto',
  '.MuiAutocomplete-root ': {
    width: '80%',
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
        let optionsList: EipCommonResult[] = [];
        if (res.data.data?.eip_list) {
          optionsList = res.data.data.eip_list;
        }
        let titleList = res.data.data?.title_list;
        let contentList = res.data.data?.content_list;

        // if (res.data.data?.title_list) {
        //   res.data.data?.title_list.map((item) => {
        //     item.title = item.ts_headline;
        //   });
        //   optionsList = optionsList.concat(res.data.data?.title_list);
        // }
        // if (res.data.data?.content_list) {
        //   optionsList = optionsList.concat(res.data.data?.content_list);
        // }
        let combined: EipCommonResult[] = [];
        if (titleList && contentList) {
          optionsList = contentList.reduce((acc, cur) => {
            const target = acc.find((e) => e.eip === cur.eip);
            if (target) {
              Object.assign(target, cur);
            } else {
              acc.push(cur);
            }
            return acc;
          }, titleList);
        }
        console.log(combined)
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
    <SearchMain>
      <Autocomplete
        id="search-main"
        disableClearable
        options={options || []}
        onInputChange={(e, value) => {
          if (value.length > 0) {
            setInputValue(value);
          }
        }}
        getOptionLabel={(option: any) =>
          typeof option === 'string' ? option : option.title
        }
        filterOptions={(x) => x}
        // value={inputValue}
        autoSelect={false}
        // freeSolo
        autoComplete={false}
        noOptionsText={inputValue && `No results for "${inputValue}"`}
        // noOptions={<>No results for "${inputValue}</>}

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
              <h3>
                EIP: {option.rank ? option.eip : <b>{option.eip}</b>} -{' '}
                <span dangerouslySetInnerHTML={{ __html: option.title }}></span>
              </h3>
              {option.ts_headline && (
                <p dangerouslySetInnerHTML={{ __html: option.ts_headline }}></p>
              )}
            </SearchOption>
          );
        }}
        renderInput={(params) => (
          <EIPsSearch
            placeholder="Search EIPs by number/word..."
            {...params}
            size="medium"
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
    </SearchMain>
  );
}
