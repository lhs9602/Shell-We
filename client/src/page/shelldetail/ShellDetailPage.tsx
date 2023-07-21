import { useState } from 'react';
import { useGetShellDetail } from '../../hooks/shelldetail/useShellsDetailId.ts';
import ShellImgPreview from '../../component/shellimgpreview/ShellImgPreview.tsx';
import ShellDetail from '../../component/shelldetail/ShellDetail.tsx';
import DetailPageSidebar from '../../component/DetailPageSidebar/DetailPageSidebar.tsx';
import OfferModal from '../../component/OfferModal/OfferModal.tsx';
import {
  DetailPageContainer,
  Div,
  Wrapper,
  ContentDiv,
  PreviewDiv,
} from './ShellDetailPage.styled';
import { ShellDetailDataProps } from '../../dataset/ShellDetailType.ts';

const ShellDetailPage = () => {
  const { data } = useGetShellDetail();
  const shellDetailData: ShellDetailDataProps = data.data;
  const shellMemberId: number = shellDetailData.member.id;

  const [modalVisible, setModalVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePoke = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <>
      {data && (
        <Wrapper>
          <DetailPageContainer>
            <ContentDiv>
              <PreviewDiv>
                {shellDetailData && (
                  <ShellImgPreview
                    clickedShellPictures={shellDetailData.pictures}
                  />
                )}
              </PreviewDiv>
              <Div>
                {shellDetailData && (
                  <ShellDetail
                    handlePoke={handlePoke}
                    handleOpenSidebar={handleOpenSidebar}
                    shellDetailData={shellDetailData}
                  />
                )}
                {sidebarOpen && (
                  <DetailPageSidebar shellStatus={shellDetailData.status} />
                )}
              </Div>
            </ContentDiv>
            {modalVisible && <OfferModal shellMemberId={shellMemberId} />}
          </DetailPageContainer>
        </Wrapper>
      )}
    </>
  );
};

export default ShellDetailPage;
