import React from "react";
import { Button } from "react-bootstrap";
import "./index.scss";
import type { DragAndDropFieldProps } from "./types";
import { useDragAndDropField } from "./useDragAndDropField";
import { useIntl } from "react-intl";
import TablaDocumentos from "../../componets/TablaDocumentos/TablaDocumentos";
import { Backdrop, CircularProgress, Divider, Grid } from "@mui/material";

const DragAndDropField: React.FC<DragAndDropFieldProps> = (props: DragAndDropFieldProps) => {
  const intl = useIntl();
  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    files,
    setFiles,
    thumbs,
    darkMode,
    procesando
  } = useDragAndDropField(props);

  return (
    <section className="container">
      <div className={darkMode ? 'drag-zone-dark drag-zone' : "drag-zone"} {...getRootProps()}>
        <input {...getInputProps()} />
        <p>{props?.multiple ? intl.formatMessage({ id: 'drag_and_drop_component_titulo_1' }) : intl.formatMessage({ id: 'drag_and_drop_component_titulo_2' })}</p>
      </div>
      {props?.muestraBoton && !props?.resultadosTabla ? <div style={{ float: "right", position: "relative", top: "10px" }}>
        <Button
          variant="primary"
          size="sm"
          disabled={!acceptedFiles?.length}
          onClick={() => {
            props?.onAction && props?.onAction(files);
          }}
        >
          Agregar elemento{acceptedFiles?.length > 1 ? "(s)" : ""}
        </Button>
      </div> : null}
      {!props?.resultadosTabla ? <aside>
        <br></br>
        <h5 style={darkMode ? { color: 'white' } : { color: 'rgb(68, 94, 150)' }}>Archivo{files?.length > 1 ? "s" : ""}  </h5>
        <div>{thumbs}</div>
      </aside> : null}
      <Divider></Divider>
      {props?.resultadosTabla && !procesando ?

        <TablaDocumentos
          enGuardar={(dta) => {
            const nuevo = dta.map((r: any) => {
              const archivo: any = files.find((e: any) => e?.path === r?.path);
              return {
                ...r,
                file: archivo?.File || null
              }
            });
            props?.onAction && props?.onAction(nuevo);
            setFiles([])
          }}
          initialData={files?.map((r: any) => {
            return {
              path: r?.path,
              importe: r?.importe || 0,
              nombre: r?.path,
              descripcion: r?.descripcion || 'Ingrese una descripción del documento',
              flex: 1,
              moneda: r?.moneda,
              motivo_valido: r?.motivo_valido,
              documento_valido: r?.valido
            }
          })} /> : null

      }

      <Backdrop className='BackdropClass' open={procesando}>
        <div style={{ width: '100%', textAlign: 'center',zIndex:999 }}>
          <Grid item xs={12}>
            <CircularProgress color="inherit" />
          </Grid>
        </div>
      </Backdrop>
    </section>
  );
};

export default DragAndDropField;

