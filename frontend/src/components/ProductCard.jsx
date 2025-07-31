import { Box, Heading, HStack, IconButton, Image, Text, Dialog, Portal, CloseButton, VStack, Input, Button } from "@chakra-ui/react"
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useColorModeValue } from "@/components/ui/color-mode"
import { useProductStore } from "../store/product";
import { Toaster, toaster } from "@/components/ui/toaster"
import { useState } from "react";



const ProductCard = ({product}) => {

    const [ updatedProduct, setUpdatedProduct ] = useState(product);
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");

    const {deleteProduct, updateProduct} = useProductStore()
    const handleDeleteProduct = async (id) => {
        const {success, message} = await deleteProduct(id);
        if(!success) {
            toaster.create({
                description: message,
                title: "Error",
                status: "error",
                type: "error",
                duration: 3000,
                closable: true,
            })
        } else {
            toaster.create({
                description: message,
                title: "Success",
                status: "success",
                type: "success",
                duration: 3000,
                closable: true,
            });
        }
    }

    const handleUpdateProduct = async (id, updatedProduct) => {
        const { success, message } = await updateProduct(id, updatedProduct)
        if(!success) {
            toaster.create({
                description: message,
                title: "Error",
                status: "error",
                type: "error",
                duration: 3000,
                closable: true,
            })
        } else {
            toaster.create({
                description: "Product updated successfully",
                title: "Success",
                status: "success",
                type: "success",
                duration: 3000,
                closable: true,
            });
        }
    }

  return (
    <>
        <Box
            shadow={'lg'}
            rounded={'lg'}
            overflow={'hidden'}
            transition={'all 0.3s'}
            _hover={{transform: 'translateY(-5px)', shadow: 'xl'}}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}></Image>

            <Box p={4}>
                <Heading as="h3" size="md" mb={2}>
                    {product.name}
                </Heading>
                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                <Dialog.Root size="md" placement="center" motionPreset="slide-in-bottom">
                    <Dialog.Trigger asChild>
                    <IconButton colorPalette={'blue'} ><EditIcon /></IconButton>
                </Dialog.Trigger>
                <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                    <Dialog.Header>
                        <Dialog.Title>Update Product</Dialog.Title>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Header>
                <Dialog.Body>
                    <VStack spacing={4}>
                        <Input placeholder="Product Name" name='name'
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input placeholder="Product Price" name='price' type="number" 
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input placeholder="Product Image" name='image'
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                    </VStack>
                    <Dialog.Footer>
                        <Dialog.ActionTrigger asChild>
                            <Button colorPalette={'blue'} onClick={() => {handleUpdateProduct(product._id, updatedProduct)}}>Update</Button>
                        </Dialog.ActionTrigger>
                        <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Cancel</Button>
                        </Dialog.ActionTrigger>
                    </Dialog.Footer>
                </Dialog.Body>
                </Dialog.Content>
                </Dialog.Positioner>
                </Portal>
                </Dialog.Root>
                        
                <IconButton colorPalette={'red'} onClick={() => {handleDeleteProduct(product._id)}} ><DeleteIcon /></IconButton>
                </HStack>
            </Box>
            <Toaster />
        </Box>
    </>
  )
}

export default ProductCard