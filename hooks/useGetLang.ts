import { useRouter } from 'next/router';

export default function useGetLang(): string {
  let lang = 'en';
  const router = useRouter();
  if (router.pathname.includes('zh')) {
    lang = 'zh';
  }
  return lang;
}

export function useT() {
  const lang = useGetLang();
  return function (langObj: { en: string, zh: string }) {
    if (lang === 'en') {
      return langObj.en;
    } else if (lang === 'zh') {
      return langObj.zh;
    }
    return langObj.en;
  }
}
