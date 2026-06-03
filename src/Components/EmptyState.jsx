import React from "react";
import "../Style/EmptyState.css";

const EmptyState = () => {
  return (
    <div className="empty-state">

      <img
        src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
        alt="empty"
        className="empty-image"
      />

      <h2>Add some items</h2>

      <p>
        Select a category and add items to it.
      </p>

    </div>
  );
};

export default EmptyState;