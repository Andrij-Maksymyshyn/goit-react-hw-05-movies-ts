import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from '../../fetchApi/fetchApi';
import Loader from '../Loader';
import { toast } from 'react-hot-toast';



function Reviews() {
    const [reviewsInfo, setReviewsInfo] = useState([]);
    const { moviesId } = useParams();
    const [loading, setLoading] = useState(false);
    


    useEffect(() => {

        setLoading(true);

        fetchMovieReviews(moviesId)
            .then(data => {

                const { data: { results } } = data;

                setReviewsInfo(results);

                if (results.length === 0) {
    return toast.error('There is no information about the reviews...');
                   };
            })
        .catch(error => {
                console.log('Whoops, something went wrong...', error);
                 return toast.error('There is no information about the reviews...');
        })
        .finally(() => {
            setTimeout(() => {
              setLoading(false);
            }, 1000)
        });
        
    }, [moviesId]);


    return (
        <>
            {loading && <Loader />}
            {reviewsInfo && (
                <ul>
                    {reviewsInfo.map(({id, author, content}) => (
                        <li key={id}>
                            <h4>Author: {author}</h4>
                            <p>{content}</p>
                    </li>
                    ))}
                </ul>
        )}
        </>
    )
    

};

export default Reviews;