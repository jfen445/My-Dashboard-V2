import React, { Fragment } from "react";
import Form from "./Form";
import Error from "./Error";
import Loader from "./Loader";
import Forecast from "./Forecast";
import useForecast from "../../hooks/useForecast";

const Weather = () => {
  const { isError, isLoading, forecast, submitRequest } = useForecast();

  React.useEffect(() => {
    submitRequest("Auckland");
  }, []);

  const onSubmit = (value) => {
    submitRequest(value);
  };

  return (
    <>
      <Fragment>
        <div className="w-full">
          <div className={`position-relative`}>
            {/* Form */}
            {!isLoading && <Form submitSearch={onSubmit} />}
            {/* Error */}
            {isError && <Error message={isError} />}
            {/* Loader */}
          </div>
          <div>
            {isLoading ? (
              <Loader />
            ) : (
              forecast && <Forecast forecast={forecast} />
            )}
          </div>
        </div>
      </Fragment>
    </>
  );
};

export default Weather;
