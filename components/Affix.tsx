import React from 'react';

export default function Affix(props: {
  top: number;
  parent: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const element = React.createRef<HTMLDivElement>();
  let oldStyles: {
    [key: string]: string;
  } = {
    position: '',
    top: '',
    width: '',
  };
  // Offset could make the element fixed earlier or later
  const { offset = 0 } = props;

  const checkPosition = (distanceToBody: number, width: number) => {
    const scrollTop = window.scrollY;
    const elemHeight = element.current?.clientHeight || 0;
    const parentHeight = props.parent.current!.offsetHeight;
    const parentTop =
      props.parent.current!.getBoundingClientRect().top + scrollTop;

    if (scrollTop + elemHeight + props.top > parentHeight + parentTop) {
      element.current!.style.position = 'absolute';
      element.current!.style.top = parentHeight + parentTop - elemHeight + 'px';
    } else if (distanceToBody - scrollTop < props.top + offset) {
      if (element.current!.style.position !== 'fixed') {
        for (let key in oldStyles) {
          oldStyles[key as any] = element.current!.style[key as any];
        }
        element.current!.style.position = 'fixed';
        element.current!.style.width = width + 'px';
        element.current!.style.top = props.top + 'px';
      }
    } else {
      // reset to default
      for (let key in oldStyles) {
        element.current!.style[key as any] = oldStyles[key];
      }
    }
  };

  React.useEffect(() => {
    if (typeof window.scrollY === 'undefined') {
      // don't work in IE
      return;
    }

    const distanceToBody =
      window.scrollY + element.current!.getBoundingClientRect().top;
    const handleScroll = () => {
      requestAnimationFrame(() => {
        checkPosition(distanceToBody, element.current!.clientWidth);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div
      ref={element}
      style={{ zIndex: 1, background: '#fff' }}
      className={props.className}
    >
      {props.children}
    </div>
  );
}
