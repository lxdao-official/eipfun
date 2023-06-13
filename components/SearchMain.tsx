import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { Box, InputAdornment, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';
import { link } from 'fs';
const ADDR = process.env.NEXT_PUBLIC_BACKEND_ADDR || 'https://api-dev.eips.fun';

const EIPsSearch = styled(TextField)<TextFieldProps>(({}) => ({
  maxWidth: 850,
  width: '80%',
  flex: 0,
  height: 58,
  lineHeight: '58px',
  // backgroundColor: '#fff',
  overflow: 'hidden',

  '.MuiInputBase-root': {
    backgroundColor: '#fff',
    padding: '9px',
    paddingRight: '9px!important',
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
    margin: 0,
  },
  p: {
    width: '100%',
    margin: '5px 0',
  },
  b: {
    color: '#437EF7',
  },
}));

const SearchMain = styled('div')(({}) => ({
  display: 'flex',
  alignItems: 'top',
  padding: '20px 0',
  justifyContent: 'space-around',
  margin: '60px auto 0 auto',
  width: '100%',
  '.MuiAutocomplete-root ': {
    width: '80%',
  },
}));

type EipCommonResult = {
  eip?: string;
  title?: TrustedHTML;
  ts_headline?: TrustedHTML;
  rank?: number;
  type?: string;
  category?: string;
};
type EipResult = {
  eip: string;
  title: TrustedHTML;
  type: string;
  category: string;
};
type EipTitleResult = {
  eip: string;
  ts_headline: TrustedHTML;
  rank: number;
  title?: TrustedHTML;
  type: string;
  category: string;
};
type EipContentResult = {
  eip: string;
  ts_headline: TrustedHTML;
  title: TrustedHTML;
  rank: number;
  type: string;
  category: string;
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
    ['SearchMain', { searchText }],
    () => {
      return axios.get(url).then((res: AxiosResponse) => {
        let optionsList: EipCommonResult[] = [];
        if (res.data.data?.eip_list) {
          optionsList = res.data.data.eip_list;
        } else {
          const title_list: EipTitleResult[] = res.data.data?.title_list || [];
          const content_list: EipContentResult[] =
            res.data.data?.content_list || [];

          if (title_list.length > 0) {
            for (let i = 0; i < title_list.length; i++) {
              const item: EipCommonResult = { eip: title_list[i].eip };
              item.title = title_list[i].ts_headline;
              for (let j = 0; j < content_list.length; j++) {
                if (content_list[j].eip === title_list[i].eip) {
                  item.ts_headline = content_list[j].ts_headline;
                  content_list.splice(j, 1);
                  j--;
                  break;
                }
              }
              optionsList.push(item);
            }
            if (content_list.length > 0) {
              optionsList = optionsList.concat(content_list);
            }
          } else {
            if (content_list.length > 0) {
              optionsList = optionsList.concat(content_list);
            }
          }

          // if (res.data.data?.title_list) {
          //   optionsList = optionsList.concat(res.data.data.title_list);
          // }
          // if (res.data.data?.content_list) {
          //   optionsList = optionsList.concat(res.data.data.content_list);
          // }
          //
          // optionsList = optionsList.reduce(
          //   (obj: EipCommonResult[], item: EipCommonResult) => {
          //     let find = obj.find(
          //       (i: EipCommonResult) => i.eip && i.eip === item.eip
          //     );
          //     //如果没有title则使用ts_headline
          //     item.title = item.title ? item.title : item.ts_headline;
          //
          //     console.log(item);
          //     //取出重复并使用content_list的title和ts_headline
          //     find
          //       ? ((find.title = item.title),
          //         (find.ts_headline = item.ts_headline))
          //       : obj.push(item);
          //     return obj;
          //   },
          //   []
          // );
        }
        return optionsList.slice(0, 20);
      });
    },
    {
      enabled: searchText.length > 0,
      retry: false,
    }
    // { keepPreviousData: true, staleTime: 5 * 60 * 1000 }
  );
}
export default function SearchHeader() {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedSearch = useDebounce(inputValue, 200);
  const router = useRouter();

  const { isFetching, data: options } = useSearch(debouncedSearch);

  return (
    <SearchMain>
      <Autocomplete
        id="search-main"
        disableClearable
        options={options || []}
        onInputChange={(e, value) => {
          setInputValue(value);
        }}
        clearOnBlur
        clearOnEscape
        getOptionLabel={(option: any) =>
          typeof option === 'string' ? option : option.title
        }
        filterOptions={(x) => x}
        autoSelect={false}
        freeSolo={inputValue?.length ? false : true}
        autoComplete={false}
        noOptionsText={inputValue && `No results for "${inputValue}"`}
        loading={isFetching}
        loadingText={
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <ReactLoading type="spin" color="#C4C4C4" height={20} width={20} />
          </Box>
        }
        renderOption={(props, option: any) => {
          return (
            <SearchOption
              {...props}
              onClick={() => {
                location.href = `/eips/eip-${option.eip}`;
              }}
            >
              <h3>
              {option.category === "ERC"?'ERC':'EIP'}-{option.rank ? option.eip : <b>{option.eip} </b>}&nbsp;
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
            placeholder="Search EIPs by number/word"
            {...params}
            size="medium"
            InputProps={{
              type: 'search',
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: '#919BA7' }} />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </SearchMain>
  );
}