import Link, { LinkProps } from 'next/link';
import React, { useState } from 'react';
import { EipWayIntro } from '../types/eips';
import { useRouter } from 'next/router';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CardProps, Typography, styled } from '@mui/material';
import EastIcon from '@mui/icons-material/East';
const IntroCard = ({ intro }: { intro?: EipWayIntro }, { key }: { key?: number }): JSX.Element => {
    const router = useRouter();
    const IntroCard = styled(Card)<CardProps>(({ theme }) => ({
       '.MuiCardContent-root':{
        height:240,
        padding:32
       },
       '.MuiCardActions-root':{
        padding:'10px 32px',
        a:{
            fontSize:15,
            fontWeight:600,
            color:'#437EF7'
        }
       }
      }));
  const IntroNumber = styled('span')(({ theme }) => ({
    display: 'inline-block',
    width: 54,
    height:28,
    lineHeight:'28px',
    background:'#F5FAFF',
    borderRadius:5,
    textAlign:'center',
    color:'#437EF7'
  }));
      
  const IntroTitle = styled('h5')(({ theme }) => ({
    fontSize: 17,
    height:30,
    padding:'16px 0 0 0',
    lineHeight:'30px',
    textAlign:'left',
    color:'#272D37',
    fontWeight:700
  }));
  const IntroDesc = styled('p')(({ theme }) => ({
    width:'100%',

    fontSize: 16,

    // height:30,
    fontWeight:400,
    padding:'10px 0 0 0 ',
    lineHeight:'24px',
    textAlign:'left',
    color:'#5F6D7E',
    
    
  }));
  
    const meta = {

        ...intro,
    };
    return (

        <IntroCard sx={{ maxWidth: 218, flex: 1, width: 218, height: 460 ,textAlign:'left'}}>
            <CardActionArea sx={{ height: 'auto'}}>
                <CardMedia
                    component="img"
                    height="163"
                    image={meta.image}
                    alt={meta.title}
                />
                <CardContent>
                    <IntroNumber>No.{meta.index}</IntroNumber>
                    <IntroTitle> {meta.title}</IntroTitle>
                    <IntroDesc> {meta.intro}</IntroDesc>
                   
                    
                </CardContent>
            </CardActionArea>
            {meta.action && meta.actionLink && (
                <CardActions>
                    <Link  href={meta.actionLink}> {meta.action} <EastIcon sx={{fontSize:'14px'}} /></Link>


                </CardActions>
            )}
        </IntroCard>
    );
};

export default IntroCard;