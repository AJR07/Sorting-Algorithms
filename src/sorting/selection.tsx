import { useEffect, useState } from "react";
import { Component } from "../types/sortingcomponent";
import { restart } from "../main";

let SelectionSort: Component = ({
    arr,
    setArr,
    frames,
    setFrames,
    setIntervalID,
    intervalID,
}) => {
    let [i, setI] = useState<number>(0);
    let [j, setJ] = useState<number>(0);
    let [min, setMin] = useState<number>(0);
    let [prevFrame, setPrevFrame] = useState<number>(0);

    useEffect(() => {
        if (frames === 0) {
            setI(0);
            setJ(0);
            setMin(0);
            setPrevFrame(0);
            return;
        }

        let tempArr = [...arr],
            jj = j,
            ii = i,
            minn = min;
        for (let k = prevFrame; k < frames; k++) {
            if (ii < tempArr.length - 1) {
                if (jj < tempArr.length) {
                    if (tempArr[jj].value < tempArr[minn].value) {
                        minn = jj;
                    }
                    jj++;
                } else {
                    let temp = tempArr[ii];
                    tempArr[ii] = tempArr[minn];
                    tempArr[minn] = temp;
                    ii++;
                    jj = ii;
                    minn = ii;
                }
            } else {
                restart(setFrames, intervalID, setIntervalID);
            }
        }
        for (let l = 0; l < tempArr.length; l++) tempArr[l].selected = false;
        if (jj < tempArr.length) tempArr[jj].selected = true;
        tempArr[minn].selected = true;
        setArr(tempArr);
        setPrevFrame(frames);
        setI(ii);
        setJ(jj);
        setMin(minn);
    }, [frames]);
    return <></>;
};

export default SelectionSort;
