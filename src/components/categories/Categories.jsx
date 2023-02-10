import React, { useState, useEffect } from "react";
import "./Categories.css";
import {
  Checkbox,
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typograhpy
} from "@mui/material";


function Categories({ setCategories }) {
  const [checkedCategories, setCheckedCategories] = useState(['all', 'sandwiches', 'tacos', 'desserts', 'drinks']);

  //categories state is in products component. Update it everytime checked categories changes
  useEffect(() => {
    setCategories(checkedCategories)
  },[checkedCategories])


  const handleAllChange = () => {
    //only sets null if all categoires and all are checked, which is currently length 5
    if (checkedCategories.length > 4) {
      setCheckedCategories([]);
    } else {
      setCheckedCategories([
        "all",
        "sandwiches",
        "tacos",
        "desserts",
        "drinks",
      ]);
    }
  };

  const handleCategoryChange = (event) => {
    //this needs to be opposite of what I thought
    //If the box was checked, as soon as event fires its now unchecked
    //So we need to check if checked is false, if it is, filter that from categores
    if (!event.target.checked) {
      setCheckedCategories(
        checkedCategories.filter((category) => {
          return category !== event.target.name;
        })
      );
    } else {
      setCheckedCategories([...checkedCategories, event.target.name]);

    }
    // setCategories(checkedCategories)
  };
  return (
    <div className="checkedCategories">
      <FormControl component="fieldset">
        <FormLabel component="legend">Categories</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                //this is only checked if all defined categories + all are checked, which is currently 5
                checked={checkedCategories.length === 5}
                onChange={handleAllChange}
                name="all"
              />
            }
            label="All"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedCategories.includes("sandwiches")}
                onChange={handleCategoryChange}
                name="sandwiches"
              />
            }
            label="Sandwiches & Such"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedCategories.includes("tacos")}
                onChange={handleCategoryChange}
                name="tacos"
              />
            }
            label="Tacos"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedCategories.includes("desserts")}
                onChange={handleCategoryChange}
                name="desserts"
              />
            }
            label="Desserts"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedCategories.includes("drinks")}
                onChange={handleCategoryChange}
                name="drinks"
              />
            }
            label="Drinks"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}

export default Categories;
