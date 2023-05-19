import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import generateArray from "./utils/generatearray";
import Element from "./types/element";
import { Component } from "./types/sortingcomponent";
import BubbleSort from "./sorting/bubble";
import CountSort from "./sorting/count";
import SelectionSort from "./sorting/selection";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";

const SortingAlgorithms: {
    name: string;
    speed: number;
    elements: number;
    component: Component;
}[] = [
    { name: "bubble sort", speed: 500, elements: 1000, component: BubbleSort },
    { name: "count sort", speed: 100, elements: 7500, component: CountSort },
    {
        name: "selection sort",
        speed: 350,
        elements: 1000,
        component: SelectionSort,
    },
];

export default function WordCloud() {
    let [frames, setFrames] = useState<number>(0);
    let [intervalID, setIntervalID] = useState<number | null>(null);
    let [chosenSortingAlgo, setChosenSortingAlgo] = useState<number>(0);
    let [arr, setArr] = useState<Element[]>(
        generateArray(SortingAlgorithms[0].elements)
    );
    const largestValue = Math.max(...arr.map((value) => value.value));
    const isSorted = arr.every((value, index) => {
        if (index === 0) return true;
        return value.value >= arr[index - 1].value;
    });
    const SortingComponent = SortingAlgorithms[chosenSortingAlgo].component;

    const [githubMarkdown, setGithubMarkdown] = useState<string>("");
    const [showing, setShowing] = useState<boolean>(false);
    useEffect(() => {
        fetch(
            "https://raw.githubusercontent.com/AJR07/Sorting-Algorithms/main/README.md",
            {
                method: "GET",
            }
        )
            // convert the response to text, and set the state
            .then((res) => res.text())
            .then((text) => setGithubMarkdown(text));
    }, []);

    return (
        <div>
            <h1 className="center">Sorting Visualiser</h1>
            <h3 className="center">by AJR07</h3>
            <Stack
                style={{
                    backgroundColor: "#0e2547",
                    borderRadius: "2vw",
                    padding: "2vw",
                }}
            >
                <Stack
                    direction="row"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => setShowing(!showing)}
                    spacing={1}
                >
                    <ArrowDropDownCircleIcon
                        style={{ rotate: showing ? "0deg" : "270deg" }}
                    />
                    <h3>Project Details</h3>
                </Stack>
                <div hidden={!showing}>
                    <ReactMarkdown>{githubMarkdown}</ReactMarkdown>
                </div>
            </Stack>

            <SortingComponent
                arr={arr}
                setArr={setArr}
                frames={frames}
                intervalID={intervalID}
                setIntervalID={setIntervalID}
                setFrames={setFrames}
            />

            <Stack>
                <Stack style={{ marginLeft: "1%" }}>
                    <p>
                        <b>Frame Number:</b> {frames}
                        <br />
                        <b>Speed:</b>{" "}
                        {SortingAlgorithms[chosenSortingAlgo].speed} Frames Per
                        Second
                        <br />
                        <b>Elements in Array:</b>{" "}
                        {SortingAlgorithms[chosenSortingAlgo].elements}
                    </p>
                </Stack>

                <Stack
                    direction="row"
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    {arr.map((value, index) => {
                        return (
                            <div
                                key={index}
                                style={{
                                    marginTop: `${
                                        ((largestValue - value.value) /
                                            largestValue) *
                                        80
                                    }vh`,
                                    height: `${
                                        (value.value / largestValue) * 80
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
                                        if (chosenSortingAlgo !== index)
                                            setArr(
                                                generateArray(
                                                    SortingAlgorithms[index]
                                                        .elements
                                                )
                                            );
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
                            setArr(
                                generateArray(
                                    SortingAlgorithms[chosenSortingAlgo]
                                        .elements
                                )
                            );
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
