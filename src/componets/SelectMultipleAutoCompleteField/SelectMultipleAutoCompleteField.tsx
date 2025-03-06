import React from "react";
import type { SelectMultipleAutoCompleteFieldProps } from "./types";
import Form from 'react-bootstrap/Form';

import "./style.scss";
import { Button, ButtonGroup, InputGroup } from 'react-bootstrap';
import CheckIcon from '@mui/icons-material/Check';
import _ from "lodash";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AddIcon from '@mui/icons-material/Add';
import { Theme } from '@mui/material/styles';
import { Box, Chip, FormControl, Grid, IconButton, MenuItem, OutlinedInput, /* Select */ } from "@mui/material";
import useSelectMultipleAutoCompleteField from './useSelectMultipleAutoCompleteField'
import Select, { MultiValue, components, GroupBase, OptionProps, DropdownIndicatorProps, ControlProps } from 'react-select';
import makeAnimated from 'react-select/animated';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RefreshIcon from '@mui/icons-material/Refresh';

export const colourOptions: readonly any[] = [
    { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
    { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
    { value: 'purple', label: 'Purple', color: '#5243AA' },
    { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
    { value: 'orange', label: 'Orange', color: '#FF8B00' },
    { value: 'yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'green', label: 'Green', color: '#36B37E' },
    { value: 'forest', label: 'Forest', color: '#00875A' },
    { value: 'slate', label: 'Slate', color: '#253858' },
    { value: 'silver', label: 'Silver', color: '#666666' },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name: any, personName: readonly any[], theme: Theme) {
    return {
        fontWeight:
            personName.find((a) => a?.value === name?.value)
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}


const animatedComponents = makeAnimated();

const SelectMultipleAutoCompleteField: React.FC<SelectMultipleAutoCompleteFieldProps> = (props: SelectMultipleAutoCompleteFieldProps) => {

    const {
        showFeedback,
        isValid,
        handleFocus,
        field,
        errorMessage,
        formik,
        darkMode,
        esError,
        btnPlus,
        btnActualiza,
        newPros,
        theme,
        isTouched
    } = useSelectMultipleAutoCompleteField(props);

    const DropdownIndicator = (
        propss: DropdownIndicatorProps<any, true>
    ) => {
        return (
            <components.DropdownIndicator {...propss}>
                {
                    btnPlus ? <IconButton onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        props?.onAdd && props?.onAdd()
                    }} style={{ padding: 1 }} aria-label={''} size="small"><AddIcon color="info" /></IconButton> : null
                }
                {
                    btnActualiza ? <IconButton onMouseDown={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        props?.onRefresh && props?.onRefresh()
                    }} style={{ padding: 1 }} aria-label={''} size="small"><RefreshIcon color="info" /></IconButton> : null
                }

                {
                    errorMessage !== '' && typeof (props?.defaultValue) === 'undefined' && showFeedback ? <IconButton style={{ padding: 1 }} aria-label={''} size="small"><ErrorOutlineIcon color="error" /></IconButton> : null
                }
                {
                    errorMessage === '' && typeof (props?.defaultValue) === 'undefined' && !showFeedback ? <IconButton style={{ padding: 1 }} aria-label={''} size="small"><KeyboardArrowDownIcon color="info" /></IconButton> : null
                }
                {
                    errorMessage !== '' && typeof (props?.defaultValue) === 'undefined' && !showFeedback ? <IconButton style={{ padding: 1 }} aria-label={''} size="small"><KeyboardArrowDownIcon color="info" /></IconButton> : null
                }
                {
                    errorMessage === '' && typeof (props?.defaultValue) !== 'undefined' ? <IconButton style={{ padding: 1 }} aria-label={''} size="small"><CheckIcon color="info" /></IconButton> : null
                }
            </components.DropdownIndicator>
        );
    };

    const MAX_VISIBLE = 2;
    const MultiValueContainer = (props: any) => {
        const { selectProps, children, data } = props;
        const selectedOptions: MultiValue<any> = selectProps.value;
        const index = selectedOptions.findIndex((option) => option.value === data.value);
        if (index < MAX_VISIBLE) {
            return <components.MultiValueContainer {...props}>{children}</components.MultiValueContainer>;
        }
        return null;
    };

    const CustomMultiValue = (props: any) => {
        const { selectProps, index } = props;
        const selectedOptions: MultiValue<any> = selectProps.value;
        if (index < MAX_VISIBLE) {
            return <components.MultiValue {...props} />;
        }
        if (index === MAX_VISIBLE) {
            return (
                <div style={{ padding: '2px 8px', backgroundColor: '#e0e0e0', borderRadius: '4px', marginLeft: '4px' }}>
                    +{selectedOptions.length - MAX_VISIBLE} más
                </div>
            );
        }

        return null;
    };

    return (
        <div
            style={{ width: '100%' }}
            className={`${showFeedback ? isValid : ""}`}
        >
            <FormControl sx={{ width: '100%' }} style={{ width: '100%' }} variant="filled" size="small">
                {props?.label && <Form.Label style={darkMode ? { color: 'white', fontSize: 14 } : { fontSize: 14 }}>{props?.label}</Form.Label>}
                <InputGroup className="mb-3" style={errorMessage !== '' && typeof (props?.defaultValue) === 'undefined' && showFeedback ?
                    { border: 'solid 1px red', borderRadius: '8px', width: '100%' } : errorMessage === '' && typeof (props?.defaultValue) !== 'undefined' ? { border: 'solid 1px #01db01', borderRadius: '8px', width: '100%' } : { borderRadius: '8px', width: '100%' }}>
                    <Grid container  >
                        <Grid item xs={12} md={12}>
                            {!props?.EsMultiple ? <Select<any, true, GroupBase<any>>
                                onFocus={handleFocus}
                                key={props?.id}
                                closeMenuOnSelect={false}
                                formatGroupLabel={(data) => `${data.label} (${data.options.length})`}
                                isMulti
                                styles={{
                                    option: (base) => ({
                                        ...base,
                                        zIndex: 999,
                                        border: `1px dotted ${colourOptions[2].color}`,
                                        height: '80%',
                                        fontSize: 12,
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        minHeight: "30px", // Reduce la altura del select
                                        height: "30px",
                                        fontSize: "14px", // Reduce el tamaño del texto
                                      }),
                                      valueContainer: (provided) => ({
                                        ...provided,
                                        height: "30px",
                                        padding: "0 6px",
                                      }),
                                      input: (provided) => ({
                                        ...provided,
                                        margin: "0px",
                                      }),
                                      indicatorsContainer: (provided) => ({
                                        ...provided,
                                        height: "30px",
                                      }),
                                }}
                                placeholder={props?.placeholder}
                                {...newPros}
                                {...field}
                                components={{
                                    MultiValueContainer,
                                    MultiValue: CustomMultiValue,
                                    DropdownIndicator
                                }}
                                //onBlur={() => alert()}
                                onChange={(e) => {
                                    props?.onInput && props?.onInput(e);
                                }}
                            /> : null}
                            {props?.EsMultiple ? <Select<any, true, GroupBase<any>>
                                onFocus={handleFocus}
                                key={props?.id}
                                placeholder={props?.placeholder}
                                styles={{
                                    option: (base) => ({
                                        ...base,
                                        zIndex: 999,
                                        border: `1px dotted ${colourOptions[2].color}`,
                                        height: '80%',
                                        fontSize: 12,
                                    }),
                                    control: (provided) => ({
                                        ...provided,
                                        minHeight: "30px", // Reduce la altura del select
                                        height: "30px",
                                        fontSize: "14px", // Reduce el tamaño del texto
                                      }),
                                      valueContainer: (provided) => ({
                                        ...provided,
                                        height: "30px",
                                        padding: "0 6px",
                                      }),
                                      input: (provided) => ({
                                        ...provided,
                                        margin: "0px",
                                      }),
                                      indicatorsContainer: (provided) => ({
                                        ...provided,
                                        height: "30px",
                                      }),
                                }}
                                className="form-control"
                                closeMenuOnSelect={false}
                                formatGroupLabel={(data) => `${data.label} (${data.options.length})`}
                                {...newPros}
                                {...field}
                                components={{
                                    DropdownIndicator
                                }}
                                onChange={(e) => {
                                    props?.onInput && props?.onInput(e);
                                }}
                            /> : null}
                        </Grid>
                    </Grid>
                </InputGroup>
            </FormControl>
            <div className="flex items-center space-between">
                {showFeedback ? (
                    <div
                        id={`${props.id}-feedback`}
                        aria-live="polite"
                        className="feedback text-sm"
                        style={{ textAlign: "left", paddingLeft: "5px", color: "red", fontWeight: 'normal', fontSize: '12px' }}
                    >
                        {errorMessage}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default SelectMultipleAutoCompleteField;