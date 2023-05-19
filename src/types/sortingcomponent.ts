import Element from "./element";

/**
 * Component type - to represent a jsx component when rendered
 *
 * @export
 * @typedef {Component}
 */
export type Component = React.FC<ComponentProps>;

/**
 * ComponentProps type - to represent the props of a component (in this case a sorting algo component)
 *
 * @export
 * @interface ComponentProps
 * @typedef {ComponentProps}
 */
export interface ComponentProps {
    /**
     * Frames - the number of frames that has been rendered
     *
     * @type {number}
     */
    frames: number;
    /**
     * The array to take into account when using the algorithm
     *
     * @type {Element[]}
     */
    arr: Element[];
    /**
     * setArr - setter for the arr (for the algorithm to upate the array)
     *
     * @type {React.Dispatch<React.SetStateAction<Element[]>>}
     */
    setArr: React.Dispatch<React.SetStateAction<Element[]>>;
    /**
     * setFrames - setter for the frames (for the algorithm to call restart)
     *
     * @type {React.Dispatch<React.SetStateAction<number>>}
     */
    setFrames: React.Dispatch<React.SetStateAction<number>>;
    /**
     * intervalID (for the algorithm to call restart)
     *
     * @type {(number | null)}
     */
    intervalID: number | null;
    /**
     * setIntervalID - setter for the intervalID (for the algorithm to call restart)
     *
     * @type {React.Dispatch<React.SetStateAction<number | null>>}
     */
    setIntervalID: React.Dispatch<React.SetStateAction<number | null>>;
}
