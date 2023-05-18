import { useEffect, useState } from "react";
import { Component } from "../types/sortingcomponent";
import { restart } from "../main";

let BubbleSort: Component = ({
    arr,
    setArr,
    frames,
    setFrames,
    setIntervalID,
    intervalID,
}) => {
    let [i, setI] = useState<number>(0);
    let [j, setJ] = useState<number>(0);
    let [prevFrame, setPrevFrame] = useState<number>(0);

    useEffect(() => {
        if (frames === 0) {
            setI(0);
            setJ(0);
            setPrevFrame(0);
        }

        let tempArr = [...arr],
            jj = j,
            ii = i;
        for (let k = prevFrame; k < frames; k++) {
            if (ii < tempArr.length - 1) {
                if (jj < tempArr.length - i - 1) {
                    if (tempArr[jj].value > tempArr[jj + 1].value) {
                        let temp = tempArr[jj];
                        tempArr[jj] = tempArr[jj + 1];
                        tempArr[jj + 1] = temp;
                    }
                    jj++;
                } else {
                    jj = 0;
                    ii++;
                }
            } else {
                restart(setFrames, intervalID, setIntervalID);
            }
        }
        for (let l = 0; l < tempArr.length; l++) tempArr[l].selected = false;
        tempArr[jj].selected = true;
        tempArr[jj + 1].selected = true;
        setArr(tempArr);
        setPrevFrame(frames);
        setI(ii);
        setJ(jj);
    }, [frames]);

    return <></>;
};

export default BubbleSort;
