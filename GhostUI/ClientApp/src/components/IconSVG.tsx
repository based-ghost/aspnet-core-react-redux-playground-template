import React, { useMemo, ReactNode, ReactText } from 'react';
import styled from 'styled-components';
import { normalizeUnit } from '../utils';
import SVG, { IProps } from 'react-inlinesvg';

interface LoaderProps {
  width?: ReactText;
  height?: ReactText;
}

interface IconSVGProps extends IProps {
  width?: ReactText;
  height?: ReactText;
}

const Loader = styled.div<LoaderProps>`
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;

const IconSVG: React.FC<IconSVGProps> = ({
  src,
  width,
  height,
  description
}) => {
  // Placeholder rendered while loading svg from source - dimensions of svg
  const loaderNode = useMemo<ReactNode>(() => (
    <Loader
      width={normalizeUnit(width)}
      height={normalizeUnit(height)}
    />
  ), [width, height]);

  return (
    <SVG
      src={src}
      width={width}
      height={height}
      loader={loaderNode}
      description={description}
    />
  );
};

export default IconSVG;