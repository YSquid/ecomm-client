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
  const [checkedCategories, setCheckedCategories] = useState([]);

  //categories state is in products component. Update it everytime checked categories changes
  useEffect(() => {
    setCategories(checkedCategories)
  },[checkedCategories])


  const handleAllChange = () => {
    if (checkedCategories.includes("all")) {
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

    setCheckedCategories(checkedCategories.filter((category) => {
      console.log(category)
      return category === "all";
    }))
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
