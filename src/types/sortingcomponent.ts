import Element from "./element";

export type Component = React.FC<ComponentProps>;
export interface ComponentProps {
    frames: number;
    arr: Element[];
    setArr: React.Dispatch<React.SetStateAction<Element[]>>;
    setFrames: React.Dispatch<React.SetStateAction<number>>;
    intervalID: number | null;
    setIntervalID: React.Dispatch<React.SetStateAction<number | null>>;
}
