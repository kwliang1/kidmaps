import React from "react";
import Index, {Ratings} from "../Action";

interface ItemRatingInterface extends React.ComponentProps<any>{

}

const ItemRating = (props:ItemRatingInterface) => {
    const loggingTag = `[ItemRating]`;
    const {ratings} = props;
    const ratingsInfo = new Ratings(ratings?.count, ratings?.value);
    return (
        <Index
            info={ratingsInfo}
        />
    )
}

export default ItemRating;