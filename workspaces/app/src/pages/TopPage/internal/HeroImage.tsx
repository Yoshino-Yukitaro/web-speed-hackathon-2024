import styled from 'styled-components';

const _Wrapper = styled.div`
  aspect-ratio: 16 / 9;
  width: 100%;
`;

const _Image = styled.img`
  display: inline-block;
  width: 100%;
  height: auto;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <_Image alt="Cyber TOON" decoding="async" height={2304} loading="eager" src='assets/cyber-toon.avif' width={4096}/>
    </_Wrapper>
  );
};
