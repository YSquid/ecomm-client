import React, { useState } from "react";
import "./Categories.css";
import Checkbox from "@mui/material/Checkbox";
import {
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";

function Categories() {
  const [categories, setCategories] = useState({
    all: true,
    sandwiches: true,
    tacos: true,
    dessert: true,
    drinks: true,
  });

  const handleAllChange = () => {
    if (categories.all) {
      setCategories({
        all: false,
        sandwiches: false,
        tacos: false,
        dessert: false,
        drinks: false,
      });
    } else {
      setCategories({
        all: true,
        sandwiches: true,
        tacos: true,
        dessert: true,
        drinks: true,
      });
    }
  };

  const handleCategoryChange = (event) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };
  return (
    <div className="categories">
      <FormControl component="fieldset">
        <FormLabel component="legend">Categories</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={categories.all}
                onChange={handleAllChange}
                name="all"
              />
            }
            label="All"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={categories.sandwiches}
                onChange={handleCategoryChange}
                name="sandwiches"
              />
            }
            label="Sandwiches & Such"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={categories.tacos}
                onChange={handleCategoryChange}
                name="tacos"
              />
            }
            label="Tacos"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={categories.dessert}
                onChange={handleCategoryChange}
                name="dessert"
              />
            }
            label="Dessert"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={categories.drinks}
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
