import styled from 'styled-components';
import { SmallButton4 } from '../../common/button/Button.styled';

const ResponseShellListWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;

const ResponseShellWrapper = styled.div`
  display: flex;
  height: fit-content;
  border-top: 0.5px solid rgba(0, 0, 0, 0.5);
  gap: 30px;
  padding: 30px;
  align-items: center;

  @media (max-width: 768px) {
    gap: 10px;
    padding: 10px;
  }
`;

const ShellsImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 150px;
  min-width: 145px;
  height: fit-content;
  overflow: hidden;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  flex-grow: 1;

  @media (max-width: 768px) {
    max-width: 100px;
    min-width: 0px;
  }
`;

const ShellImg = styled.img`
  width: 100%;
`;

const ShellsTextInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 640px;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  font-size: 20px;
  line-height: 25px;
  flex-grow: 10;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const TextBox = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  padding: 10px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const BodyBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 5px;
  flex-grow: 3;
  padding: 10px;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;

const AcceptInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-grow: 1;
`;

// UserImg => Avatar 수정 후 대체 예정
const UserImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: contain;
  border: 0.5px solid rgba(0, 0, 0, 0.5);
`;

const AcceptButton = styled(SmallButton4)`
  font-weight: 400;

  @media (max-width: 768px) {
    width: 80px;
    height: 40px;
  }
`;

export {
  ResponseShellListWrapper,
  ResponseShellWrapper,
  ShellsImageBox,
  ShellImg,
  ShellsTextInfoBox,
  TextBox,
  BodyBox,
  AcceptInfo,
  UserImg,
  AcceptButton,
};
