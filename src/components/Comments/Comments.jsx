import React from "react";
import { Comment } from "../Comment/Comment";
import { Grid } from "../Grid/Grid";
import { useGetCommentsQuery } from "../../redux/commentApi";
import { useSelector } from "react-redux";

export const Comments = () => {
  const filter = useSelector((state) => state.filter.filter);
  const { data } = useGetCommentsQuery();
  const getfilteredComments = () =>
    data.filter(({ content }) =>
      content.toLowerCase().includes(filter.toLowerCase())
    );
  return (
    <Grid>
      {data &&
        getfilteredComments().map((comment) => (
          <Comment key={comment.id} {...comment} />
        ))}
    </Grid>
  );
};
