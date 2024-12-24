import React from "react";
import Modal from "../Modal";
// import { create, InstanceProps } from "react-modal-promise";
import cn from "classnames";
import css from "./RatingModal.module.css";
import { RatingContent } from "elements/Rating/RatingContent";

// TODO: extends InstanceProps<any>
interface RatingModalProps {
  isOpen: boolean;
  onResolve: () => void;
}

export const RatingModal = ({
  isOpen: visible,
  onResolve: close,
}: RatingModalProps) => {
  const isDesktop = false;

  const closeModal = () => {
    close();
  };

  const renderOverlay = (
    _props: React.ComponentPropsWithRef<"div">,
    contentEl: React.ReactElement
  ) => {
    return (
      <div className={css.overlay} onClick={closeModal}>
        <div className={css.overlayIn}>{contentEl}</div>
      </div>
    );
  };

  const renderContent = (
    _: React.ComponentPropsWithRef<"div">,
    children: React.ReactNode
  ) => {
    return (
      <div
        className={cn(
          css.content,
          isDesktop ? css.contentDesktop : css.contentMobile
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    );
  };

  return (
    <Modal
      isOpen={visible}
      onRequestClose={closeModal}
      overlayElement={renderOverlay}
      contentElement={renderContent}
    >
      <RatingContent />
    </Modal>
  );
};

// export const createRatingModal = create(RatingModal, {
//   enterTimeout: 0,
//   exitTimeout: 0,
// });
