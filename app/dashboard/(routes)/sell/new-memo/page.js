"use client"
import {Input} from "@/components/ui/input";
import ServicesEntryMemo from "@/components/servicesEntryMemo";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import Loading from "@/components/Loading";
// import { Cookies } from "react-cookie";
// import jwtDecode from "jwt-decode";
import Printable_file from "@/components/printFormat";
import { ToastContainer, toast } from 'react-toastify';
import { useSession } from "next-auth/react";
import { BACKEND_URL } from "@/Backend_Configure";

// import { uuid } from "uuidv4";

const initialState = {
    serviceName: "",
    servicesID: "",
    product_code: "",
    description: "",
    price: '',
    
    quintity: '',
    total: '',
}

const date = new Date();
const currentDate = {
    fullYear : date.getFullYear(),
    day: date.getDate().toLocaleString(),
    months: date.getMonth() + 1
}


export default function NewMemo() {
    const session = useSession()
    // const cookie = new Cookies()
    const [loading, setLoading] = useState(false)
    const [cardCategoryList, setCardCategoryList] = useState([])
    const [serviceType, setServiceType] = useState([])
    const [cardServiceType, setCardServiceType] = useState([])

    const [servicesAll, setServicesAll] = useState([initialState])
    const [readyPrint, setReadyPrint] = useState(false)
    const [readyPrintLoading, setReadyPrintLoading] = useState(false)
    const [memoNumber, setMEmoNumber] = useState("")





    const [customer, setCustomer] = useState({
        card_number: '',
        card_category_id: '',
        service_type_id: '',
        name: '',
        number: '',
        address: '',
        vichal_no: '',
        vichal_model: '',
        card_price: '',
    })

    const HTTP_TIMEOUT = 8000;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HTTP_TIMEOUT);


    console.log(customer);
    


    useEffect(() => {

        // genarete auto memo number
        const yearChar = ['0','A','B','C','D','E','F','G','H','I']

        const currentYear = new Date().getFullYear().toString()

        let month = new Date().getMonth()+1;


        if (month < 10) {
            month = '0' + month;
        }

        const newId = []
        // let x = "";

        for (let i = 0; i < currentYear.length; i++) {
            const yy = yearChar[Number(currentYear[i])]
            newId.push(yy)
        } 

        const m = newId.join("")

        // x = `MAUT-${m}${month}${new Date().getDate()}`
        // console.log(x);


        const memoNumberFetchData = async () => {
            const serviceTotal = await fetch(`${BACKEND_URL}/today-Total-Sell/`)

            if (serviceTotal.ok && serviceTotal.status === 200) {
                const data = await serviceTotal.json();

                setMEmoNumber(`MAUT-${m}${month}${new Date().getDate()}000${data?.ts + 1}`)

            }
        }

        memoNumberFetchData()


        const fetchData = async () => {
            const res = await fetch(`${BACKEND_URL}/get_service_type/`);
            if (res.ok) {
                const data = await res.json();
                setCardServiceType(data.st)
                setServiceType(data?.st)
                
            }
            

        }
        fetchData()

        const cardCategoryFetchData = async () => {
            const cardCategory = await fetch(`${BACKEND_URL}/card-category/`)
            if (cardCategory.ok) {
                const data = await cardCategory.json();
                setCardCategoryList(data.ct)
                
            }
        }
        cardCategoryFetchData()

    }, [])


    const inputNumberHandler = async (ev) => {
        
        setCustomer({...customer, number: ev.target.value})
        const res = await fetch(`${BACKEND_URL}/customer`);
        const data = await res.json();
        
        // if (res.status === 200) {
        //     const xData = data.cps.filter(item => item.number ===  ev.target.value)
        //     if (xData.length > 0) {    
        //         setCardCategoryList(xData[xData.length - 1]?.card_category)            
        //         setCustomer((prev) => {
        //             return {...prev, name: xData[xData.length - 1].name, number: xData[xData.length - 1].number, address: xData[xData.length - 1].addrss, vichal_no: xData[xData.length - 1].vichal_no, card_number: xData[xData.length - 1].card_number, vichal_model: xData[xData.length - 1].vichal_model}
        //         })
        //     } 
        // }

        if (res.status === 200) {
            const xData = data.cps.filter(item => item.number ===  ev.target.value)

            
            if (xData.length > 0) {
                const cardCategoryRes = await fetch(`${BACKEND_URL}/card-category/`, {
                    method: "POST",
                    // mode: "cors",
                    body: JSON.stringify({card_category_id: xData[xData.length - 1].card_category_id})
                })
    
                if (cardCategoryRes.ok) {
                    const data = await cardCategoryRes.json()

                    const cardTypeRes = await fetch(`${BACKEND_URL}/get_service_type/`, {
                        method: "POST",
                        // mode: "cors",
                        body: JSON.stringify({service_type_id: xData[xData.length - 1].service_type_id})
                    })

                    if (cardTypeRes.ok && res.status === 200) {
                        const serviceData = await cardTypeRes.json()
                        // setCardServiceType(serviceData?.s_type)
                        // setCardCategoryList(data.ct)                 
                        setCustomer((prev) => {
                            return {...prev, name: xData[xData.length - 1].name, number: xData[xData.length - 1].number, address: xData[xData.length - 1].addrss, vichal_no: xData[xData.length - 1].vichal_no, card_number: xData[xData.length - 1].card_number, vichal_model: xData[xData.length - 1].vichal_model}
                        })
                    }
                    
                }  

            } 
        }
        
        



    }


    const inputCardHandler = async (ev) => {
        setCustomer({...customer, card_number: ev.target.value})


        const res = await fetch(`${BACKEND_URL}/customer`);
        const data = await res.json();
        
        
        if (res.status === 200) {
            const xData = data.cps.filter(item => item.card_number ===  ev.target.value)
            

            let card_renew_info = null

            
            if (xData.length > 0) {
                const cardCategoryRes = await fetch(`${BACKEND_URL}/card-category/`, {
                    method: "POST",
                    // mode: "cors",
                    body: JSON.stringify({card_category_id: xData[xData.length - 1].card_category_id})
                })
    
                if (cardCategoryRes.ok) {
                    const data = await cardCategoryRes.json()

                    const cardTypeRes = await fetch(`${BACKEND_URL}/get_service_type/`, {
                        method: "POST",
                        // mode: "cors",
                        body: JSON.stringify({service_type_id: xData[xData.length - 1].service_type_id})
                    })

                    if (cardTypeRes.ok && res.status === 200) {
          
                        const serviceData = await cardTypeRes.json()

                        const renewCardData = await fetch(`${BACKEND_URL}/renew_card/`)

                        if (renewCardData.ok) {
                            const renewData = await renewCardData.json()
        
                        

                            const originRenew = renewData?.card_renew?.filter(card_renew => card_renew?.cp_id === xData[xData.length - 1]?.id)

                            if (originRenew?.length) {
                                card_renew_info = originRenew
                            } 
                            
                        }
                        
                        

                        

                        
                        // setCardServiceType(serviceData?.s_type)

                        // setCardCategoryList(data.ct)  

                        setCustomer((prev) => {
                            return {...prev, name: xData[xData.length - 1].name, number: xData[xData.length - 1].number, address: xData[xData.length - 1].addrss, vichal_no: xData[xData.length - 1].vichal_no, card_number: xData[xData.length - 1].card_number, card_price: card_renew_info ? card_renew_info[0].ammount + data?.ct[0].card_price : data?.ct[0].card_price,  vichal_model: xData[xData.length - 1].vichal_model}
                        })
                    }
                    
                }  

            } 
        }



    }


    
    

    const submitCustomerHandler = async (ev) => {
        ev.preventDefault()

        // const decode_token = jwtDecode(cookie.get('token'))

        const user = {
            user_id: session?.data?.user?.email,
            username: session?.data?.user?.name,
        }
        


        if (customer.name === '' || customer.address === '' || customer.number === '') {
            
            toast.error('must be added the name addess and phone number', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            setLoading(false)

            return;
        }


        
        try {
            setLoading(true)



            const customerinfoAndServices = {
                card_number: customer.card_number,
                card_category_id: customer.card_category_id,
                name: customer.name,
                number: customer.number,
                address: customer.card_category_id,
                vichal_no: customer.vichal_no,
                description: customer?.description,        
                vichal_model: customer.vichal_model,
            }


            const cardNumberResponse = await fetch(`${BACKEND_URL}/customer`, {signal: controller.signal})

            if (cardNumberResponse.ok) {
                const getCardNumber = await cardNumberResponse.json()
                const xData = getCardNumber.cps.filter(users => users.card_number ===  customer.card_number)

                

                if (xData?.length > 0) {
                    // check card validity
                    const cardValidate = await fetch(`${BACKEND_URL}/card-validate-check/`, {
                        method: "POST",
                        // mode: "cors",
                        signal: controller.signal,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({card_number: xData[xData.length - 1].card_number})
                    });


                    if (cardValidate.ok && cardValidate.status === 200) {
                        const cardValidateDate = await cardValidate.json()


  
                        if (new Date() <= new Date(cardValidateDate?.exp_date)) {

                            // cheack card times
                            

                            const postData = await fetch(`${BACKEND_URL}/new-memo`, {
                                method: "POST",
                                // mode: "cors",
                                signal: controller.signal,
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({...customerinfoAndServices, memo_number: memoNumber, services: {...servicesAll}, user})
                            })
                            
                            if (postData.ok) {
                                const data = await postData.json();

                                if (!data?.success) return toast.error('something wrong')
                                
                                setLoading(false)
                                setReadyPrintLoading(true)
                                
        
                                if (data) {
                                    setTimeout(() => {
                                        setReadyPrintLoading(false)
                                    
        
                                        setReadyPrint(true);

                                    }, 5000)
                                    
                                }
                            }
                        } else {
                            setLoading(false)
                            toast.info('Card is Expired', {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                        }

                    }
                } else {
                    setLoading(true)
                    const temporary_Customer = {
                        name: customer.name,
                        number: customer.number,
                        address: customer.address,
                        vichal_no: customer.vichal_no,
                        vichal_model: customer.vichal_model
                        
                    }
                    const postData = await fetch(`${BACKEND_URL}/temporary_profile/`, {
                        method: 'POST',
                        // mode: "cors",
                        signal: controller.signal,
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({temporary:temporary_Customer, memo_number: memoNumber, services: {...servicesAll}, user}) //user
                    })
    
                    if (postData.ok) {
                        const data = await postData.json();
                        if (!data?.success) return toast.error('something wrong')

                        setLoading(false)
                        setReadyPrintLoading(true)
                        
                        if (data) {
                            setTimeout(() => {
                                setReadyPrintLoading(false)
                            

                                setReadyPrint(true);


                            }, 5000)
                            
                        }


                    }

                    
                }
            } 


        } catch (error) {
            setLoading(false)
  
            
        }


    }


    const addCustomerWithCard = async () => {

        // const decode_token = jwtDecode(cookie.get('token'))

        const user = {
            user_id: session?.data?.user?.email,
            username: session?.data?.user?.name,
        }
        
        const addNewCustomerWithCard = {
            name: customer.name,
            number: customer.number,
            address: customer.address,
            vichal_no: customer.vichal_no,
            vichal_model: customer.vichal_model,
            card_number: customer.card_number,
            card_category_id: customer.card_category_id,
            service_type_id: customer.service_type_id,
        }
        if (customer.card_number === '' || customer.card_category_id === '' || customer.name === '' || customer.number === '' || customer.card_category_id === '' || customer.service_type_id === '' || customer.address === '' || customer.vichal_no === '' || customer.vichal_model === '') {
            toast.error('Please fill up all', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            
            return
        }
        setLoading(true)

        const postNewCard = await fetch(`${BACKEND_URL}/customer`, {
            method: 'POST',
            // signal: controller.signal,
            // mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({...addNewCustomerWithCard, user}) //user

        })

        if (postNewCard.ok) {
            setLoading(false);
            const data = await postNewCard.json();
            setCustomer({...customer, address: "", name: "", card_number: "", number: "", vichal_no:"", vichal_model: ""})

            return toast.info(data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });

            
        }
    }
    


    if (loading) return <Loading sms="Wait a moments...." />
    if (readyPrintLoading) return <Loading sms="Genarate Printing File ...." />
    if (readyPrint) return <Printable_file custome_details={customer} memo_number={memoNumber} service={servicesAll} currentDate={currentDate} />
    
    

    return (
        <div className="px-5">
            {/* {error && <p className="text-red-700 text-2xl text-center">{error}</p>} */}
            <h3 className="text-2xl">Entry new cash memo</h3>

            <form className="py-5" onSubmit={submitCustomerHandler}>
                <div className="grid md:grid-cols-3 gap-2">
                    <div className="mb-3">
                        <label>Name  </label>
                        <Input value={customer.name} onChange={ev => setCustomer({...customer, name: ev.target.value})} />
                    </div>
                    <div className="">
                        <label>Phone</label>
                        <Input value={customer.number} onChange={inputNumberHandler} />
                    </div>
                    <div className="">
                        <label>Card Number</label>
                        <Input value={customer.card_number} onChange={inputCardHandler}/>
                    </div>
                    <div className="">
                        <label>Card Price</label>
                        <Input disabled value={customer.card_price} onChange={ev => setCustomer({...customer, address: ev.target.value})}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Date</label>
                        <Input value={`${currentDate.day}-${currentDate.months}-${currentDate.fullYear}`} onChange={ev => setCustomer({...customer, date: ev.target.value})} disabled />
                    </div>
                    <div className="flex flex-col">
                        <label>Vehicle No</label>
                        <Input value={customer.vichal_no} onChange={ev => setCustomer({...customer, vichal_no: ev.target.value})} required/>
                    </div>
                    <div className="flex flex-col">
                        <label>Address</label>
                        <Input value={customer.address} onChange={ev => setCustomer({...customer, address: ev.target.value})} required/>
                    </div>
                    <div className="flex flex-col">
                        <label>Card category</label>
                        <select onChange={ev => setCustomer({...customer, card_category_id: ev.target.value})} className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-600">
                            {cardCategoryList?.length > 1 && <option>Choose a category</option>}
                            {cardCategoryList?.map((c_type, index) => (
                                <option key={index} value={c_type?.id}>{c_type?.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="Service-Type">Card Service Type</label>
                        <select id="Service-Type" onChange={ev => setCustomer({...customer, service_type_id: ev.target.value})} className="w-full p-2 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-600" required>
                            {cardServiceType.length > 1 && <option>Choose a Service</option>}
                            {cardServiceType?.map((st_type, index) => (
                                <option key={index} value={st_type?.id}>{st_type?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label>Vichal model</label>
                        <Input value={customer.vichal_model} onChange={ev => setCustomer({...customer, vichal_model: ev.target.value})} />
                    </div>
                    
                </div>
                <Button onClick={addCustomerWithCard} type="button" className="my-3 bg-gray-600">Add Customer With Card</Button>


                <div className="py-5">
                    <h3 className="text-2xl pb-3">Services</h3>
                    <Button onClick={() => setServicesAll([...servicesAll, {...initialState}])} type="button" className=" bg-gray-600 my-3">Add row</Button>

                    <div className="grid md:grid-cols-7 gap-2">
                        {servicesAll?.map((row, index) => (
                            <ServicesEntryMemo key={index} index={index} servicesAll={servicesAll} setServicesAll={setServicesAll} serviceType={serviceType} />
                        ))}
                    </div>
                    <Button className="my-5" type="submit">
                        Save
                    </Button>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}
