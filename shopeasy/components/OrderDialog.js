import { Button } from "./ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"


export function OrderDialog({ handleCheckout }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-[385px] h-[50px]  mt-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-lg transition-all duration-300">  Proceed to Checkout  </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>Are You Sure to Place The Order</DialogTitle>
                    <DialogDescription>
                        Payment will we Cash on delivery.
                        Other Option will be available soon.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    {/* <button  className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-lg transition-all duration-300"> */}
                    {/* <DialogClose  className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-lg transition-all duration-300" >
                            Place the Order
                        </DialogClose>    */}
                    {/* </button> */}
                    <div onClick={handleCheckout} >
                    <DialogClose asChild>
                        <button  className="w-[385px] h-[50px]  mt-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-lg transition-all duration-300">
                        Place the Order
                        </button>
                    </DialogClose>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
