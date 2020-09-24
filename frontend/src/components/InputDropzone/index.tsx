import { useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import style from "./style.module.scss";
import { FiUpload } from "react-icons/fi";

const InputDropzone = ({ handleOnDrop }) => {
  const [selectedFileUrl, setSelectedFileUrl] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);

    setSelectedFileUrl(fileUrl);
    handleOnDrop(file);
  }, []);

  const { isDragActive, getInputProps, getRootProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={style.container}>
      <input type="file" {...getInputProps()} />
      {selectedFileUrl ? (
        <img src={selectedFileUrl} alt="Post Photo" />
      ) : isDragActive ? (
        <>
          <FiUpload />
          <span>Solte a imagem</span>
        </>
      ) : (
        <>
          <FiUpload />
          <span>Clique ou arraste imagem</span>
        </>
      )}
    </div>
  );
};

export default InputDropzone;
