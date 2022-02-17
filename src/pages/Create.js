import React, { useRef, useState, useEffect } from "react";
//For downloading the chart
import html2canvas from "html2canvas";
//Color pickers
import { ChromePicker, CirclePicker } from "react-color";
//For selecting the stiches
import Selecto from "react-selecto";

import $ from "jquery";
import Tooltip from "../comps/Tooltip";
//Hook to handle outside clicks & keypresses
import useOutsideClick from "../hooks/useOutsideClick";
import useKeypress from "../hooks/useKeypress";

//Fontawesome icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
//Icons
import back from "../img/left.png";
import removeColor from "../img/removeColors.png";
import move from "../img/all-directions.png";
import fill from "../img/fill.png";
import zoomIn from "../img/zoom-in.png";
import zoomOut from "../img/zoom-out.png";
import getRandom from "../img/surprise.png";
import startOver from "../img/delete.png";
import download from "../img/download.png";
import flip from "../img/flip.png";
import noSymbol from "../img/removeSymbols.png";
import borderColors from "../img/border-color.png";
import symbolColors from "../img/symbolColors.png";
import removeBorderColor from "../img/removeBorderColor.png";
import Outline from "../img/outline.png";
import noSymbolColor from "../img/removeSymbolColors.png";
import removeOutline from "../img/removeOutline.png";
import select from "../img/selection.png";

function Create() {
  //Column, row, title states
  let [cols, setCols] = useState([0]);
  let [rows, setRows] = useState([0]);
  let [stichCol, setStichCol] = useState([]);
  let [stichRow, setStichRow] = useState([]);
  let [knittedRow, setKnittedRow] = useState(cols);
  let [title, setTitle] = useState("");
  let [showRow, setShowRow] = useState(1);
  //Color picker states
  let [chromeColor, setChromeColor] = useState("#000000");
  let [circleColor, setCircleColor] = useState("#000000");
  let [colors, setColors] = useState([
    "#000000",
    "#ffffff",
    "#f44336",
    "#e91e63",
    "#2196f3",
    "#009688",
    "#8bc34a",
    "#ffc107",
    "#795548",
    "#607d8b",
  ]);
  let [showColorPicker, setShowColorPicker] = useState(false);

  //Boolean states
  let [mouseIsDown, setMouseIsDown] = useState(false);
  let [knittingMode, setKnittingMode] = useState(true);
  let [symbolMode, setSymbolMode] = useState(true);
  let [selected, setSelected] = useState(true);
  let [random, setRandom] = useState(true);
  let [draggable, setDraggable] = useState(true);
  let [rowrev, setrowrev] = useState(true);
  let [outlined, setoutlined] = useState(true);

  let [diffX, setDiffX] = useState(0);
  let [diffY, setDiffY] = useState(0);
  let [dragging, setDragging] = useState(false);
  let [styles, setStyles] = useState({});

  let [borderColor, setBorderColor] = useState("1px solid " + circleColor);
  let renderedRow = document.querySelectorAll(".rendered-row");
  let element = document.getElementsByClassName("stich");
  let [symbol, setSymbol] = useState("Ⅰ");
  //refs
  const colorPickerRef = useRef();
  const gridRef = useRef();
  const gridRefTwo = useRef();
  //Styles
  let [stichHeightWidth, setStichHeightWidth] = useState(25);
  //Chart height and width
  const chartHeightWidth = {
    height: stichHeightWidth * rows + "px",
    width: stichHeightWidth * cols + "px",
  };
  const stichStyle = {
    backgroundColor: "#ffffff",
    width: stichHeightWidth + "px",
    height: stichHeightWidth + "px",
  };

  //Set cols, rows and title from users input
  const updateCol = (e) => {
    let newCol = e.target.value;
    setCols([newCol]);
    biggerThanZero(e, newCol);
  };
  const updateRow = (e) => {
    let newRow = e.target.value;
    setRows([newRow]);
    setKnittedRow(newRow);
    biggerThanZero(e, newRow);
  };

  const updateTitle = (e) => {
    let newTitle = e.target.value;
    setTitle(newTitle);
  };
  //numbers cant be less than 0
  const biggerThanZero = (e, direction) => {
    if (direction < 0) {
      direction = 0;
      e.target.value = 0;
    }
  };
  //create row and column arrays
  const addColumnsRowsArr = (e, direction, setDirection) => {
    let userVal = e.target.value;
    direction = [];
    setDirection(direction);
    for (let i = 0; i < userVal; i++) {
      if (direction.length < userVal) {
        direction.push(i);
      }
    }
  };

  //Handle zooming
  const zoom = (equation) => {
    stichHeightWidth = equation;
    //save height/width and knittedRow values
    setStichHeightWidth(stichHeightWidth);
    setKnittedRow(knittedRow);
    for (let i = 0; i < element.length; i++) {
      element[i].style.height = stichHeightWidth + "px";
      element[i].style.width = stichHeightWidth + "px";
    }
  };

  //Toggle modes
  const toggle = (mode, setMode) => {
    setMode(!mode);
  };
  //Handle selected symbol
  const handleSelectedSymbol = (e) => {
    let selectedSymbol = e.target.value;
    setSymbol(selectedSymbol);
  };
  const removeSymbols = () => {
    for (let i = 0; i < element.length; i++) {
      setSymbolMode(true);
      element[i].innerHTML = "";
    }
  };
  //Handle knitting mode activation
  const activateKnittingMode = () => {
    if (knittedRow === 0 || knittedRow > rows) {
      setKnittedRow(cols);
      showRow = 1;
      setShowRow(showRow);
      setKnittingMode(true);
    } else {
      for (let i = 0; i < rows; i++) {
        let renderedRow = document.querySelectorAll(".rendered-row");
        renderedRow[knittedRow - 1].style.border = "4px solid #992E2B";
      }
    }
  };
  //Handle moving up the chart
  const nextKnittingRow = () => {
    knittedRow--;
    setKnittedRow(knittedRow);
    for (let i = 0; i < rows; i++) {
      if (knittedRow >= 0) {
        renderedRow[knittedRow].style.border = "none";
        renderedRow[knittedRow].style.marginLeft = 0;
      }
    }
    showRow++;
    setShowRow(showRow);
    activateKnittingMode();
  };
  //Handle moving down the chart
  const prevKnittingRow = () => {
    knittedRow++;
    setKnittedRow(knittedRow);
    for (let i = 0; i < rows; i++) {
      renderedRow[knittedRow - 2].style.border = "none";
      renderedRow[knittedRow - 2].style.marginLeft = 0;
    }
    showRow--;
    setShowRow(showRow);
    activateKnittingMode();
  };
  //Reset border style after knitting mode is disabled
  const bordersAfterKnittingMode = () => {
    if (!knittingMode) {
      for (let i = 0; i < rows; i++) {
        let renderedRow = document.querySelectorAll(".rendered-row");
        renderedRow[i].style.border = "none";
        renderedRow[i].style.margin = "initial";
      }
    }
  };

  //Handle mouse events
  const mouseUp = () => {
    setMouseIsDown(false);
  };
  const mouseDown = (e, backgroundColor) => {
    setMouseIsDown(true);
    //For selecting the first element when the drag starts!
    if (selected && symbolMode && draggable && dragging) {
      e.target.style.backgroundColor = backgroundColor;
    }
    if (!symbolMode && draggable && dragging) {
      e.target.innerHTML = symbol;
    }
  };
  //Handle background color or symbol change onMouseMove!!!!!!
  const dragChanges = (e, backgroundColor) => {
    if (mouseIsDown && selected && symbolMode && draggable && !dragging) {
      e.target.style.backgroundColor = backgroundColor;
    }
    if (mouseIsDown && !symbolMode && draggable && !dragging) {
      e.target.innerHTML = symbol;
    }
  };
  //Handle background color or symbol change onClick!!!
  const clickChanges = (e, backgroundColor) => {
    if (symbolMode && !selected && draggable && dragging) {
      e.target.style.backgroundColor = backgroundColor;
    }
    if (!symbolMode && draggable && !dragging) {
      e.target.innerHTML = symbol;
    }
  };

  //handle selected stiches' opacity
  const handleSelect = () => {
    toggle(selected, setSelected);
    for (let i = 0; i < element.length; i++) {
      if (selected) {
        element[i].style.opacity = 0.5;
      } else {
        element[i].style.opacity = 1;
        element[i].classList.remove("selected");
        setMouseIsDown(false);
      }
    }
  };
  //fill selected stiches
  const fillSelected = (backgroundColor) => {
    let selectedStiches = document.querySelectorAll(".selected");
    for (let i = 0; i < selectedStiches.length; i++) {
      selectedStiches[i].style.backgroundColor = backgroundColor;
    }
  };

  //Remove all the colors
  const removeColors = () => {
    for (let i = 0; i < element.length; i++) {
      element[i].style.backgroundColor = "#fff";
    }
  };
  //push color into colors array
  const pushColor = (arr) => {
    if (showColorPicker) {
      //add only if doesn't exist
      if (!arr.includes(chromeColor)) {
        arr.push(chromeColor);
      }
    }
    setCircleColor(chromeColor);
  };

  //https://www.robinwieruch.de/react-component-to-image/
  const handleDownloadImage = async () => {
    const element = gridRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/jpg");
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };

  //Color half of the stiches in random
  const randomChart = (backgroundColor) => {
    let halfOfStiches = (cols * rows) / 2;
    for (let i = 0; i < halfOfStiches; i++) {
      let rand = Math.floor(Math.random() * (cols * rows));
      for (let j = 0; j < halfOfStiches * 2; j++) {
        element[rand].style.backgroundColor = backgroundColor;
      }
    }
  };

  //Generate the random chart
  const generateRandChart = (backgroundColor) => {
    if (random) {
      toggle(random, setRandom);
      randomChart(backgroundColor);
    } else {
      removeColors();
      randomChart(backgroundColor);
    }
  };

  //Group the selected divs into parent div
  const groupSelected = () => {
    if (!selected && mouseIsDown) {
      for (let i = 0; i < rows; i++) {
        $(".nr" + i)
          .find(".selected")
          .wrapAll("<div class='column' />");
      }
    }
    if (!($(".selected").parent() === "<div class='column' />")) {
      unselect();
      for (let i = 0; i < rows; i++) {
        $(".nr" + i)
          .find(".selected")
          .wrapAll("<div class='column' />");
      }
    }
  };

  //Remove the group parent div and children
  const unselect = () => {
    for (let i = 0; i < rows; i++) {
      //unwrap contents (in this case selected class)
      $(".column").contents().unwrap();
      //remove div if empty
      if (document.querySelectorAll(".column:empty")) {
        $(".column").remove();
      }
    }
  };

  //Flip the selected divs
  const rowRev = () => {
    if (!selected) {
      toggle(rowrev, setrowrev);
      let column = document.querySelectorAll(".column");
      let columnLength = column.length;
      for (let i = 0; i < columnLength; i++) {
        if (rowrev) {
          column[i].style.flexDirection = "row-reverse";
        } else {
          column[i].style.flexDirection = "row";
        }
      }
    }
  };

  //Change the border color
  const changeBorderColor = () => {
    borderColor = circleColor;
    setBorderColor(borderColor);
    for (let i = 0; i < element.length; i++) {
      element[i].style.border = "1px solid " + borderColor;
    }
  };

  //Reset initial borders
  const initBorder = (color) => {
    borderColor = color;
    setBorderColor(borderColor);
    for (let i = 0; i < element.length; i++) {
      element[i].style.border = "1px solid " + color;
    }
    setoutlined(true);
  };

  //Outline the stiches
  const outline = () => {
    let column = document.querySelectorAll(".column");
    let columnLength = column.length;
    setoutlined(false);

    //Outline the selected area
    if (!selected) {
      initBorder(borderColor);
      for (let i = 0; i < columnLength; i++) {
        if (i === 0) {
          for (let i = 0; i < column[0].children.length; i++) {
            column[0].children[i].style.borderTop = "2px solid red";
          }
        }
        if (i === columnLength - 1) {
          for (let i = 0; i < column[columnLength - 1].children.length; i++) {
            column[columnLength - 1].children[i].style.borderBottom =
              "2px solid red";
          }
        }
        column[i].children[0].style.borderLeft = "2px solid red";
        column[i].children[column[i].children.length - 1].style.borderRight =
          "2px solid red";
      }
    }
  };

  //Start drag
  const dragStart = (e) => {
    if (!draggable) {
      setDiffX(e.screenX - e.currentTarget.getBoundingClientRect().left);
      setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top);
      setDragging(true);
    }
  };

  //End drag
  const dragEnd = () => {
    if (!draggable) {
      setDragging(false);
    }
  };

  //While dragging
  const drag = (e) => {
    if (dragging && !draggable) {
      let left = e.screenX - diffX;
      let top = e.screenY - diffY;
      setStyles({
        left: left,
        top: top,
      });
    }
  };

  //Restart
  const restart = () => {
    initBorder("lightgrey");
    removeColors();
    removeSymbols();
    setSelected(true);
    for (let i = 0; i < element.length; i++) {
      element[i].style.opacity = 1;
      element[i].classList.remove("selected");
      setMouseIsDown(false);
    }
  };

  //Change symbol color
  const symbolColor = (color) => {
    for (let i = 0; i < element.length; i++) {
      element[i].style.color = color;
    }
  };

  //Detect click outside element & close it
  useOutsideClick(colorPickerRef, () => {
    if (showColorPicker) {
      setShowColorPicker((showColorPicker) => !showColorPicker);
      pushColor(colors);
    }
  });

  useOutsideClick(gridRefTwo, () => {
    if (!selected) {
      setSelected((selected) => !selected);
      handleSelect();
    }
  });

  //Detect key press & change states
  useKeypress("Escape", () => {
    if (draggable) {
      setDraggable(true);
    }
  });

  useKeypress("Escape", () => {
    if (selected) {
      setSelected(true);
      for (let i = 0; i < element.length; i++) {
        element[i].style.opacity = 1;
        element[i].classList.remove("selected");
        setMouseIsDown(false);
      }
    }
  });

  const returnRows = stichRow.map((rowI) => {
    return (
      <span key={rowI++}>
        <div className={"rendered-row nr" + rowI}>
          {stichCol.map((colI) => {
            return (
              <span
                className={"stich"}
                style={stichStyle}
                key={colI++}
                onMouseDown={(e) => {
                  mouseDown(e, circleColor);
                }}
                onMouseUp={() => {
                  mouseUp();
                }}
                onMouseOver={(e) => {
                  dragChanges(e, circleColor);
                }}
                onClick={(e) => clickChanges(e, circleColor)}
              ></span>
            );
          })}
        </div>
      </span>
    );
  });

  return (
    <div className="chart-maker">
      <div className="row">
        <div className="col-lg-4 col-md-5 col-sm-12 toolbar row">
          <div className="col-10 back-col-row">
            <div className="back">
              <img src={back} />
              <h6>Back</h6>
            </div>
            <div className="col-12">
              <label>Title</label>
              <br />
              <input
                id="title"
                placeholder="Title"
                onChange={(e) => updateTitle(e)}
              />
            </div>
            <div className="row columns-rows">
              <div className="col-6">
                <label>Columns</label>
                <br />
                <input
                  id="cols"
                  disabled={selected ? false : true}
                  type="number"
                  defaultValue={cols}
                  onChange={(e) => {
                    updateCol(e);
                    addColumnsRowsArr(e, stichCol, setStichCol);
                  }}
                />
              </div>
              <div className="col-6">
                <label>Rows</label>
                <br />

                <input
                  id="rows"
                  disabled={selected ? false : true}
                  type="number"
                  defaultValue={rows}
                  onChange={(e) => {
                    updateRow(e);
                    addColumnsRowsArr(e, stichRow, setStichRow);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="colors col-10">
            <div className="pick-color">
              <label>Colors</label>
              <br />
            </div>

            <div className="picked-colors">
              <CirclePicker
                colors={colors}
                color={circleColor}
                circleSize={30}
                onChangeComplete={(value) => {
                  setCircleColor(value.hex);
                }}
              />
              <button
                onClick={(e) => {
                  setShowColorPicker((showColorPicker) => !showColorPicker);
                  pushColor(colors);
                }}
              >
                {showColorPicker ? "×" : "+"}
              </button>
              {showColorPicker && (
                <div ref={colorPickerRef} className="chrome-div">
                  <ChromePicker
                    color={chromeColor}
                    onChange={(updatedColor) =>
                      setChromeColor(updatedColor.hex)
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <div className="all-icons col-10">
            <div className="icons">
              <button
                onClick={() => {
                  initBorder("lightgrey");
                }}
              >
                <Tooltip content="Remove added border color" direction="right">
                  <img src={removeBorderColor} />
                </Tooltip>
              </button>

              <button onClick={changeBorderColor}>
                <Tooltip content="Add border color" direction="right">
                  <img src={borderColors} />
                </Tooltip>
              </button>

              <button onClick={removeColors}>
                <Tooltip content="Remove chart colors" direction="right">
                  <img src={removeColor} />
                </Tooltip>
              </button>

              <button onClick={restart}>
                <Tooltip content="Start from scratch" direction="right">
                  <img src={startOver} />
                </Tooltip>
              </button>

              <button onClick={() => zoom(stichHeightWidth + 5)}>
                <Tooltip content="Zoom in" direction="right">
                  <img src={zoomIn} />
                </Tooltip>
              </button>

              <button
                onClick={() => {
                  rowRev();
                }}
                disabled={outlined === false ? true : false}
                disabled={!selected ? false : true}
              >
                <Tooltip content="Flip horizontal" direction="right">
                  <img src={flip} />
                </Tooltip>
              </button>

              <button
                onClick={() => {
                  toggle(draggable, setDraggable);
                }}
                disabled={selected ? false : true}
              >
                <Tooltip content="Drag canvas" direction="right">
                  <img src={move} />
                </Tooltip>
              </button>

              <button
                onClick={(e) => {
                  fillSelected(circleColor);
                }}
                disabled={!selected ? false : true}
              >
                <Tooltip content="Fill" direction="right">
                  <img src={fill} />
                </Tooltip>
              </button>

              <button
                onClick={() => handleSelect()}
                disabled={draggable ? false : true}
              >
                <Tooltip content="Select" direction="right">
                  <img src={select} />
                </Tooltip>
              </button>

              <button onClick={() => zoom(stichHeightWidth - 5)}>
                <Tooltip content="Zoom out" direction="right">
                  <img src={zoomOut} />
                </Tooltip>
              </button>

              <button
                onClick={() => {
                  symbolColor(circleColor);
                }}
              >
                <Tooltip content="Change symbol color" direction="right">
                  <img src={symbolColors} />
                </Tooltip>
              </button>

              <button
                onClick={() => {
                  symbolColor("#646F72");
                }}
              >
                <Tooltip content="Initial symbol color" direction="right">
                  <img src={noSymbolColor} />
                </Tooltip>
              </button>

              <button
                onClick={() => {
                  removeSymbols();
                }}
              >
                <Tooltip content="Remove symbols" direction="right">
                  <img src={noSymbol} />
                </Tooltip>
              </button>

              <button
                disabled={rowrev ? false : true}
                onClick={() => {
                  outline();
                }}
              >
                <Tooltip content="Add outline" direction="right">
                  <img src={Outline} />
                </Tooltip>
              </button>

              <button
                onClick={() => {
                  initBorder(borderColor);
                }}
              >
                <Tooltip content="Remove outline" direction="right">
                  <img src={removeOutline} />
                </Tooltip>
              </button>
            </div>
          </div>

          <div className="col-10 toggle-symbol-mode">
            <div className="toggle-and-title">
              <h2>Symbol View</h2>
              <button
                onClick={() => {
                  toggle(symbolMode, setSymbolMode);
                }}
                disabled={selected ? false : true}
              >
                <FontAwesomeIcon
                  style={{
                    visibility: symbolMode ? "visible" : "hidden",
                    position: "absolute",
                  }}
                  icon={faToggleOn}
                />
                <FontAwesomeIcon
                  style={{
                    visibility: !symbolMode ? "visible" : "hidden",
                  }}
                  icon={faToggleOff}
                />
              </button>
            </div>
            <div className={symbolMode ? "inactive" : "active"}>
              <select
                id="stitchSelect"
                onChange={(e) => {
                  handleSelectedSymbol(e);
                }}
              >
                <option value="Ⅰ">Ⅰ (knit)</option>
                <option value="−">− (purl)</option>
                <option value=" ">None</option>
                <option value="○">○ (yo)</option>
                <option value="／">／ (k2tog)</option>
                <option value="＼">＼ (ssk)</option>
                <option value="●">● (bobble)</option>
                <option value="⋂">⋂ (bind off)</option>
              </select>
            </div>
          </div>

          <div className="col-10 toggle-knitting-mode">
            <div className="toggle-and-title">
              <h2>Knitting Mode</h2>
              <button
                onClick={() => {
                  activateKnittingMode();
                  toggle(knittingMode, setKnittingMode);
                  bordersAfterKnittingMode();
                }}
                disabled={selected ? false : true}
              >
                <FontAwesomeIcon
                  style={{
                    visibility: knittingMode ? "visible" : "hidden",
                    position: "absolute",
                  }}
                  icon={faToggleOn}
                />
                <FontAwesomeIcon
                  style={{
                    visibility: !knittingMode ? "visible" : "hidden",
                  }}
                  icon={faToggleOff}
                />
              </button>
            </div>
            <div
              className={
                knittingMode
                  ? "inactive knitting-mode-rows"
                  : "active knitting-mode-rows"
              }
            >
              <button
                onClick={() => {
                  prevKnittingRow();
                }}
              >
                -
              </button>
              <div>{showRow}</div>
              <button
                onClick={() => {
                  nextKnittingRow();
                }}
              >
                +
              </button>
            </div>
          </div>
          <div className="toolbar-bottom-buttons">
            <button
              className="random-chart"
              onClick={() => {
                generateRandChart(circleColor);
              }}
              disabled={selected ? false : true}
            >
              <img src={getRandom} />
              Generate Random chart
            </button>

            <button
              className="download"
              onClick={() => {
                handleDownloadImage();
              }}
            >
              <img src={download} />
              Download as Image
            </button>
          </div>
        </div>
        <div className="col-lg-8 col-md-7 col-sm-7" ref={gridRefTwo}>
          {!selected && (
            <Selecto
              dragContainer={".rows"}
              selectableTargets={[".selecto-area .stich"]}
              hitRate={100}
              selectByClick={false}
              selectFromInside={true}
              ratio={0}
              toggleContinueSelect={"shift"}
              onSelect={(e) => {
                e.added.forEach((el) => {
                  el.classList.add("selected");
                  groupSelected();
                });
                e.removed.forEach((el) => {
                  el.classList.remove("selected");
                  unselect();
                });
              }}
            ></Selecto>
          )}
          <div id="grid">
            <div
              ref={gridRef}
              style={chartHeightWidth}
              className="rows selecto-area"
              onMouseDown={(e) => dragStart(e)}
              onMouseMove={(e) => drag(e)}
              onMouseUp={dragEnd}
              style={styles}
            >
              {returnRows}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
