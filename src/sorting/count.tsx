import { useEffect, useState } from "react";
import { Component } from "../types/sortingcomponent";
import { restart } from "../main";

let CountSort: Component = ({
    arr,
    setArr,
    frames,
    setFrames,
    setIntervalID,
    intervalID,
}) => {
    let [sortedArr, setSortedArr] = useState<number[]>([]);
    let [freq, setFreq] = useState<{ [id: number]: number }>({});
    let [prevFrame, setPrevFrame] = useState<number>(0);

    useEffect(() => {
        if (frames === 0) {
            setSortedArr([]);
            setPrevFrame(0);
            setFreq({});
        } else {
            let tempFreq = { ...freq };
            let tempArr = [...arr];
            let tempSortedArray = [...sortedArr];
            for (let k = prevFrame; k < frames; k++) {
                if (k < arr.length) {
                    if (tempFreq[tempArr[k].value])
                        tempFreq[tempArr[k].value]++;
                    else tempFreq[tempArr[k].value] = 1;
                    tempArr[k].selected = true;
                } else if (k == arr.length) {
                    for (let i = 0; i < tempArr.length; i++)
                        tempArr[i].selected = false;
                    for (let id of Object.keys(tempFreq)) {
                        for (let i = 0; i < tempFreq[parseInt(id)]; i++)
                            tempSortedArray.push(parseInt(id));
                    }
                } else if (k <= arr.length * 2) {
                    tempArr[k - arr.length - 1].value =
                        tempSortedArray[k - arr.length - 1];
                } else {
                    setArr(tempArr);
                    restart(setFrames, intervalID, setIntervalID);
                    return;
                }
            }
            setArr(tempArr);
            setFreq(tempFreq);
            setSortedArr(tempSortedArray);
            setPrevFrame(frames);
        }
    }, [frames]);

    return <></>;
};

export default CountSort;
