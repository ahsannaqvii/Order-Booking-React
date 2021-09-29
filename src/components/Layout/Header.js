import React from "react";
import classes from "./Header.module.css";
import mealsImg from  '../../assets/meals.jpg'
import HeaderCartButton from "./HeaderCartButton";
function Header(props) {
  return (
    <React.Fragment>
      <header className={classes.navbar}>
          <h1>React Meals</h1>
          {/* for cart */}
          {/* //show cart must be removed through useContext */}
            <HeaderCartButton />   
      </header>
      <div className={classes['main-image']}>
          <img src={mealsImg} alt="BEATUFIL FOOD" />
      </div>
    </React.Fragment>
  );
}

export default Header;
