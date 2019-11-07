import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Stage, Layer } from "react-konva";
import ImageFromUrl from "./ImageFromUrl";
import Annotation from "./Annotation";
import "./styles.css";

const initialAnnotations = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    id: "annotation1"
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    id: "annotation2"
  }
];

function App() {
  const [annotations, setAnnotations] = useState(initialAnnotations);
  const [selectedId, selectAnnotation] = useState(null);
  const [canvasMeasures, setCanvasMeasures] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  return (
    <Stage
      width={canvasMeasures.width}
      height={canvasMeasures.height}
      onMouseDown={e => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectAnnotation(null);
        }
      }}
    >
      <Layer>
        <ImageFromUrl
          setCanvasMeasures={setCanvasMeasures}
          imageUrl="https://cdn.dribbble.com/users/2150390/screenshots/8064018/media/117406b607c400e7030deb6dfa60caa6.jpg"
        />
      </Layer>
      <Layer>
        {annotations.map((annotation, i) => {
          return (
            <Annotation
              key={i}
              shapeProps={annotation}
              isSelected={annotation.id === selectedId}
              onSelect={() => {
                selectAnnotation(annotation.id);
              }}
              onChange={newAttrs => {
                const rects = annotations.slice();
                rects[i] = newAttrs;
                setAnnotations(rects);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
