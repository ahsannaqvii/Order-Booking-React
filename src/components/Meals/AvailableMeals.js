import React , {useEffect ,useState } from "react";
import Card from "../UI/Card/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItems/MealItem";

function AvailableMeals() {
  const [meals,setMeals] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // PROBLEM STATEMENT : ASYNC RETURNS A PROMISE 
    // WHEN WE HAVE A ASYNC FUNCTION(FETCHMEALS) IN TRYCATCH 
    // SO IF WE THROW AN ERROR ,  IT REJECTS THE PROMISE SO 
    // USE FETCHMEALS.CATCH 
    // 2ND METHOD : PUT TRY CATCH IN ANTOHER ASYNC FUNCTION 
    // AND AWAIT FETCH MEALS BECAUSE USEEFFECT CANT BE ASYNC 
    const fetchMeals=async ()=>{
      const response=await fetch('https://rest-react-3af2d-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      // THIS RESPONSE DATA WILL BE OBJECT 
      const responseData = await response.json();
      const loadedMeals=[];
      // CONVERTING INTO ARRAY 
      for(const key in responseData){
        loadedMeals.push({
          id:key,
          name:responseData[key].name,
          price:responseData[key].price,
          description:responseData[key].description,

        });
      }
        setMeals(loadedMeals);
        // ONCE MEALS FETCH THEN SET LOADING TO FALSE
        setLoading(false);
        
    }; 
    
      fetchMeals().catch((error) => {
      
        setLoading(false);
        setError(error.message);
      });
  
    // its hectic to use try/catch and async await in useeffect so make a fnctin 
  }, []);

if(Loading){
  return (
    <section className={classes.mealsLoading}>
      <p>Loading ...</p>
    </section>
  )
}

if(error){
  <section className={classes.errorState}>
      <p>{error}</p>
    </section>

}

  const mealsList = meals.map((meal) => (
    <li>
      <MealItem
        key={meal.id}
        name={meal.name}
        id={meal.id}
        description={meal.description}
        price={meal.price}
      />
    </li>
  ));
  return (
    <section>
      <Card  css3={classes.meals}>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailableMeals;
