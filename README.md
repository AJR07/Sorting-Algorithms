# **Sorting Visualiser**

### **View the Project [Here](https://visual-sort-ajr07.web.app/)**

This site is made for CEP WA2 :D.

Note: WHY IS IT SO SLOW???

Those sorting visualisations in the form of a video that you see online are pre-rendered, this is rendered real time, it ought to be a bit harder for ur computer to render things fast, esp in the thousands of elements.

-   Sure I could have optimised things a bit more maybe,
-   But still...

## **Project Discription**

This is a small project I've made to visualise different sorting algorithms. I will have to add, heavy inspiration has been taken from [Youtube Videos](https://youtu.be/mPZhnGWgL0s) where many sorting algorithms have been visualised in a similar format. However, I haven't seen many websites try to replicate this, i mean sure there's [VisualAlgo](https://visualgo.net/en/sorting), but I don't think you can visualise it at a large scale. Anyways, this was a good opportunity to do a project on this topic too. There was some key learning points actually, as seen [here](#learning-points).

### **Side Note: Where is the visualisation? (For CEP WA2)**

It allows you to visualise 3 sorting algorithms (for now, more might come):

1. Selection Sort
2. Bubble Sort
3. Counting Sort

:D

## **Tech Stack**

-   **Firebase**: Only for hosting
-   **React**: Framework of choice
-   **Typescript**: Language (for typings)
-   **Material UI (MUI)**: For all the beautiful input components, mainly

## **DEVLOGS**

_Uh, I definitely did do this in 1 day, because I did not have time before FEs, so theres only 2 days worth of dev logs here :(_

-   18th May: Lmao just finished FEs, time to rush this. At first I thought I wanted to do something like representing text data as a word cloud. And then.. I researched and found nothing I could use to decipher fonts and their specific bounding boxes quickly. Soo I brainstormed, and thought about SORTING VISUALISATIONS!!! We used this in Competitive programming to teach those new to the field, so I thought why not try to make something like this. So I spent about 2h creating the UI and the platform to host different sorting algorithms.

-   19th May: I implemented 2 different algorithms at 1am (yes, i know, but you've gotta do what you've gotta do), Bubble Sort and Counting Sort. After which, when I had time later today, I implemented Selection Sort. 3 should be enough I think. I went on to fix a bunch of bugs, and now its time to wrap up and deploy in a matter of less than a day to everyone "appreciate ~ Mr Lim 2023" it.

### **Learning Points**

_I'll add this as a bonus_

-   Normally, how would you approach creating sorting algorithms? Loops, recursion, etc right?
-   This time, I've actually had to implement these algorithms very differently. Because I wanted this visualisation to be able to be played and stopped, I needed to come up with some form of "formula", given the current frame we are on, that renders the correct state of the array.
-   So for example, for an array of length 1000, at Frame 999 for counting sort, I should be looking at the 998th element in the array and adding it into the frequency table. This means each frame is O(1) time complexity, instead of the O(N) for counting sort i guess.
-   Representing nested loops (in the case of selection and bubble sort) was more of a challenge, I'll leave you to look at the code.

# **Have fun playing around with it!**
