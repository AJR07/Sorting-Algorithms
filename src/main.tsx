import { Button, Stack } from "@mui/material";
import { useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import generateArray from "./utils/generatearray";
import Element from "./types/element";
import { Component } from "./types/sortingcomponent";
import BubbleSort from "./sorting/bubble";
import CountSort from "./sorting/count";

const SortingAlgorithms: {
    name: string;
    speed: number;
    component: Component;
}[] = [
    { name: "bubble sort", speed: 500, component: BubbleSort },
    { name: "count sort", speed: 10, component: CountSort },
];

export default function WordCloud() {
    let [frames, setFrames] = useState<number>(0);
    let [intervalID, setIntervalID] = useState<number | null>(null);
    let [arr, setArr] = useState<Element[]>(generateArray(0, 10000, 1000));
    let [chosenSortingAlgo, setChosenSortingAlgo] = useState<number>(0);
    const largestValue = Math.max(...arr.map((value) => value.value));
    const isSorted = arr.every((value, index) => {
        if (index === 0) return true;
        return value.value >= arr[index - 1].value;
    });
    const SortingComponent = SortingAlgorithms[chosenSortingAlgo].component;

    return (
        <div>
            <h1 className="center">Sorting Visualiser</h1>
            <h3 className="center">by AJR07</h3>
            <SortingComponent
                arr={arr}
                setArr={setArr}
                frames={frames}
                intervalID={intervalID}
                setIntervalID={setIntervalID}
                setFrames={setFrames}
            />

            <Stack>
                <p style={{ marginLeft: "1%" }}>Frame Number: {frames}</p>

                <Stack direction="row">
                    {arr.map((value, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    marginTop: `${
                                        (value.value / largestValue) * 80
                                    }vh`,
                                    height: `${
                                        ((largestValue - value.value) /
                                            largestValue) *
                                        80
                                    }vh`,
                                    width: `${100 / arr.length}%`,
                                    backgroundColor: value.selected
                                        ? "red"
                                        : isSorted
                                        ? "green"
                                        : "white",
                                    display: "inline-block",
                                }}
                            ></div>
                        );
                    })}
                </Stack>

                <Stack style={{ margin: "1vw" }} spacing={3}>
                    <Stack direction="row" spacing={3}>
                        <h3>Choose The Algorithm:</h3>
                        {SortingAlgorithms.map((value, index) => {
                            return (
                                <Button
                                    key={index}
                                    variant="contained"
                                    color={
                                        chosenSortingAlgo === index
                                            ? "secondary"
                                            : "primary"
                                    }
                                    onClick={() => {
                                        setArr(generateArray(0, 10000, 1000));
                                        setChosenSortingAlgo(index);
                                        restart(
                                            setFrames,
                                            intervalID,
                                            setIntervalID
                                        );
                                    }}
                                    style={{
                                        width: `${
                                            100 / SortingAlgorithms.length
                                        }%`,
                                        fontWeight:
                                            chosenSortingAlgo === index
                                                ? "bold"
                                                : "normal",
                                    }}
                                >
                                    {value.name}
                                </Button>
                            );
                        })}
                    </Stack>
                    <Button
                        fullWidth
                        variant="contained"
                        color={intervalID === null ? "success" : "error"}
                        startIcon={
                            intervalID === null ? (
                                <PlayCircleIcon />
                            ) : (
                                <StopCircleIcon />
                            )
                        }
                        onClick={() => {
                            if (!intervalID) {
                                setIntervalID(
                                    setInterval(() => {
                                        setFrames(
                                            (f) =>
                                                f +
                                                Math.max(
                                                    1,
                                                    SortingAlgorithms[
                                                        chosenSortingAlgo
                                                    ].speed
                                                )
                                        );
                                    }, Math.max(1, 1 / SortingAlgorithms[chosenSortingAlgo].speed))
                                );
                            } else {
                                clearInterval(intervalID);
                                setIntervalID(null);
                            }
                        }}
                    >
                        {intervalID === null ? "Play" : "Stop"}
                    </Button>

                    <Button
                        fullWidth
                        variant="contained"
                        color="warning"
                        disabled={intervalID !== null}
                        onClick={() => {
                            setArr(generateArray(0, 10000, 1000));
                            restart(setFrames, intervalID, setIntervalID);
                        }}
                    >
                        Regenerate Array
                    </Button>
                </Stack>
            </Stack>
        </div>
    );
}

export function restart(
    setFrames: React.Dispatch<React.SetStateAction<number>>,
    intervalID: number | null,
    setIntervalID: React.Dispatch<React.SetStateAction<number | null>>
) {
    setFrames(0);
    if (intervalID) {
        clearInterval(intervalID);
        setIntervalID(null);
    }
}
