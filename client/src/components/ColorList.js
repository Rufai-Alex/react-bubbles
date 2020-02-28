import React, { useState } from "react";
import axios from "axios";
import WithAuth from "./axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = ({ id, colorName, colorCode }) => {
    // e.preventDefault();

    // const id = colorToEdit.id;
    debugger;

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    WithAuth()
      .put(`http://localhost:5000/api/colors/${id}`, {
        id: id,
        color: colorName,
        code: colorCode
      })
      .then(resp => {
        setColorToEdit(resp.data);
        debugger;
      })
      .catch(err => {});
  };

  const deleteColor = color => {
    // make a delete request to delete this color

    WithAuth()
      .delete(`http://localhost:5000/api/colors/${color.id}`)

      .then(resp => {
        setColorToEdit(resp.data);
      })
      .catch(err => {});
  };

  return (
    <div className='colors-wrap'>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className='delete'
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className='color-box'
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form
        // onSubmit={({ colorName, colorCode }) => {
        //   saveEdit({
        //     id: colorToEdit.id,
        //     colorName,
        //     colorCode
        //   });
        // }}
        >
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              name='colorName'
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              name='colorCode'
              value={colorToEdit.code.hex}
            />
          </label>
          <div className='button-row'>
            <button
              onClick={() =>
                saveEdit({
                  id: colorToEdit.id,
                  colorName: colorToEdit.color,
                  colorCode: colorToEdit.code
                })
              }
              type='submit'>
              save
            </button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className='spacer' />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
