import { useRouter } from 'next/router';

export default function useGetLang(): string {
<<<<<<< HEAD
  let lang = 'en';
  const router = useRouter();
  if (router.pathname.includes('zh')) {
    lang = 'zh';
  }
  return lang;
}
=======
  let lang = 'en'
  const router = useRouter();
  if (router.pathname.includes('zh')) {
    lang = 'zh'
  }
  return lang;
}
>>>>>>> 8ef858f44e5814660c2f0834e14b228949a967b1
