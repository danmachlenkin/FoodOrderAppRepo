import React, {useEffect,useState} from "react";

//JS imports
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {
  const [meals,setMeals] = useState([]);
  const [isLoading , setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(()=>{
    const fetchMeals = async() => {
      const response = await fetch('https://food-order-app-460d6-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok){
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      
      const loadedMeals = [];

      for(const key in responseData){
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false);

    };

    fetchMeals().catch( (error)=> {
      setIsLoading(false);
      setHttpError(error.message);
    })

  } ,[]);

  if(isLoading){
    return <section className={classes.mealsIsLoading}>
      <p>Loading...</p>
    </section>
  }

  if(httpError){
    return <section className={classes.mealsLoadingError}>
      <p>{httpError}</p>
    </section>
  }

  let mealsList = meals.map((item) => (
    <MealItem
      key={item.id}
      id={item.id}
      name={item.name}
      price={item.price}
      description={item.description}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
