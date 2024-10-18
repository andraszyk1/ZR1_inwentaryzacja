import { ExcelDateToJSDate } from "../helpers/ExcelDateToJsDate";
import { itemsHeadings } from "../helpers/headings";
import { trimString } from "../helpers/trimString";
import ArrowLeftIcon from "./ArrowLeftIcon";
import DeleteIcon from "./DeleteIcon";
import EditIcon from "./EditIcon";
import Spinner from "./Spinner";
import Td from "./Td";
function Table({
  items,
  isPending,
  handleEdit,
  handleDelete,
  setCurrentPage,
  currentPage,
  limit,
  setLimit,
}) {
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              {isPending ? (
                <Spinner />
              ) : items?.data?.length > 0 ? (
                <>
                  <table className="text-[11px] text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                      Ilość wyszukanych wierszy: {items?.countData}
                    </caption>
                    <thead className="text-[10px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200 p-4">
                        {itemsHeadings?.map((itemKey, index) => (
                          <th key={index} scope="col" className="px-1 py-0">
                            {itemKey}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {items?.data?.map(
                        ({
                          id,
                          lp,
                          data,
                          idPracownika,
                          osobaOdpowiedzialna,
                          nazwa,
                          lokalizacja,
                          producent,
                          model,
                          sn,
                          typ,
                          opis,
                          status,
                          nrInwentarzowyIt,
                          os,
                          mpk,
                          createdAt,
                          updatedAt,
                        }) => {
                          return (
                            <tr
                              key={id}
                              className="py-0 bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                              <Td item={id} />
                              <Td item={lp} />
                              <Td item={ExcelDateToJSDate(data)} />
                              <Td item={idPracownika} />
                              <Td item={osobaOdpowiedzialna} />
                              <Td item={nazwa} />
                              <Td item={lokalizacja} trim={6} />
                              <Td item={producent} />
                              <Td item={model} />
                              <Td item={sn} />
                              <Td item={typ} />
                              <Td item={opis} trim={10} />
                              <Td item={status} />
                              <Td item={nrInwentarzowyIt} />
                              <Td item={os} />
                              <Td item={mpk} />
                              <Td item={createdAt} />
                              <Td item={updatedAt} />
                              <td className="px-1 py-1">
                                <div className="flex flex-row justify-center text-center gap-2">
                                  <EditIcon onClick={() => handleEdit(id)} />
                                  <DeleteIcon
                                    onClick={() => handleDelete(id)}
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                  <div className="flex flex-row p-2 space-x-4 text-[10px] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <div>
                      <button onClick={() => setCurrentPage(1)}>
                        Pierwsza
                      </button>
                    </div>
                    <div>
                 
                      <button
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                      >
                      Poprzednia
                      </button>
                    </div>
                    <div>
                      {currentPage}/{items?.pages}
                    </div>
                    <div>
                      <button
                        disabled={currentPage >= items?.pages}
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                      >
                        Następna
                      </button>
                    </div>
                    <div>
                      <button onClick={() => setCurrentPage(items?.pages)}>
                        Ostatnia
                      </button>
                    </div>
                    <div>
                      <div className="flex flex-row space-x-2">
                        <label htmlFor="limit">Limit</label>
                        <select
                          value={limit}
                          title="Limit"
                          name="limit"
                          onChange={(e) => setLimit(e.target.value)}
                          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-1 py-1 pr-1 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                        >
                          <option value={1}>1</option>
                          <option value={2}>2</option>
                          <option value={4}>4</option>
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={20}>20</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                "Brak wyników wyszukiwania"
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Table;
