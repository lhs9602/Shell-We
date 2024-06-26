import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateShells } from '../../hooks/cart/useCartShells';
import LikeDefaultShell from '../../asset/likeshells/LikeDefaultShell.svg';
import LikeSelectedShell from '../../asset/likeshells/LikeSelectedShell.svg';
import {
  ShellContainer,
  ShellImgWrapper,
  ShellImg,
  LikeShellIcon,
  ShellInfoWrapper,
  ShellTitleInfo,
} from './Shell.stlyled';
import Avatar from '../avatar/Avatar';
const Shell = ({ shell }: ShellProps) => {
  const { mutate } = useCreateShells(shell.id);
  const [selecedShell, setSelecedShell] = useState(false);
  const navigate = useNavigate();

  const handleLikeCilck = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    mutate();
    setSelecedShell((prev) => !prev);
  };

  const handleDetailCilck = (id: number) => {
    navigate(`/shelldetail/${id}`);
  };

  return (
    <ShellContainer>
      {shell && (
        <>
          <ShellImgWrapper onClick={() => handleDetailCilck(shell.id)}>
            <ShellImg src={shell.picture} />
            <LikeShellIcon
              src={selecedShell ? LikeSelectedShell : LikeDefaultShell}
              onClick={handleLikeCilck}
            />
          </ShellImgWrapper>
          <ShellInfoWrapper>
            <Avatar avatartype="icon" member={shell.member} />
            <ShellTitleInfo>{shell.title}</ShellTitleInfo>
          </ShellInfoWrapper>
        </>
      )}
    </ShellContainer>
  );
};

export type ShellType = {
  id: number;
  type: string;
  numberOfTrades?: number;
  status: string;
  title: string;
  createdAt: string;
  category: string;
  picture: string;
  member: {
    id: number;
    displayName: string;
    profileUrl: string;
  };
};
interface ShellProps {
  shell: ShellType;
}
export default Shell;
