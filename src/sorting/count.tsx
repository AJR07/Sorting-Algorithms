import { useEffect, useState } from "react";
import { Component } from "../types/sortingcomponent";
import { restart } from "../main";

/**
 * Count sort algorithm
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
let CountSort: Component = ({
    arr,
    setArr,
    frames,
    setFrames,
    setIntervalID,
    intervalID,
}) => {
    // sortedArr is the array that is sorted
    let [sortedArr, setSortedArr] = useState<number[]>([]);
    // freq is the frequency of each element in the array
    let [freq, setFreq] = useState<{ [id: number]: number }>({});
    // prevFrame is the number of frames that have passed, so we can process multiple at once
    let [prevFrame, setPrevFrame] = useState<number>(0);

    useEffect(() => {
        // if the frames are 0, reset the values (so that a reset can be called outside of this component)
        if (frames === 0) {
            setSortedArr([]);
            setPrevFrame(0);
            setFreq({});
            return;
        }

        // temporary values so that we don't change the actual values until the end
        let tempFreq = { ...freq },
            tempArr = [...arr],
            tempSortedArray = [...sortedArr];

        // for every frame
        for (let k = prevFrame; k < frames; k++) {
            // if we are in the first half of the frames, count the frequency of each element
            if (k < arr.length) {
                if (tempFreq[tempArr[k].value]) tempFreq[tempArr[k].value]++;
                else tempFreq[tempArr[k].value] = 1;
                // show that we have counted this element
                tempArr[k].selected = true;

                // for the next frame, figure out the sorted array
            } else if (k == arr.length) {
                // unselect all elements
                for (let i = 0; i < tempArr.length; i++)
                    tempArr[i].selected = false;

                // for every element in the frequency array, add it to the sorted array
                for (let id of Object.keys(tempFreq)) {
                    for (let i = 0; i < tempFreq[parseInt(id)]; i++)
                        tempSortedArray.push(parseInt(id));
                }
                // for the next half of the frames, set the value of each element in the array to the sorted array
            } else if (k <= arr.length * 2) {
                tempArr[k - arr.length - 1].value =
                    tempSortedArray[k - arr.length - 1];
            } else {
                // we are done!
                setArr(tempArr);
                restart(setFrames, intervalID, setIntervalID);
                return;
            }
        }

        // set the values at the end
        setArr(tempArr);
        setFreq(tempFreq);
        setSortedArr(tempSortedArray);
        setPrevFrame(frames);
    }, [frames]);

    return <></>;
};

export default CountSort;
