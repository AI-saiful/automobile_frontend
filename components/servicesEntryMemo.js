
import {Input} from "@/components/ui/input";
// import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export  default function ServicesEntryMemo({servicesAll, setServicesAll, serviceType, index}) {



    const handleRemoveService = (index) => {
        const list = [...servicesAll];
        list.splice(index, 1)
        setServicesAll(list)
    }

    


    const handleServiceChange = (ev, index) => {

        
        const list = [...servicesAll];
        
        list[index][ev.target.name] = ev.target.value;
        // list[index]['total'] = servicesAll?.price * servicesAll?.quintity);

        list[index]['total'] = Number(list[index]['price']) * Number(list[index]['quintity'])
        
        
        
        // list[index]['serviceName'] = ev.target.innerText;
        
        setServicesAll(list)
    }

    const changeService = (ev, index) => {
        if (ev.target.value === 'Choose a service') return
        // console.log(ev.target[ev.target.value].innerText);
        const list = [...servicesAll];
        list[index]['serviceName'] = ev.target[ev.target.value].innerText;
        list[index]['servicesID'] = ev.target.value;
        setServicesAll(list)
    }

    console.log(servicesAll);



    
    


    return (
        <>
            <div className="relative w-full lg:max-w-sm">
                <select name="servicesID" onChange={ev => changeService(ev, index)} className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-600">
                        <option>Choose a service</option>
                   
                        {serviceType?.map((s_type, index) => (
                            <option key={index} value={s_type?.id}>{s_type?.name}</option>
                        ))}
                </select>
            </div>

            <Input name="product_code" value={servicesAll[index].product_code} onChange={(ev) => handleServiceChange(ev, index)} placeholder="Enter Product Code" />
            <Input name="description" value={servicesAll[index].description} onChange={(ev) => handleServiceChange(ev, index)} placeholder="Description" />
            <Input name="price" value={servicesAll[index].price} onChange={(ev) => handleServiceChange(ev, index)} placeholder="Price" />
            <Input name="quintity" value={servicesAll[index].quintity} onChange={(ev) => handleServiceChange(ev, index)} placeholder="Quantity"/>
            <Input name="total" value={servicesAll[index].total} disabled placeholder="Total" />
            {servicesAll?.length > 1 && <Button className="bg-red-700" type="button" onClick={() => handleRemoveService(index)}>{<X />}</Button>}
        </>
    )
}
