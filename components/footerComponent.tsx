import styled from '@emotion/styled';

type IPropsTitle = {
  children: React.ReactNode;
};

const TitleWrap = styled.h4`
  height: 24px;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #272d37;
`;

export function Title({ children }: IPropsTitle) {
  return <TitleWrap>{children}</TitleWrap>;
}

const FooterItemWrap = styled.ul`
  list-style: none;
  padding: 0 0 58px;
  margin: 0;
`;

const Li = styled.li`
  height: 30px;
  line-height: 30px;
`;

const A = styled.a`
  text-decoration: none;
  color: #5f6d7e;
  &:hover {
    color: #000;
    text-decoration: underline;
  }
`;

type IPropsItem = {
  data: { con: string; href: string }[];
};

export function FooterItem({ data }: IPropsItem) {
  return (
    <FooterItemWrap>
      {data.map((item) => (
        <Li key={item.con}>
          <A href={item.href}>{item.con}</A>
        </Li>
      ))}
    </FooterItemWrap>
  );
}
