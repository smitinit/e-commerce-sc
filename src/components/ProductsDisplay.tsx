// Each product shows:
//          - Image done
//          - Title done
//          - Price done
//          - Category done
//          - “Add to Cart” button done
// Includes:
//          - Search bar (filter by title) done
//          - Optional category filter done

import { AppDispatch, cartActions, RootState } from "@/store/cart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowBigRight, CircleCheck, Loader } from "lucide-react";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
}

interface ProductsResponse {
  products: Product[];
}

export function ProductsDisplay() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [products, setProducts] = useState<Product[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filterInputValue, setFilterInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // fetch all products from api
  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        // fake timeout
        // await new Promise((res) => setTimeout(res, 1000));
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: ProductsResponse = await res.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // get all different category from products
  const allCategories = ["all", ...new Set(products.map((p) => p.category))];

  // filter the products
  const filteredProducts = products.filter((product) => {
    // filter by search text
    if (!product.title.toLowerCase().includes(filterInputValue.toLowerCase())) {
      return false;
    }

    // filter by category
    if (selectedCategory !== "all" && product.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  // if error show error
  if (error)
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );

  return (
    <main className="flex flex-col">
      {/* search bar */}
      <div className="flex flex-row items-center px-2 my-2 ">
        <Label className="w-[15%] text-lg">
          Search Products <ArrowBigRight className="h-4 w-4" />
        </Label>
        <Input
          className="flex-1"
          type="text"
          placeholder="Search any products..."
          value={filterInputValue}
          onChange={(e) => setFilterInputValue(e.target.value)}
        />
      </div>
      <div className="flex flex-row">
        {/* category filter */}
        <aside className="flex flex-col p-2 gap-4 w-[15%]">
          <Label className="text-lg">Filter Category</Label>
          <RadioGroup
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            {allCategories.map((filter, i) => (
              <div className="flex items-center gap-3" key={filter}>
                <RadioGroupItem value={filter} id={"filter" + i} />
                <Label htmlFor={"filter" + i}>{filter}</Label>
              </div>
            ))}
          </RadioGroup>
        </aside>

        {/* rendering of products */}
        {!isLoading ? (
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 my-4 h-[calc(100vh)] overflow-auto">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const isAlreadyExist = cartItems.some(
                  (item) => item.id === product.id
                );
                return (
                  <div
                    key={product.id}
                    className="border rounded-md p-3 flex flex-col gap-2 h-fit"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-40 object-cover rounded"
                    />

                    <h3 className="font-medium">{product.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      Category: <Badge>{product.category}</Badge>
                    </p>

                    <p className="font-semibold italic">₹{product.price}</p>

                    <Button
                      variant={"default"}
                      disabled={isAlreadyExist}
                      onClick={() =>
                        dispatch(
                          cartActions.addItem({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                          })
                        )
                      }
                    >
                      {isAlreadyExist ? (
                        <>
                          Added to Cart <CircleCheck className="h-4 w-4" />
                        </>
                      ) : (
                        "Add to Cart"
                      )}
                    </Button>
                  </div>
                );
              })
            ) : (
              <p>No Product found, try resetting your filters!</p>
            )}
          </div>
        ) : (
          // initial loading indicator
          <div className="h-screen flex justify-center items-center w-full">
            <p className="flex gap-2 items-center">
              <Loader className="h-4 w-4 animate-spin text-primary" />
              Loading...
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
