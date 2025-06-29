import clsx from "clsx";
import { Image } from "lucide-react";
import { FC, useState } from "react";
import ReactDOM from "react-dom";
import { CenterCardModal } from "../Modals";
export const ImageCard: FC<{
  imageUrl?: string;
  style: string;
  iconSize?: string;
  altText?: string;
  canClick?: boolean;
}> = ({ imageUrl, style, iconSize = "size-10", altText, canClick }) => {
  const [loadError, setLoadError] = useState(false);
  const [loadComplete, setLoadComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };
  return (
    <>
      {imageUrl !== undefined && imageUrl !== "" && !loadError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          onClick={() => setShowModal(true)}
          className={clsx(
            style,
            !loadComplete &&
              "animate-pulse bg-gray-100 place-content-center flex justify-center",
            canClick == true && "cursor-pointer hover:border-2 hover:shadow"
          )}
          src={imageUrl}
          loading="lazy"
          onLoad={() => setLoadComplete(true)}
          alt={altText}
          onError={() => setLoadError(true)}
        />
      ) : (
        <div
          className={clsx(
            style,
            "bg-gray-100 place-content-center flex justify-center"
          )}
        >
          <span
            className={clsx("items-center font-medium my-auto text-gray-600")}
          >
            <Image className={iconSize} />
          </span>
        </div>
      )}
      {ReactDOM.createPortal(
        <CenterCardModal
          closeControl={showModalHandler}
          openControl={showModal}
          size="dialog"
        >
          <img
            className={clsx(
              "object-fill rounded-md mb-2 size-96 items-center mx-auto",
              !loadComplete &&
                "animate-pulse bg-gray-100 place-content-center flex justify-center"
            )}
            src={imageUrl}
            loading="lazy"
            alt={altText}
          />
        </CenterCardModal>,
        document.getElementById("modal")!
      )}
    </>
  );
};
