import { Grid } from '@mui/material';
import React, { useState } from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useMaterialUIController } from 'context';
import { FormikProvider, useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import InputField from '../InputField';
import DragAndDropField from '../DragAndDropField';

import * as Yup from "yup";
import { useIntl } from 'react-intl';
import _ from 'lodash';
import { AddDocumentosCalidadFormProps } from './types';



const AddDocumentosCalidadForm: React.FC<AddDocumentosCalidadFormProps> = (props: AddDocumentosCalidadFormProps) => {
  const [file, setFile] = useState<File[]>();
  const intl = useIntl();

  const saveImages = async (file_: any) => {
    setFile(file_?.[0]);
  };

  const [controller] = useMaterialUIController();
  const {
    darkMode
  } = controller;

  return (
    <Grid container >


      <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '20px' } : { backgroundColor: '#fff', padding: '20px' }}>
        <h3>Cargar documento</h3>
      </Grid>
      <Grid item xs={12} className='bordersContainers' style={darkMode ? { backgroundColor: '#1f283e', padding: '20px' } : { backgroundColor: '#fff', padding: '20px' }}>

        <Form.Group className="mb-3 " >

          <DragAndDropField multiple={false} muestraBoton={false} onAction={(files) => saveImages(files)} />
          <br />
          <Button
            variant="primary"
            disabled={props?.procesando || _.isEmpty(file)}
            onClick={() => {
              props?.enAccion({ file });
            }}
          >
            {intl.formatMessage({ id: 'general_guardar' })}
          </Button>
        </Form.Group>


      </Grid>


    </Grid>
  )
}

export default AddDocumentosCalidadForm
