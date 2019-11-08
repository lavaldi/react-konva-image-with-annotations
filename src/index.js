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
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [selectedId, selectAnnotation] = useState(null);
  const [canvasMeasures, setCanvasMeasures] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleMouseDown = event => {
    if (selectedId === null && newAnnotation.length === 0) {
      const { x, y } = event.target.getStage().getPointerPosition();
      const id =
        annotations.length > 0
          ? `annotation${annotations.length}`
          : "annotation1";
      setNewAnnotation([{ x, y, width: 0, height: 0, id }]);
    }
  };

  const handleMouseUp = event => {
    if (selectedId === null && newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        id: `annotation${annotations.length + 1}`
      };
      annotations.push(annotationToAdd);
      setNewAnnotation([]);
      setAnnotations(annotations);
    }
  };

  const handleMouseMove = event => {
    if (selectedId === null && newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = event.target.getStage().getPointerPosition();
      const id =
        annotations.length > 0
          ? `annotation${annotations.length}`
          : "annotation1";
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          id
        }
      ]);
    }
  };

  const handleMouseEnter = event => {
    event.target.getStage().container().style.cursor = "crosshair";
  };

  const annotationsToDraw = [...annotations, ...newAnnotation];
  return (
    <Stage
      width={canvasMeasures.width}
      height={canvasMeasures.height}
      onMouseEnter={handleMouseEnter}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        <ImageFromUrl
          setCanvasMeasures={setCanvasMeasures}
          imageUrl="https://cdn.dribbble.com/users/2150390/screenshots/8064018/media/117406b607c400e7030deb6dfa60caa6.jpg"
          onMouseDown={() => {
            // deselect when clicked on empty area
            selectAnnotation(null);
          }}
        />
        {annotationsToDraw.map((annotation, i) => {
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
