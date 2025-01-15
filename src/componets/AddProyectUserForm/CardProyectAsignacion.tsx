import { Avatar, Box, Button, Card, Divider, Grid } from '@mui/material'
import React from 'react'
import List from '@mui/material/List';
import CardHeader from '@mui/material/CardHeader';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import './style.scss'
import { useCardProyectAsignacion } from './useCardProyectAsignacion';

export interface CardProyectAsignacionProps {
    alt: string
    foto: string
    idProyecto: number
    darkMode: boolean
    enAccion: (proyectoId: number, left: any, right: any) => void
    izquierda: any[]
    derecha: any[]
}

const CardProyectAsignacion: React.FC<CardProyectAsignacionProps> = (props: CardProyectAsignacionProps) => {
    
    const {
        handleToggleAll,
        numberOfChecked,
        handleToggle,
        checked,
        left,
        handleCheckedRight,
        leftChecked,
        right,
        handleCheckedLeft,
        rightChecked
    } = useCardProyectAsignacion(props);

    const customList = (title: React.ReactNode, items: readonly any[]) => (
        <Card style={props?.darkMode ? { border: 'solid 2px #cfcfcf', boxShadow: '-6px 11px 30px -8px rgba(0,0,0,0.75)', scrollbarColor: '#c2c7ce', width: '100%' } : { border: 'solid 2px #cfcfcf', boxShadow: '-1px 6px 15px -8px rgba(0,0,0,0.75)', scrollbarColor: '#c2c7ce', width: '100%' }}>
            <CardHeader
                sx={{ px: 2, py: 1 }}
                style={props?.darkMode ? { color: 'white' } : {}}
                avatar={
                    <Checkbox
                        onClick={handleToggleAll(items)}
                        checked={numberOfChecked(items) === items.length && items.length !== 0}
                        indeterminate={
                            numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0
                        }
                        disabled={items.length === 0}
                        inputProps={{
                            'aria-label': 'all items selected',
                        }}
                    />
                }
                title={title}
                subheader={(<p style={props?.darkMode ? { color: 'white' } : {}}>{`${numberOfChecked(items)}/${items.length}`}</p>)}
            />
            <Divider />
            <List
                sx={{
                    width: 200,
                    height: 230,
                    overflow: 'auto',
                }}
                dense
                component="div"
                role="list"
            >
                {items.map((value: any, key: number) => {
                    const labelId = `transfer-list-all-item-${key}-label`;
                    return (
                        <ListItemButton
                            key={key}
                            role="listitem"
                            onClick={handleToggle(value)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} style={props?.darkMode ? { color: 'white' } : {}} primary={`${value?.usuario}`} />
                        </ListItemButton>
                    );
                })}
            </List>
        </Card>
    );

    return (
        <Box p={2} textAlign={'center'} display="flex" >
            <Card style={{ width: '100%', textAlign: 'center', boxShadow: '1px 5px 7px -1px rgba(0,0,0,0.50)', padding: '10px',border: 'solid 2px #cfcfcf', }}>
                <Avatar
                    alt={props?.alt || ''}
                    src={props?.foto}
                    sx={{ width: 80, height: 80 }}
                    variant="rounded"
                    style={{ ...{ boxShadow: '-6px 11px 30px -8px rgba(0,0,0,0.75)', position: 'relative', bottom: '30px', padding: '5px', marginLeft: '12px' }, ...{ background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))' } }}
                />
                <Grid container spacing={2} style={{ position: 'relative', bottom: '70px' }}>
                    <Grid item xs={12} >
                        <h5 style={{ ...{ color: props?.darkMode ? '#fff' : '', fontWeight: 'bold', fontSize: '15px' } }}>{props?.alt}</h5>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item>{customList('Usuarios disponibles', left)}</Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="center">
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedRight}
                                disabled={leftChecked.length === 0}
                                aria-label="move selected right"
                                style={props?.darkMode ? { color: 'white', border: 'solid 1px grey' } : {}}
                            >
                                &gt;
                            </Button>
                            <Button
                                sx={{ my: 0.5 }}
                                variant="outlined"
                                size="small"
                                onClick={handleCheckedLeft}
                                disabled={rightChecked.length === 0}
                                aria-label="move selected left"
                                style={props?.darkMode ? { color: 'white', border: 'solid 1px grey' } : {}}
                            >
                                &lt;
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>{customList('Usuarios asignados', right)}</Grid>
                </Grid>
                <Divider />
                <Grid container spacing={2}>
                    <Grid item xs={6} >
                        <p style={{ ...{ color: props?.darkMode ? '#fff' : '', fontSize: '14px' } }}>{`Usuarios asignados (${right?.length})`}</p>
                    </Grid>
                </Grid>
            </Card>
        </Box>

    )
}

export default CardProyectAsignacion
