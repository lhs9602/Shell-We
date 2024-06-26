import { useState } from 'react';
import ResponseShellList from '../../component/offeredshells/ResponseShellList';
import ShellImgPreview from '../../component/ShellImgPreview/ShellImgPreview';
import { ShellImgBox } from '../ShellImgPreview/ShellImgPreview.styled';
import {
  ShellImgPreviewWrapper,
  ResponseElementWrapper,
  PreviewNotice,
} from '../../page/offeredshells/OfferedShellsPage.styled';
import { Pictures } from '../../dataset/TypesOfferedShell';

const OfferedShell = ({
  clickedShellId,
  isPokedShellListOpen,
}: {
  clickedShellId: number;
  isPokedShellListOpen: boolean;
}) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [clickedShellPictures, setClickedShellPictures] = useState<Pictures[]>([
    {
      order: 0,
      url: '',
    },
  ]);

  const HandleShellPreview = (pictures: Pictures[]): void => {
    if (clickedShellPictures === pictures) {
      setPreviewVisible(!previewVisible);
    } else {
      setPreviewVisible(true);
      setClickedShellPictures(pictures);
    }
  };

  return (
    <ResponseElementWrapper
      ispokedshellopend={isPokedShellListOpen ? 'view' : 'noView'}
    >
      <ShellImgPreviewWrapper>
        {previewVisible === true ? (
          <ShellImgPreview clickedShellPictures={clickedShellPictures} />
        ) : (
          <PreviewNotice>
            <ShellImgBox>Click below Shell!</ShellImgBox>
          </PreviewNotice>
        )}
      </ShellImgPreviewWrapper>
      <ResponseShellList
        clickedShellId={clickedShellId}
        HandleShellPreview={HandleShellPreview}
      />
    </ResponseElementWrapper>
  );
};

export default OfferedShell;
