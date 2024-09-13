"use client"
import ProductList, { Product as product } from "@/components/rendered/product/productList";
import { getSingleProduct } from "@/lib/dataFunctions";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { addProductToCart } from "@/lib/dataFunctions";

export default function Product() {
    const params = useParams();
    const { productId } = params;
    const { toast } = useToast()
    const [productData, setProductData] = useState<product | null>(null)
    const [currentImage, setCurrentImage] = useState<string>("")

    useEffect(() => {
        getSingleProduct(String(productId)).then((res) => {
            setProductData(res)
            setCurrentImage(res.thumbnail)
        })
    }, [])
    return (
        <>
            <div className="p-6 max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                        <Image
                            src={currentImage}
                            alt={productData?.title}
                            width={400}
                            height={400}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                        <div className="mt-4 flex space-x-4">
                            {productData?.images?.map((img, index) => (
                                <Image
                                    key={index}
                                    src={img}
                                    alt={`${productData?.title} image ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="w-24 h-24 object-cover rounded cursor-pointer"
                                    onClick={() => setCurrentImage(img)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-full md:w-1/2">
                        <h1 className="text-2xl font-bold mb-2">{productData?.title}</h1>
                        <p className="text-lg text-gray-700 mb-4">{productData?.description}</p>
                        <p className="text-xl font-semibold mb-2">Price: ${productData?.price?.toFixed(2)}</p>
                        <div className="m-2">
                            <Button onClick={() => {
                                addProductToCart(productData)
                                toast({
                                    title: `${productData.title} added to your cart`,
                                    action: (
                                        <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                                    ),
                                })
                            }}>Add to cart</Button>
                        </div>
                        <p className="text-md mb-2">Brand: {productData?.brand}</p>
                        <p className="text-md mb-2">Category: {productData?.category}</p>
                        <p className="text-md mb-2">Stock: {productData?.stock}</p>
                        <p className="text-md mb-2">Weight: {productData?.weight} kg</p>
                        <p className="text-md mb-2">Dimensions: {productData?.dimensions?.width}x{productData?.dimensions?.height}x{productData?.dimensions?.depth} cm</p>
                        <p className="text-md mb-2">Return Policy: {productData?.returnPolicy}</p>
                        <p className="text-md mb-2">Shipping Information: {productData?.shippingInformation}</p>
                        <p className="text-md mb-2">Warranty Information: {productData?.warrantyInformation}</p>
                        <p className="text-md mb-2">Minimum Order Quantity: {productData?.minimumOrderQuantity}</p>
                    </div>
                </div>
            </div>
            <ProductList limit={5} />
        </>
    );
}
