import { useNavigate, useParams } from 'react-router';
import {
  MyShellContainer,
  ImgBox,
  Title,
  ShellInfo,
  Category,
  DeleteLikeButton,
  DeleteLikeText,
} from './MyShells.styled.ts';
import { Shells } from '../../dataset/TypeOfMyShells.ts';
import { useDeleteLikeShell } from '../../hooks/myshells/useDeleteLikeShell.ts';
import { getMemberIdFromLocalStorage } from '../../utill/localstorageData.ts';

const MyShells = ({
  shell,
  selectedTab,
}: {
  shell: Shells;
  selectedTab: string;
}) => {
  const { id } = useParams<{ id: string }>();
  const myMemberId = Number(getMemberIdFromLocalStorage());
  const urlId = id !== undefined ? +id : 0;

  const { mutate: DeleteLikeShell } = useDeleteLikeShell(shell.id);
  const navigate = useNavigate();
  const goToShellDetail = () => {
    navigate(`/shelldetail/${shell.id}`);
  };

  const handleDeleteLikeShell = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    DeleteLikeShell();
  };

  return (
    <MyShellContainer onClick={goToShellDetail}>
      <ShellInfo>
        <ImgBox src={shell.picture} alt="shell-image" />
        <div>
          <Title>{shell.title}</Title>
          <Category>{shell.category.slice(2).toUpperCase()}</Category>
        </div>
      </ShellInfo>
      {myMemberId === urlId && selectedTab === 'like' && (
        <div>
          <DeleteLikeButton onClick={handleDeleteLikeShell}>
            <DeleteLikeText>Cancel Like</DeleteLikeText>
          </DeleteLikeButton>
        </div>
      )}
    </MyShellContainer>
  );
};

export default MyShells;
