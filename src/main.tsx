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

/**
 * Sorting Algorithms: Array of objects containing the name of the algorithm, description, the speed of the algorithm, the number of elements in the array, and the component to render
 * Stores all the currently programmed sorting algorithms.
 *
 * @type {{
    name: string;
    description: string;
    speed: number;
    elements: number;
    component: Component;
}[]}
 */
const SortingAlgorithms: {
    name: string;
    description: string;
    speed: number;
    elements: number;
    component: Component;
}[] = [
    {
        name: "bubble sort",
        description:
            "Bubble sort works by comparing two adjacent elements in the array, and swapping them if they are in the wrong order.\
            This is repeated until the array is sorted.\
            The algorithm is named bubble sort because the largest element in the array 'bubbles' to the end of the array in each iteration.\
            The algorithm is O(n^2) in the worst case, and O(n) in the best case.\
            The algorithm is stable, and in-place.\
            ",
        speed: 500,
        elements: 1000,
        component: BubbleSort,
    },
    {
        name: "count sort",
        description:
            "Count sort works by counting the frequency of each element in the array. Afterwards, the array is sorted by iterating through the array of frequencies, and adding the element to the sorted array the number of times it appears in the original array.\
    The algorithm is O(n) in the worst case, and O(n) in the best case.\
    The algorithm is not stable, and is in-place.\
    However, the algorithm can only be used on arrays of integers, and the range of the integers must be known beforehand.",
        speed: 100,
        elements: 7500,
        component: CountSort,
    },
    {
        name: "selection sort",
        description:
            "Selection Sort works by iterating through the array, and finding the smallest element in the array. It then swaps the smallest element with the first element in the array. This is repeated until the array is sorted.\
        The algorithm is O(n^2) in the worst case, and O(n^2) in the best case.\
        The algorithm is not stable, and is in-place.",
        speed: 350,
        elements: 1000,
        component: SelectionSort,
    },
];

/**
 * SortingVisualiser: The main component of the app.
 *
 * @export
 * @returns {*}
 */
export default function SortingVisualiser() {
    // state variables to store the state of different settings in the visualiser
    // frames: the number of frames that have passed since the start of the sorting algorithm
    let [frames, setFrames] = useState<number>(0);
    // intervalID: the ID of the interval that is running the sorting algorithm
    let [intervalID, setIntervalID] = useState<number | null>(null);
    // chosenSortingAlgo: the index of the currently chosen sorting algorithm
    let [chosenSortingAlgo, setChosenSortingAlgo] = useState<number>(0);
    // arr: the array of elements that is being sorted
    let [arr, setArr] = useState<Element[]>(
        generateArray(SortingAlgorithms[0].elements)
    );

    // computed values: largest value (largest value of array), isSorted (whether the array is sorted or not)
    const largestValue = Math.max(...arr.map((value) => value.value));
    const isSorted = arr.every((value, index) => {
        if (index === 0) return true;
        return value.value >= arr[index - 1].value;
    });

    // SortingComponent: the component of the currently chosen sorting algorithm (to be rendered)
    const SortingComponent = SortingAlgorithms[chosenSortingAlgo].component;

    // githubMarkdown: the markdown of the README.md file of the github repository
    // to display the project details in the app (rendered using react-markdown)
    const [githubMarkdown, setGithubMarkdown] = useState<string>("");
    const [showing, setShowing] = useState<boolean>(false);
    // use of useEffect hook to fetch the contents of the readme from the gh repo
    // and set the state of githubMarkdown to the contents of the readme
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

            {/* Display project details */}
            <Stack
                style={{
                    backgroundColor: "#0e2547",
                    borderRadius: "2vw",
                    padding: "2vw",
                }}
            >
                {/* Quick dropdown to allow for hiding and showing of documentation */}
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
                {/* Render React Markdown! */}
                <div hidden={!showing}>
                    <ReactMarkdown>{githubMarkdown}</ReactMarkdown>
                </div>
            </Stack>

            {/* Render the sorting component. This doesn't actually render anything, 
            it just allows the sorting components to modify the array and their states to be updated. 
            (And also to update states) */}
            <SortingComponent
                arr={arr}
                setArr={setArr}
                frames={frames}
                intervalID={intervalID}
                setIntervalID={setIntervalID}
                setFrames={setFrames}
            />

            <Stack>
                {/* Details for the current visualisation: frame number, speed and number of elements */}
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
                    {/* Displaying the array: For each element we ue a div and modify its height and the margin above it to shape it correctly */}
                    {/* We do this for EVERY element in the array */}
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

                {/* Setting controls for visualisation. */}
                <Stack style={{ margin: "1vw" }} spacing={3}>
                    {/* Algorithm Selector */}
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
                                        // If the chosen algorithm isn't the same as the current one, regenerate array and restart
                                        if (chosenSortingAlgo !== index) {
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
                                        }
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
                    {/* Information on how each algorithm works */}
                    <p>
                        How{" "}
                        <b>
                            {SortingAlgorithms[
                                chosenSortingAlgo
                            ].name.toUpperCase()}{" "}
                            works:
                        </b>
                        <br />
                        {SortingAlgorithms[chosenSortingAlgo].description}
                    </p>
                    {/* Play and Stop Button for visualisations */}
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
                                // If the user wants to start the visualisation
                                // Bunch of math to make sure that the frames is updated according to the speed
                                // use of setInterval to regularly update the frames
                                // updating of frames will trigger the sorting algorithm component to update the array
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
                                // Clear the interval and set it to null - this will stop the visualisation from running
                                clearInterval(intervalID);
                                setIntervalID(null);
                            }
                        }}
                    >
                        {intervalID === null ? "Play" : "Stop"}
                    </Button>

                    {/* Button to regenerate array */}
                    <Button
                        fullWidth
                        variant="contained"
                        color="warning"
                        disabled={intervalID !== null}
                        onClick={() => {
                            // regenerate array and restart visulaisation
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

/**
 * Utility Function to restart the visualisation
 * Set the frames to 0, clear the interval and set it to null
 *
 * @export
 * @param {React.Dispatch<React.SetStateAction<number>>} setFrames
 * @param {(number | null)} intervalID
 * @param {React.Dispatch<React.SetStateAction<number | null>>} setIntervalID
 */
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
