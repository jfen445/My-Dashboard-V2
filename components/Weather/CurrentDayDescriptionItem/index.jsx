import React from "react";
import PropTypes from "prop-types";

const CurrentDayDescriptionItem = ({ name, value, unit }) => (
  <div className="flex flex-row relative">
    <div className="object-left capitalize font-semibold">{name}</div>
    <div className="absolute inset-y-0 right-0">
      {value} {unit}
    </div>
  </div>
);

CurrentDayDescriptionItem.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  unit: PropTypes.string.isRequired,
};

export default CurrentDayDescriptionItem;
