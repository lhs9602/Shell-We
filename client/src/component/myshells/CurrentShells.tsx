import { useParams } from 'react-router';
import { useCurrentShells } from '../../hooks/myshells/useCurrentShells';
import MyShellsList from '../myshellspage-myshellslist/MyShellsList';
import { MyShellTabProps } from '../../dataset/TypeOfMyShells';

const CurrentShells = ({ selectedTab }: MyShellTabProps) => {
  const { id } = useParams<{ id: string }>();
  const memberId = id !== undefined ? +id : 0;
  const { data } = useCurrentShells(memberId);
  return <MyShellsList data={data} selectedTab={selectedTab} />;
};

export default CurrentShells;
