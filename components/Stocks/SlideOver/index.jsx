import {
  Fragment,
  Key,
  ReactChild,
  ReactFragment,
  ReactPortal,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, XIcon } from "@heroicons/react/outline";
import { PencilIcon, PlusSmIcon } from "@heroicons/react/solid";

const SlideOver = ({
  isOpened,
  setOpen,
  company,
  ticket,
  image,
  data,
  information,
  children,
}) => {
  const analysts = [
    { name: "Buy", stat: information.recommendations?.buy },
    { name: "Hold", stat: information.recommendations?.hold },
    { name: "Sell", stat: information.recommendations?.sell },
  ];

  return (
    <Transition.Root show={isOpened} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-96">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full bg-white p-8 overflow-y-auto">
                  <div className="pb-16 space-y-6">
                    <div>
                      <div className="flex flex-auto">
                        <h3 className="text-3xl text-gray-900">{company}</h3>

                        <img
                          src={image}
                          alt=""
                          height="30px"
                          width="30px"
                          style={{ marginLeft: "40%" }}
                        />
                      </div>
                      <h4 className="text-1xl text-gray-900">{ticket}</h4>
                      <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">Current Price</dt>
                          <dd className="text-gray-900">
                            {"$"}
                            {data.price}
                          </dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">1y High</dt>
                          <dd className="text-gray-900">
                            {"$"}
                            {information.basicFinancials?.["52WeekHigh"]}
                          </dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">1y Low</dt>
                          <dd className="text-gray-900">
                            {"$"}
                            {information.basicFinancials?.["52WeekLow"]}
                          </dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">
                            Dividend per Share Annual
                          </dt>
                          <dd className="text-gray-900">
                            {"$"}
                            {
                              information.basicFinancials?.[
                                "dividendPerShareAnnual"
                              ]
                            }
                          </dd>
                        </div>
                        <div className="py-3 flex justify-between text-sm font-medium">
                          <dt className="text-gray-500">
                            Market Capitalization
                          </dt>
                          <dd className="text-gray-900">
                            {"$"}
                            {
                              information.basicFinancials?.[
                                "marketCapitalization"
                              ]
                            }
                          </dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h3 className="text-md leading-6 font-medium text-gray-900">
                        Analyst Recommendations
                      </h3>
                      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {analysts.map((item) => (
                          <div
                            key={item.name}
                            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                          >
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              {item.name}
                            </dt>
                            <dd className="mt-1 text-2xl font-semibold text-gray-900">
                              {item.stat}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-md leading-6 font-medium text-gray-900">
                        Related News
                      </h3>
                      <div className="flow-root mt-6">
                        <ul
                          role="list"
                          className="-my-5 divide-y divide-gray-200"
                        >
                          {information?.news?.map((article) => (
                            <li key={article.id} className="py-5">
                              <div className="relative focus-within:ring-2 focus-within:ring-primary-blue-100">
                                <h3 className="text-sm font-semibold text-gray-800">
                                  <a
                                    href={article.url}
                                    target="_blank"
                                    className="hover:underline focus:outline-none"
                                    rel="noreferrer"
                                  >
                                    {/* Extend touch target to entire panel */}
                                    <span
                                      className="absolute inset-0"
                                      aria-hidden="true"
                                    />
                                    {article.headline}
                                  </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                                  {article.summary}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SlideOver;
