import { Product } from "@stripe/firestore-stripe-payments";
import { IconType } from "react-icons";
import { HiOutlineCheck, HiOutlineX } from "react-icons/hi";

interface Props {
  products: Product[];
  selectedPlan: Product;
  title?: string;
  value?: { a: string; b: string } | JSX.Element;
}

const Table = ({ products, selectedPlan }: Props) => {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              S${product.prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Video Quality</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.resolution}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan.id === product.id
                  ? "text-[#e50914]"
                  : "text-[gray]"
              }`}
            >
              {product.metadata.watchAnywhere === "true" ? (
                <HiOutlineCheck className="inline-block w-8 h-8" />
              ) : (
                <HiOutlineX className="inline-block w-8 h-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
export default Table;
