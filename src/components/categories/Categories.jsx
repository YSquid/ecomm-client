import React, { useState } from "react";
import "./Categories.css";
import Checkbox from "@mui/material/Checkbox";
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

function Categories({ setCategories }) {
  const [checkedCategories, setCheckedCategories] = useState({
    all: true,
    sandwiches: true,
    tacos: true,
    dessert: true,
    drinks: true,
  });

  const handleAllChange = () => {
    if (checkedCategories.all) {
      setCheckedCategories({
        all: false,
        sandwiches: false,
        tacos: false,
        dessert: false,
        drinks: false,
      });
    
      setCategories(null)
      
      
    } else {
      setCheckedCategories({
        all: true,
        sandwiches: true,
        tacos: true,
        dessert: true,
        drinks: true,
      });
      setCategories(Object.keys(checkedCategories))
    }
  };

  const handleCategoryChange = (event) => {
    setCheckedCategories({
      ...checkedCategories,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <div className="checkedCategories">
      <FormControl component="fieldset">
        <FormLabel component="legend">Categories</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedCategories.all}
                onChange={handleAllChange}
                name="all"
              />
            }
            label="All"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedCategories.sandwiches}
                onChange={handleCategoryChange}
                name="sandwiches"
              />
            }
            label="Sandwiches & Such"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedCategories.tacos}
                onChange={handleCategoryChange}
                name="tacos"
              />
            }
            label="Tacos"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedCategories.dessert}
                onChange={handleCategoryChange}
                name="dessert"
              />
            }
            label="Dessert"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={checkedCategories.drinks}
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
