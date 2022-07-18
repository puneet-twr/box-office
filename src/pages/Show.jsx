import React from "react";
import { useEffect, useReducer } from "react";
import { act } from "react-dom/test-utils";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { isLoading: false, error: null, show: action.show };
    }
    case "FETCH_FAILED": {
      return { ...prevState, isLoading: false, error: action.error };
    }
    default:
      return prevState;
  }
};
const initialState = {
  show: null,
  isLoading: true,
  error: null,
};
const Show = () => {
  const { id } = useParams();

  const [{show, isLoading, error}, dispatch] = useReducer(reducer, initialState);
  

  useEffect(() => {
    let isMounted = true;
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then((results) => {
        if (isMounted) {
          dispatch({ type: "FETCH_SUCCESS", show: results });
        }
      })
      .catch((err) => {
        if (isMounted) {
            dispatch({ type: "FETCH_FAILED", error:err.message });
          
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);
  
  if (isLoading) {
    return <div>page is loading</div>;
  }
  if (error) {
    <div>Error occured:{error} </div>;
  }
  return <div>This is show page</div>;
};

export default Show;
