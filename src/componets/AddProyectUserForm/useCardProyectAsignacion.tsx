import React from 'react'
import _ from 'lodash'
import type { CardProyectAsignacionProps } from './CardProyectAsignacion';


function not(a: readonly any[], b: readonly any[]) {
    let res:any = [];
    res = a.filter(el => {
        return !b.find(element => {
            return element.id === el.id;
        });
    });
    return res;
}

function intersection(a: readonly any[], b: readonly any[]) {
    return _.intersection(
        a, b);
}

function union(a: readonly any[], b: readonly any[]) {
    return [...a, ...not(b, a)];
}

export const useCardProyectAsignacion = (props: CardProyectAsignacionProps) => {

    const [checked, setChecked] = React.useState<readonly any[]>([]);
    const [left, setLeft] = React.useState<readonly any[]>(not(props?.izquierda, props?.derecha.map((e: any) => { return { id: e?.id, usuario: e?.usuario } })));
    const [right, setRight] = React.useState<readonly any[]>(props?.derecha);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = (items: readonly number[]) => intersection(checked, items).length;

    const handleToggleAll = (items: readonly number[]) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        const rightItem = right.concat(leftChecked);
        const leftItems = not(left, leftChecked);
        setRight(rightItem);
        setLeft(leftItems);
        setChecked(not(checked, leftChecked));
        props?.enAccion(props?.idProyecto, leftItems, rightItem);
    };

    const handleCheckedLeft = () => {
        const leftItems = left.concat(rightChecked);
        const rightItem = not(right, rightChecked);
        setLeft(leftItems);
        setRight(rightItem);
        setChecked(not(checked, rightChecked));
        props?.enAccion(props?.idProyecto, leftItems, rightItem);
    };

    return {
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
    }
}