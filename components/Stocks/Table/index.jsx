import * as React from "react";
import SlideOver from "../SlideOver/index";

const finnhub = require("finnhub");
const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = "c76d5pqad3if0oe29lq0"; // Replace this
const finnhubClient = new finnhub.DefaultApi();

var todayDate = new Date().toISOString().slice(0, 10);

var appleData = [];
var teslaData = [];
var microsoftData = [];
var nvidiaData = [];
var palantirData = [];

var appleInfo = [];

finnhubClient.companyBasicFinancials("AAPL", "all", (error, data, response) => {
  appleInfo.basicFinancials = data?.metric;
});
finnhubClient.recommendationTrends("AAPL", (error, data, response) => {
  appleInfo.recommendations = data[0];
});
finnhubClient.companyNews(
  "AAPL",
  "2021-09-01",
  todayDate,
  (error, data, response) => {
    appleInfo.news = data?.slice(0, 5);
  }
);

var teslaInfo = [];

finnhubClient.companyBasicFinancials("TSLA", "all", (error, data, response) => {
  teslaInfo.basicFinancials = data?.metric;
});
finnhubClient.recommendationTrends("TSLA", (error, data, response) => {
  teslaInfo.recommendations = data[0];
});
finnhubClient.companyNews(
  "TSLA",
  "2021-09-01",
  todayDate,
  (error, data, response) => {
    teslaInfo.news = data?.slice(0, 5);
  }
);

var microsoftInfo = [];

finnhubClient.companyBasicFinancials("MSFT", "all", (error, data, response) => {
  microsoftInfo.basicFinancials = data?.metric;
});
finnhubClient.recommendationTrends("MSFT", (error, data, response) => {
  microsoftInfo.recommendations = data[0];
});
finnhubClient.companyNews(
  "MSFT",
  "2021-09-01",
  todayDate,
  (error, data, response) => {
    microsoftInfo.news = data?.slice(0, 5);
  }
);

var nvidiaInfo = [];

finnhubClient.companyBasicFinancials("NVDA", "all", (error, data, response) => {
  nvidiaInfo.basicFinancials = data?.metric;
});
finnhubClient.recommendationTrends("NVDA", (error, data, response) => {
  nvidiaInfo.recommendations = data[0];
});
finnhubClient.companyNews(
  "NVDA",
  "2021-09-01",
  todayDate,
  (error, data, response) => {
    nvidiaInfo.news = data?.slice(0, 5);
  }
);

var palantirInfo = [];

finnhubClient.companyBasicFinancials("PLTR", "all", (error, data, response) => {
  palantirInfo.basicFinancials = data.metric;
});
finnhubClient.recommendationTrends("PLTR", (error, data, response) => {
  palantirInfo.recommendations = data[0];
});
finnhubClient.companyNews(
  "PLTR",
  "2021-09-01",
  todayDate,
  (error, data, response) => {
    palantirInfo.news = data?.slice(0, 5);
  }
);

function Table() {
  const [openApple, setOpenApple] = React.useState(false);
  const [openTesla, setOpenTesla] = React.useState(false);
  const [openMicrosoft, setOpenMicrosoft] = React.useState(false);
  const [openNVIDIA, setOpenNVIDIA] = React.useState(false);
  const [openPalantir, setOpenPalantir] = React.useState(false);

  React.useEffect(() => {
    finnhubClient.quote("AAPL", (error, data, response) => {
      appleData = data;
    });
    finnhubClient.quote("TSLA", (error, data, response) => {
      teslaData = data;
    });
    finnhubClient.quote("MSFT", (error, data, response) => {
      microsoftData = data;
    });
    finnhubClient.quote("NVDA", (error, data, response) => {
      nvidiaData = data;
    });
    finnhubClient.quote("PLTR", (error, data, response) => {
      palantirData = data;
    });
  }, []);

  const stocks = [
    {
      companyName: "Apple Inc.",
      ticketSymbol: "AAPL",
      price: appleData.c,
      priceChange: appleData.d,
      percentage: appleData.dp,
      setOpen: setOpenApple,
    },
    {
      companyName: "Microsoft Corporation",
      ticketSymbol: "MSFT",
      price: microsoftData.c,
      priceChange: microsoftData.d,
      percentage: microsoftData.dp,
      setOpen: setOpenMicrosoft,
    },
    {
      companyName: "NVIDIA Corporation",
      ticketSymbol: "NVDA",
      price: nvidiaData.c,
      priceChange: nvidiaData.d,
      percentage: nvidiaData.dp,
      setOpen: setOpenNVIDIA,
    },
    {
      companyName: "Palantir Technologies Inc.",
      ticketSymbol: "PLTR",
      price: palantirData.c,
      priceChange: palantirData.d,
      percentage: palantirData.dp,
      setOpen: setOpenPalantir,
    },
    {
      companyName: "Tesla Inc.",
      ticketSymbol: "TSLA",
      price: teslaData.c,
      priceChange: teslaData.d,
      percentage: teslaData.dp,
      setOpen: setOpenTesla,
    },
  ];

  return (
    <>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Company
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Ticket Symbol
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Current Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Change
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      %Change
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stocks.map((stock, personIdx) => (
                    <tr
                      key={stock.ticketSymbol}
                      className={
                        personIdx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {stock.companyName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {stock.ticketSymbol}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {"$"}
                        {stock.price}
                      </td>
                      <td
                        className={
                          stock.percentage > 0
                            ? "px-6 py-4 whitespace-nowrap text-sm text-green-500"
                            : "px-6 py-4 whitespace-nowrap text-sm text-red-500"
                        }
                      >
                        {"$"}
                        {stock.priceChange}
                      </td>
                      <td
                        className={
                          stock.percentage > 0
                            ? "px-6 py-4 whitespace-nowrap text-sm text-green-500"
                            : "px-6 py-4 whitespace-nowrap text-sm text-red-500"
                        }
                      >
                        {Math.round((stock.percentage + Number.EPSILON) * 100) /
                          100}{" "}
                        {"%"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => stock.setOpen(true)}>
                          See more
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <SlideOver
          isOpened={openApple}
          setOpen={setOpenApple}
          company="Apple Inc."
          ticket="AAPL"
          image="https://static.finnhub.io/logo/87cb30d8-80df-11ea-8951-00000000092a.png"
          data={stocks[0]}
          information={appleInfo}
        />
        <SlideOver
          isOpened={openMicrosoft}
          setOpen={setOpenMicrosoft}
          company="Microsoft Corporation"
          ticket="MSFT"
          image="https://finnhub.io/api/logo?symbol=MSFT"
          data={stocks[1]}
          information={microsoftInfo}
        />
        <SlideOver
          isOpened={openNVIDIA}
          setOpen={setOpenNVIDIA}
          company="NVIDIA Corporation"
          ticket="NVDA"
          image="https://finnhub.io/api/logo?symbol=NVDA"
          data={stocks[2]}
          information={nvidiaInfo}
        />
        <SlideOver
          isOpened={openPalantir}
          setOpen={setOpenPalantir}
          company="Palantir Technologies Inc"
          ticket="PLTR"
          image="https://finnhub.io/api/logo?symbol=PLTR"
          data={stocks[3]}
          information={palantirInfo}
        />
        <SlideOver
          isOpened={openTesla}
          setOpen={setOpenTesla}
          company="Tesla Inc."
          ticket="TSLA"
          image="https://finnhub.io/api/logo?symbol=TSLA"
          data={stocks[4]}
          information={teslaInfo}
        />
      </div>
    </>
  );
}

export default Table;
