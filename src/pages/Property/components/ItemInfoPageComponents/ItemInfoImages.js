import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  useLazyGetUploadUrlQuery,
  useUploadFileMutation,
} from "../../../../store";
import _ from "lodash";

const ItemInfoImages = ({ property, setProperty }) => {
  const [previewUrls, setPreviewUrls] = useState([]);
  const [fileUploadInfo, setFileUploadInfo] = useState([]);

  const [getUploadUrl] = useLazyGetUploadUrlQuery();
  const [uploadFile] = useUploadFileMutation();

  useEffect(() => {
    if (property && property.file && property.file.image_outside) {
      const existingUrls = property.file.image_outside.map(
        (image) => image.url
      );
      setPreviewUrls(existingUrls);
    }
    console.log("Updated property:", property?.file, property);
  }, [property]);

  const onDrop = (acceptedFiles) => {
    const newPreviewUrls = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls((prevUrls) => [...prevUrls, ...newPreviewUrls]);

    acceptedFiles.forEach(async (file) => {
      const fileName = encodeURIComponent(file.name);
      const contentType = file.type;

      const { data } = await getUploadUrl({ fileName, contentType });

      if (data.success) {
        console.log("in Ondrop data :", data);
        if (data && data.contents.uploadUrl) {
          setFileUploadInfo((prevInfo) => [
            ...prevInfo,
            {
              file,
              uploadUrl: data.contents.uploadUrl,
              url: data.contents.url,
            },
          ]);
        }
      }
    });
  };

  const handleUpload = async () => {
    console.log("in handleUpload  fileUploadInfo:", fileUploadInfo);
    try {
      const newImageInfo = await Promise.all(
        fileUploadInfo.map(async ({ file, uploadUrl, url }) => {
          const response = await fetch(uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: file,
            mode: "cors",
          });

          if (!response.ok) {
            throw new Error("Upload failed");
          }
          console.log("response :", response);
          return {
            id: null,
            key: file.name,
            url: url,
            is_thumbnail: false,
          };
        })
      );
      console.log("newImageInfo:", newImageInfo);
      setProperty((prevProperty) => ({
        ...prevProperty,
        file: {
          ...prevProperty.file,
          image_outside: [...prevProperty.file.image_outside, ...newImageInfo],
        },
      }));
    } catch (error) {
      console.error("Upload error:", error);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  if (!property) {
    return null;
  }

  return (
    <div className="my-6">
      <div className="mb-2">
        <div className="text-blue-600 text-base font-bold mb-2">사진</div>
      </div>
      <div
        {...getRootProps()}
        className="border-dashed border-2 p-4 cursor-pointer"
      >
        <input {...getInputProps()} />
        <p>드래그 앤 드롭 또는 클릭하여 파일을 선택하세요</p>
      </div>
      {previewUrls.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-2">
            {previewUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Preview ${index}`}
                className="w-full h-auto"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleUpload}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            업로드
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemInfoImages;
