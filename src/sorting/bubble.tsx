import { useEffect, useState } from "react";
import { Component } from "../types/sortingcomponent";
import { restart } from "../main";

/**
 * Bubble sort algorithm
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
let BubbleSort: Component = ({
    arr,
    setArr,
    frames,
    setFrames,
    setIntervalID,
    intervalID,
}) => {
    // i is the number of elements that have been sorted
    let [i, setI] = useState<number>(0);
    // j is the index of the element being compared
    let [j, setJ] = useState<number>(0);
    // prevFrame is the number of frames that have passed, so we can process multiple at once
    let [prevFrame, setPrevFrame] = useState<number>(0);

    useEffect(() => {
        // if the frames are 0, reset the values (so that a reset can be called outside of this component)
        if (frames === 0) {
            setI(0);
            setJ(0);
            setPrevFrame(0);
            return;
        }

        // temporary values so that we don't change the actual values until the end
        let tempArr = [...arr],
            jj = j,
            ii = i;
        // for every frame
        for (let k = prevFrame; k < frames; k++) {
            if (ii < tempArr.length - 1) {
                // if the current element is greater than the next element, swap them
                if (jj < tempArr.length - i - 1) {
                    if (tempArr[jj].value > tempArr[jj + 1].value) {
                        let temp = tempArr[jj];
                        tempArr[jj] = tempArr[jj + 1];
                        tempArr[jj + 1] = temp;
                    }
                    jj++;
                } else {
                    // if we are at the end of the array, reset jj and increment ii
                    jj = 0;
                    ii++;
                }
            } else {
                // if we are done, reset the values and stop the interval
                restart(setFrames, intervalID, setIntervalID);
            }
        }
        // set the appropriate values after all frames have been processed
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
