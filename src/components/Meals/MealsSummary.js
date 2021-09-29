import React from 'react'
import Card from '../UI/Card/Card'
import classes from './MealsSummary.module.css'
function MealsSummary() {
    return (
        <Card className={classes.meals}>
            <h1>Delicious Food , Delivered to you</h1>
            <p>Choose your favorite meal</p>
            <p>All our meals are cooked with fresh bacons and love</p>
        </Card>

    )
}

export default MealsSummary
