"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";


export default function StockEntry() {

    const [newStock, setNewStock] = useState({
        product_name: "",
        brand_name: "",
        product_code: "",
        product_size: "",
        product_price: "",
        shipping_cost: "",
        quantity: "",
        product_image: "",
    })




    return (

        <div className="px-3 py-3">
            <h1 className="text-2xl">New Stock Entry</h1>

            <form>

                <div className="py-5 grid md:grid-cols-3 gap-2">
                    <div>
                        <Label>Product Name</Label>
                        <Input onChange={(ev => setNewStock({...newStock, product_name: ev.target.value}))} placeholder="Enter the Product name" />
                    </div>
                    
                    <div>
                        <Label>Brand name</Label>
                        <Input onChange={(ev => setNewStock({...newStock, brand_name: ev.target.value}))} placeholder="Enter the Brand name" />
                    </div>
                    
                    <div>
                        <Label>Product Code</Label>
                        <Input onChange={(ev => setNewStock({...newStock, product_code: ev.target.value}))} placeholder="Enter the Product Code" />
                    </div>
                    
                    <div>
                        <Label>Product Size</Label>
                        <Input onChange={(ev => setNewStock({...newStock, product_size: ev.target.value}))} placeholder="Enter the Product Size" />
                    </div>
                    

                    <div>
                        <Label>Product Price</Label>
                        <Input onChange={(ev => setNewStock({...newStock, product_price: ev.target.value}))} placeholder="Enter the Product Price" />
                    </div>
                    

                    <div>
                        <Label>Shiping Cost</Label>
                        <Input onChange={(ev => setNewStock({...newStock, shipping_cost: ev.target.value}))} placeholder="Enter the Shiping Cost" />
                    </div>
                    

                    <div>
                        <Label>Quantity</Label>
                        <Input onChange={(ev => setNewStock({...newStock, quantity: ev.target.value}))} placeholder="Enter the Quantity" />
                    </div>

                    <div>
                        <Label>Product Image</Label>
                        <Input className="cursor-pointer" onChange={(ev => setNewStock({...newStock, product_image: ev}))} type="file"  />
             
                    </div>
                </div>

                <Button type="submit">Save</Button>


            </form>
        </div>
    )
}