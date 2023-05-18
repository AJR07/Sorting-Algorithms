import { Button, Stack } from "@mui/material";
import { useState } from "react";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import StopCircleIcon from "@mui/icons-material/StopCircle";
import generateRandomArray from "./utils/generatearray";
import Element from "./types/element";

export default function WordCloud() {
    let [frames, setFrames] = useState<number>(0);
    let [intervalID, setIntervalID] = useState<number | null>(null);
    let [arr, setArr] = useState<Element[]>(generateRandomArray(0, 10000, 100));
    let largestValue = Math.max(...arr.map((value) => value.value));

    return (
        <div>
            <h1 className="center">Sorting Visualiser</h1>
            <h3 className="center">by AJR07</h3>
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
                                        : "white",
                                    display: "inline-block",
                                }}
                            ></div>
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
                                    setFrames(frames++);
                                }, 100)
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
                        setArr(generateRandomArray(0, 10000, 100));
                    }}
                >
                    Regenerate Array
                </Button>
            </Stack>
        </div>
    );
}
