import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";
import { audioHandle } from "../../../utils/global/audioUtils";

export default function FileDropPreview({
    title = 0,
    description = 0,
    setValue,
    setSongFileChosen,
    setAudioFront
}) {
  const [files, setFiles] = useState([]);
  const titleSplit = title.split(" ");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "audio/*": [] }, 
    multiple: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      audioHandle({ target: { files: acceptedFiles } }, setValue, setSongFileChosen, setAudioFront);
    },
  });

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <>
        <div className="text-xl text-center">{titleSplit.map((word, i) => 
            <span className={i < Math.ceil(titleSplit.length / 2) ? "text-white" : "text-green-500"}>{word} </span>
        )}</div>
        <div className="opacity-70 font-normal">{description}</div>
        <div className="flex flex-col items-center gap-4">
        <div {...getRootProps()} className={`w-full h-[400px] border-2 border-dashed rounded-xl flex items-center justify-center cursor-pointer transition-colors ${
            isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-400"
            }`}>
            <input {...getInputProps()}/>
            {isDragActive ? (
            <p className="text-blue-500">Stop holding file here ...</p>
            ) : (
            <p className="text-gray-500">Drag or click on here</p>
            )}
        </div>
        </div>
    </>
  );
}
