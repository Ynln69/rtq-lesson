import classNames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import styles from "./Button.module.css";
import {
  useGetCommentsQuery,
  useUpdateCommentCountMutation,
} from "../../redux/commentApi";

export const Button = ({ children, counter, role = "thumbsUp", id }) => {
  const variants = {
    [styles.thumbsUp]: role === "thumbsUp",
    [styles.thumbsDown]: role === "thumbsDown",
  };
  const { data } = useGetCommentsQuery();
  const [updateComment, { isSuccess: updateCommentIsSuccess, isLoading }] =
    useUpdateCommentCountMutation();

  const onBtnHandleClick = () => {
    const comment = data.find((comment) => comment.id === id);
    const body = { ...comment, [role]: counter + 1 };
    updateComment({ id, body });
  };

  // const comment = {thumbsUp: 1, thumbsDown: 2}
  // const role = 'thumbsUp';
  // comment[role]
  // comment.thumbsUp;
  // comment['thumbsUp']

  return (
    <>
      {updateCommentIsSuccess && alert("Thanks")}

      <button
        className={classNames(styles.button, variants)}
        type="button"
        counter={counter}
        onClick={onBtnHandleClick}
        id={id}
      >
        {children}

        <span className={styles.counter}>
          <span></span>
          {counter}
        </span>
      </button>
    </>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  counter: PropTypes.number.isRequired,
  role: PropTypes.string,
  id: PropTypes.string.isRequired,
};
