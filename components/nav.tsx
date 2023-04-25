import { useEffect, useState } from 'react';
import { Button, Container } from '@mui/material';
import { useRouter } from 'next/router';

export default function Nav() {
  const [langText, setLangText] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (router.pathname.includes('zh')) {
      setLangText('EN');
    } else {
      setLangText('中文');
    }
  }, [router]);

  const toggleLang = () => {
    if (langText === 'EN') {
      router.replace(router.pathname.substring(3));
    } else {
      router.replace('/zh' + router.pathname);
    }
  };

  return (
    <Container maxWidth="lg">
      {' '}
      logo{' '}
      <Button variant="contained" onClick={toggleLang}>
        icon {langText}
      </Button>
    </Container>
  );
}
