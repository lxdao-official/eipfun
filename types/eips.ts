export type EipType = {
  created?: string;
  description?: string;
  author: string;
  title: string;
  status: string;
  type: string;
  eip: number;
};
export type EipWayIntro = {
  intro: string;
  title: string;
  image: string;
  action?: string;
  actionLink?: string;
  index: number;
};
export type PartnerType = {
  name: string;
  logo: string;
  link: string;
};
export type AdvisorType = {
  name: string;
  head: string;
  intro: string;
  desc: string;
};
