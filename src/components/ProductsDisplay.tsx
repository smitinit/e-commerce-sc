// Each product shows:
//          - Image done
//          - Title done
//          - Price done
//          - Category done
//          - “Add to Cart” button done
// Includes:
//          - Search bar (filter by title) done
//          - Optional category filter done

import { AppDispatch, cartActions } from "@/store/cart";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowBigRight, Loader, StepBack, StepForward } from "lucide-react";
import { Input } from "./ui/input";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
  // const cartItems = useSelector((state: RootState) => state.cart.items);

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

  // pagination

  const [totalProductPerPage, setTotalProductPerPage] = useState<number>(6);

  // present page state
  const [currentPage, setCurrentPage] = useState(1);

  // find the total page according to filter data and total product per page constant
  const totalPage = Math.ceil(filteredProducts.length / totalProductPerPage);

  // apply pagination
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * totalProductPerPage,
    (currentPage - 1) * totalProductPerPage + totalProductPerPage
  );

  // next page
  function handlePaginationNext() {
    setCurrentPage(currentPage + 1 > totalPage ? totalPage : currentPage + 1);
  }
  // previous page
  function handlePaginationPrevious() {
    setCurrentPage(currentPage - 1 === 0 ? 1 : currentPage - 1);
  }

  // reset the page to 1 if search or filter is applied
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, filterInputValue, totalProductPerPage]);

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
        <aside className="flex flex-col p-2 gap-4 w-[15%] mt-10">
          <Badge className="text-xs">Filter by Category</Badge>
          <RadioGroup
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            {allCategories.map((filter, i) => (
              <div className="flex items-center gap-3 " key={filter}>
                <RadioGroupItem
                  value={filter}
                  id={"filter" + i}
                  className="cursor-pointer"
                />
                <Label htmlFor={"filter" + i}>{filter}</Label>
              </div>
            ))}
          </RadioGroup>
          {/* small metrics */}
          <div className="mt-6">
            <Badge className="text-xs ">metrics</Badge>
            <Label className="text-lg ">
              Page {currentPage} of {totalPage}
              <br />
              {selectedCategory}({filteredProducts.length})
            </Label>
          </div>

          <div className="mt-6">
            <Badge className="text-xs my-2">product per page</Badge>
            <Select
              defaultValue="6"
              onValueChange={(value) => setTotalProductPerPage(Number(value))}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Product per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Total Product Per Page</SelectLabel>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </aside>

        {/* rendering of products */}
        {!isLoading ? (
          <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-2 my-4 ">
            {filteredProducts.length > 0 ? (
              paginatedProducts.map((product) => {
                // const isAlreadyExist = cartItems.some(
                //   (item) => item.id === product.id
                // ); removed as per the request
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
                      // disabled={isAlreadyExist} removed as per the request
                      onClick={() => {
                        toast(
                          <p>
                            <span className="text-primary font-bold">
                              "{product.title}"{" "}
                            </span>
                            has been added to cart.
                          </p>,
                          {
                            description: (
                              <span className="font-semibold">
                                Price: <Badge>₹ {product.price}</Badge>
                              </span>
                            ),
                            action: {
                              label: <span>Undo</span>,
                              onClick: () => {
                                toast(
                                  <p>
                                    <span className="text-primary font-bold">
                                      "{product.title}"{" "}
                                    </span>
                                    has been removed from the cart.
                                  </p>
                                );
                                dispatch(
                                  cartActions.decreaseItemQuantity(product.id)
                                );
                              },
                            },
                          }
                        );
                        dispatch(
                          cartActions.addItem({
                            id: product.id,
                            title: product.title,
                            price: product.price,
                          })
                        );
                      }}
                    >
                      Add to Cart
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
      <div className="sticky bottom-2 w-full flex justify-end items-center ">
        <div className="p-4 rounded border shadow-2xl bg-background flex gap-2">
          <Button
            size={"sm"}
            onClick={handlePaginationPrevious}
            type="button"
            disabled={currentPage === 1}
          >
            <StepBack className="h-4 w-4 " />
          </Button>
          {Array.from({ length: totalPage }).map((_, i) => (
            <Button
              size={"sm"}
              variant={i + 1 === currentPage ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
              key={i}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            size={"sm"}
            onClick={handlePaginationNext}
            type="button"
            disabled={currentPage === totalPage}
          >
            <StepForward className="h-4 w-4 " />
          </Button>
        </div>
      </div>
    </main>
  );
}
