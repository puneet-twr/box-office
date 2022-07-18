import React from "react";
import { useEffect, useReducer } from "react";
import { act } from "react-dom/test-utils";
import { useParams } from "react-router-dom";
import Cast from "../components/show/Cast";
import Details from "../components/show/Details";
import Seasons from "../components/show/Seasons";
import ShowMainData from "../components/show/ShowMainData";
import { apiGet } from "../misc/config";
import { useShow } from "../misc/custom-hooks";
import { InfoBlock, ShowPageWrapper } from "./Show.sytled";



const Show = () => {
  const { id } = useParams();

  const {show, isLoading, error} = useShow(id);
  
  if (isLoading) {
    return <div>page is loading</div>;
  }
  if (error) {
    <div>Error occured:{error} </div>;
  }
  return <ShowPageWrapper>
    <ShowMainData image={show.image} name={show.name} rating={show.rating} summary={show.summary} tags={show.genres}  />

    <InfoBlock>
        <h2>Details</h2>
        <Details status={show.status} network={show.network} premiered={show.premiered } />
    </InfoBlock>

    <InfoBlock  >
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
    </InfoBlock>

    <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
    </div>
  </ShowPageWrapper>;
};

export default Show;
