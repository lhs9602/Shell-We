import styled from 'styled-components';

export const MainShellWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
`;
export const MainShellImg = styled.img`
  width: 100%;
`;
export const MainShellText = styled.div`
  font-size: 52px;
  color: red;
  font-style: italic;
`;
export const ShellListContainer = styled.div`
  display: flex;
  height: fit-content;
  justify-content: flex-start;
  gap: 10px;
  flex-wrap: wrap;
  margin: 10px;
  padding: 10px;
  max-width: 1200px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
