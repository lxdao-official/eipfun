import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {
  InputAdornment,
  Typography,
  styled,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReactLoading from 'react-loading';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';
import useGetLang from '@/hooks/useGetLang';

const ADDR = process.env.NEXT_PUBLIC_BACKEND_ADDR || 'https://api-dev.eips.fun';

const SearchOption = styled('li')(() => ({
  flexDirection: 'column',
  padding: '5px 10px!important',
  borderBottom: '1px solid #f3f3f3',
  width: '100%',
  color: '#2E343F',
  margin: 0,

  h5: {
    textAlign: 'left!important',
  },
  b: {
    color: '#437EF7',
  },
  p: {
    width: '100%',
    fontSize: '12px',
    textAlign: 'left',
  },
}));
const SearchLoading = styled('div')(() => ({
  textAlign: 'center',
  margin: '0 auto',
  div: {
    margin: '0 auto',
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
    ['SearchHeader', { searchText }],
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
        }

        // return optionsList.length > 0 ? optionsList.slice(0, 20) : null;
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
  const debouncedSearch = useDebounce(inputValue, 500);
  const screenWidth = useMediaQuery('(min-width:1000px)');
  const lang = useGetLang();

  const { isFetching, data: options } = useSearch(debouncedSearch);

  return (
    <Autocomplete
      id="search-header"
      sx={{ width: screenWidth ? 460 : 360 }}
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
      loading={isFetching}
      freeSolo={inputValue?.length ? false : true}
      autoComplete={false}
      noOptionsText={inputValue && `No results for "${inputValue}"`}
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
              location.href = `${lang === 'en' ? '' : '/zh'}/eips/eip-${
                option.eip
              }`;
            }}
          >
            <Typography variant="h5" width="100%">
              {option.category === 'ERC' ? 'ERC' : 'EIP'}-
              {option.rank ? option.eip : <b>{option.eip} </b>}&nbsp;
              <span dangerouslySetInnerHTML={{ __html: option.title }}></span>
            </Typography>
            {option.ts_headline && (
              <p dangerouslySetInnerHTML={{ __html: option.ts_headline }}></p>
            )}
          </SearchOption>
        );
      }}
      renderInput={(params) => (
        <TextField
          placeholder={
            lang === 'en'
              ? 'Search EIPs by number/word'
              : '输入编号或标题内容搜索 EIP'
          }
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
