import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/cart";
import { cartActions } from "@/store/cart";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Minus, Plus, Trash } from "lucide-react";

export function ShoppingCart() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // count total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // add tax
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cart</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>
            Review your selected items before checkout.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {cartItems.length === 0 && (
            <p className="text-sm text-muted-foreground text-center">
              Your cart is empty.
            </p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-md p-3"
            >
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  ₹{item.price} x {item.quantity}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={() =>
                    dispatch(cartActions.decreaseItemQuantity(item.id))
                  }
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="w-6 text-center">{item.quantity}</span>

                <Button
                  variant="secondary"
                  size="icon-sm"
                  onClick={() =>
                    dispatch(
                      cartActions.addItem({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                      })
                    )
                  }
                >
                  <Plus className="h-4 w-4" />
                </Button>

                <Button
                  variant="destructive"
                  size="icon-sm"
                  onClick={() => dispatch(cartActions.removeItem(item.id))}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t pt-4 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            disabled={cartItems.length === 0}
            onClick={() => console.log("Checkout")}
          >
            Checkout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
