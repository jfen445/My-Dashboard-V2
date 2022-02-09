import * as React from "react";
import PropTypes from "prop-types";

const Form = ({ submitSearch }) => {
  const [location, setLocation] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    submitSearch(location);
  };
  return (
    <form>
      <div className="flex mt-8 mb-4">
        <input
          type="text"
          id="email"
          className="shadow-sm block w-full sm:text-sm border-primary-blue-100 rounded-md focus:outline-none outline-none"
          placeholder="Search for a location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ width: "200px", height: "30px" }}
        />
        <button onClick={onSubmit}>SEARCH</button>
      </div>
    </form>
  );
};

Form.propTypes = {
  submitSearch: PropTypes.func.isRequired,
};

export default Form;
