import { useRouter } from "next/router";

export default function useGetLang(): string {
  let lang = 'en'
  const router = useRouter();
  if (router.pathname.includes('zh')) {
    lang = 'zh'
  }
  return lang;
}