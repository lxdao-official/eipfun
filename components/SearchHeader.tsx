import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { InputAdornment, Typography, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ReactLoading from 'react-loading';
import { useRouter } from 'next/router';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import useDebounce from '../hooks/useDebounce';
const ADDR = process.env.NEXT_PUBLIC_BACKEND_ADDR || 'https://api-dev.eips.fun';

const SearchOption = styled('li')(() => ({
  flexDirection: 'column',
  padding: '5px 10px!important',
  borderBottom: '1px solid #f3f3f3',
  width: '100%',
  color: '#2E343F',
  margin: 0,
 
  h5:{
    textAlign:'left'
  },
  b: {
    color: '#437EF7',

  },
  p:{
    width:'100%',
    fontSize: '12px',
    textAlign:'left'
  }
 
}));
const SearchLoading = styled('div')(() => ({
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
    ['SeatchHeader', { searchText }],
    () => {
      return axios.get(url).then((res: AxiosResponse) => {
        let optionsList: EipCommonResult[] = [];
        if (res.data.data?.eip_list) {
          optionsList = res.data.data.eip_list;
          
        } else {
         
          if(res.data.data?.title_list ) {
            optionsList = optionsList.concat(res.data.data.title_list)
          }
          if(res.data.data?.content_list ) {
            optionsList = optionsList.concat(res.data.data.content_list)
          }
          
          optionsList = optionsList.reduce((obj:EipCommonResult[], item:EipCommonResult) => {  
            let find = obj.find((i:EipCommonResult) => i.eip&&( i.eip === item.eip))  
            //如果没有title则使用ts_headline
            item.title = item.title? item.title : item.ts_headline

            console.log(item)
            //取出重复并使用content_list的title和ts_headline
            find ? (find.title = item.title,find.ts_headline = item.ts_headline):(obj.push(item))  
            return obj  
          }, [])
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

  const { isFetching, data: options } = useSearch(debouncedSearch);

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
      loading={inputValue.length > 0 || isFetching}
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
                router.push(`/eips/eip-${option.eip}`);
              }}
            >
              <Typography  variant='h5' width='100%'>
                EIP-{option.rank ? option.eip : <b>{option.eip} </b>  }
                <span dangerouslySetInnerHTML={{ __html: option.title }}></span>
              </Typography>
              {option.ts_headline && (
                <p  dangerouslySetInnerHTML={{ __html: option.ts_headline }}></p>
              )}
            </SearchOption>
        );
      }}
      renderInput={(params) => (
        <TextField
          placeholder="Search EIPs by number/word"
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
