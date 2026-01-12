import { useState } from "react";
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

export function ShoppingCart() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Cart</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Your Cart</DialogTitle>
          <DialogDescription>
            Review your selected items before checkout.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between p-3">
          <div>
            <p className="font-medium">Dummy Product</p>
            <p className="text-sm text-muted-foreground">
              Quantity: {quantity}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon-sm" onClick={decrease}>
              -
            </Button>
            <span className="w-6 text-center">{quantity}</span>
            <Button variant="outline" size="icon-sm" onClick={increase}>
              +
            </Button>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button onClick={() => {}}>Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
