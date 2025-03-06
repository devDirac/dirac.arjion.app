import { useState } from "react";
import { useDropzone } from "react-dropzone";
import type { DragAndDropFieldProps } from "./types"
import { useMaterialUIController } from "context";
import { sleep } from "../../utils";
import { gacAddMediaHttp } from "../../actions/documentos";

export const useDragAndDropField = (props: DragAndDropFieldProps) => {

  const [controller] = useMaterialUIController();
  const [procesando,setProcesando] = useState(false);
  const [files, setFiles] = useState([]);

  const {
    darkMode
  } = controller;


  const handleAddDocumentos = async (files: any) => {
    try {
      const documentos: any = [];
      setProcesando(true)
      await files.reduce(async (_: any, cat: any) => {
        try {
          await _;
          
          const data1 = new FormData();
          data1.append("file", cat);
          const response = await gacAddMediaHttp(data1)
          const nuevoObjs = { moneda: response?.json?.moneda, motivo_valido: response?.json?.motivo_valido, valido: response?.json?.valido, importe: response?.json?.importe, descripcion:response?.json?.descripcion, File: cat, ...cat };
          documentos.push(nuevoObjs)
        } catch (error: any) {

        }
      }, Promise.resolve());
      setProcesando(false)
      setFiles(documentos);
      setTimeout(() => {
        !props?.muestraBoton && props?.onAction && props?.onAction(documentos);
      }, 1000);
    } catch (error) {

    }
  }


  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: props?.multiple,
    accept: props?.acepted ? props?.acepted : {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
      "application/pdf": [],
      "application/vnd.ms-excel": [],
      "audio/*": [],
      "video/*": [],
      ".doc": [],
      ".docx": [],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
    },
    onDrop: (acceptedFiles: any) => {

      if (!props?.resultadosTabla) {
        setFiles(
          acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ));
        setTimeout(() => {
          !props?.muestraBoton && props?.onAction && props?.onAction(acceptedFiles.map((file: any) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          ));

        }, 1000);
      }


      if (props?.resultadosTabla) {
        handleAddDocumentos(acceptedFiles);
      }




    },
  });

  const thumbs = files.map((file: any, a: number) => {
    return (
      <div key={a}>
        <h5 style={darkMode ? { color: 'white' } : { color: 'rgb(68, 94, 150)' }}>{file?.name}</h5>
      </div>
    )
  });

  return {
    getRootProps,
    getInputProps,
    acceptedFiles,
    files,
    setFiles,
    thumbs,
    darkMode,
    procesando
  }
}