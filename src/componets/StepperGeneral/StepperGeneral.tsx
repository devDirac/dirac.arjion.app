import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import type { StepperGeneralProps } from './types';
import { Card, Grid } from '@mui/material';
import useStepperGeneral from './useStepperGeneral';
import './style.scss';
const StepperGeneral: React.FC<StepperGeneralProps> = (props: StepperGeneralProps) => {

    const {
        handleReset,
        handleBack,
        handleNext
    } = useStepperGeneral(props);

    const [key, setKey] = useState(0); // Clave para forzar un re-render

    // Usar useEffect para detectar cambios en el contenido
    useEffect(() => {
        // Cada vez que el contenido cambie, cambiamos la key para forzar el re-render
        setKey(prevKey => prevKey + 1);
    }, [props?.children, props?.activeStep]);  // Observa cambios en los documentos o el paso activo

    const stepperRef = useRef(null);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            // Aquí podrías agregar lógica para ajustar el contenedor si es necesario
            
        });

        if (stepperRef.current) {
            observer.observe(stepperRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);


    return (
        <Box sx={{ width: '100%' }} key={key} ref={stepperRef}>
            <Stepper activeStep={props?.activeStep} alternativeLabel>
                {props?.steps.map((label, index) => {
                    return (
                        <Step key={label?.name}>
                            <StepLabel >{label?.name}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {props?.activeStep === props?.steps.length ? (
                <React.Fragment>
                    <Typography style={{ ...{ textAlign: 'center', border: '2px solid lightgrey', padding: '14px', borderTop: 'none', borderRadius: '3px' }, ...{ color: props?.darkMode ? '#FFF' : '' } }}>
                        {props?.textStepsCompleted}
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Finalizar</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Grid container style={props?.darkMode ? { flexGrow: 1, overflowY: 'auto', height: 'auto', backgroundColor: '#1f283e', borderLeft: '2px solid lightgrey', borderRight: '2px solid lightgrey', borderBottom: '0px solid lightgrey', padding: '14px', borderTop: 'none', borderRadius: '3px' } : {
                        backgroundColor: '#fff', borderLeft: '2px solid lightgrey', borderRight: '2px solid lightgrey', borderBottom: '0px solid lightgrey', padding: '14px', borderTop: 'none', borderRadius: '3px', flexGrow: 1,
                        overflowY: 'auto',

                        height: 'auto',
                    }} >
                        <Grid item xs={12} md={12} >
                            {props?.children}
                        </Grid>
                    </Grid>

                    <Box style={props?.darkMode ? { backgroundColor: '#1f283e' } : { backgroundColor: '#fff' }} sx={{ display: 'flex', flexDirection: 'row', pt: 2, borderLeft: '2px solid lightgrey', borderRight: '2px solid lightgrey', borderBottom: '2px solid lightgrey', padding: '14px', borderTop: 'none', borderRadius: '3px' }}>
                        <Button
                            color="inherit"
                            disabled={props?.activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                            style={props?.darkMode ? { color: '#fff' } : {}}
                        >
                            Atras
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext} disabled={props?.isDisabledNext} style={props?.darkMode ? { color: '#fff' } : {}}>
                            {props?.activeStep === props?.steps.length - 1 ? 'Finalizar' : 'Siguiente'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    )
}

export default StepperGeneral
