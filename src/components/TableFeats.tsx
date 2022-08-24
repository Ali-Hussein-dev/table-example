import { AiOutlineCheckCircle } from "react-icons/ai";

export const TableFeats = () => {
  const list = ["Sorting", "Filtering", "Pagination"];
  return (
    <div className="w-full px-5 py-3 space-y-2 bg-white rounded text-stone-700">
      <div>
        <h2 className="mb-1 text-xl font-bold">Table Functionalities</h2>
        <ul className="row-start gap-x-3">
          {list.map((str) => (
            <li key={str} className="row-start gap-x-3">
              <AiOutlineCheckCircle size={16} className="text-teal-500" />
              {str}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="mb-1 text-xl font-bold">Libs</h2>
        <ul className=" row-start gap-x-3">
          {["React-Table 8", "Mantine", "React-Icons"].map((str) => (
            <li key={str} className="row-start gap-x-3">
              <AiOutlineCheckCircle size={16} className="text-teal-500" />
              {str}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
