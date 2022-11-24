import React from "react";
import ItemAction, {Ratings} from "./ItemAction";

interface ItemRatingInterface extends React.ComponentProps<any>{

}

const ItemRating = (props:ItemRatingInterface) => {
    const loggingTag = `[ItemRating]`;
    const {ratings} = props;
    const ratingsInfo = new Ratings(ratings?.count, ratings?.value);
    return (
        <ItemAction
            info={ratingsInfo}
        />
    )
}

export default ItemRating;