import { useEffect, useState } from "react";
import { Component } from "../types/sortingcomponent";
import { restart } from "../main";

/**
 * Selection sort algorithm
 *
 * @param {{ arr: any; setArr: any; frames: any; setFrames: any; setIntervalID: any; intervalID: any; }} {
    arr,
    setArr,
    frames,
    setFrames,
    setIntervalID,
    intervalID,
}
 * @returns {*}
 */
let SelectionSort: Component = ({
    arr,
    setArr,
    frames,
    setFrames,
    setIntervalID,
    intervalID,
}) => {
    // i is the index of the first element in the unsorted array
    let [i, setI] = useState<number>(0);
    // j is the index of the element being compared
    let [j, setJ] = useState<number>(0);
    // min is the index of the minimum element
    let [min, setMin] = useState<number>(0);
    // prevFrame is the number of frames that have passed, so we can process multiple at once
    let [prevFrame, setPrevFrame] = useState<number>(0);

    useEffect(() => {
        // if the frames are 0, reset the values (so that a reset can be called outside of this component)
        if (frames === 0) {
            setI(0);
            setJ(0);
            setMin(0);
            setPrevFrame(0);
            return;
        }

        // temporary values so that we don't change the actual values until the end
        let tempArr = [...arr],
            jj = j,
            ii = i,
            minn = min;

        // for every frame
        for (let k = prevFrame; k < frames; k++) {
            if (ii < tempArr.length - 1) {
                // if we are not at the end of the array
                if (jj < tempArr.length) {
                    // if the current element is less than the minimum element, set the minimum element to the current element
                    if (tempArr[jj].value < tempArr[minn].value) {
                        minn = jj;
                    }
                    jj++;
                } else {
                    // if we are at the end of the array, swap the minimum element with the first element in the unsorted array
                    let temp = tempArr[ii];
                    tempArr[ii] = tempArr[minn];
                    tempArr[minn] = temp;
                    ii++;
                    jj = ii;
                    minn = ii;
                }
            } else {
                // we are done!
                restart(setFrames, intervalID, setIntervalID);
            }
        }
        // set the values + deselect all selected elements so we can select the new ones
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
