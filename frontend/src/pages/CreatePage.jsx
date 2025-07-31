import { useState } from 'react';
import { Box, Button, Container, Heading, Input, VStack } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster"
import { useColorModeValue } from "@/components/ui/color-mode"
import { useProductStore } from '../store/product';

const CreatePage = () => {

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  
  const { createProduct } = useProductStore()
  
  const handleAddProduct = async () => {
      const { success, message } = await createProduct(newProduct);
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
      setNewProduct({ name: '', price: '', image: '' });
  };

  return (
    <>
        <Container maxW={"container.sm"}>
          <VStack
            spacing={8}
          >
            <Heading as={"h1"} size={"2x1"} textAlign={"center"} mb={8}>
              Create New Product
            </Heading>
            <Box
              w={"full"} bg={useColorModeValue("white", "gray.800")}
              p={6} rounded={"lg"} shadow={"md"}
            >
              <VStack spacing={4}>
                <Input
                  placeholder='Product Name'
                  name='name'
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
                <Input
							    placeholder='Price'
							    name='price'
							    type='number'
							    value={newProduct.price}
							    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						    />
						    <Input
							    placeholder='Image URL'
							    name='image'
							    value={newProduct.image}
							    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						    />
                <Button colorPalette='blue' onClick={handleAddProduct} w={"full"}>
                  Add Product
                </Button>
              </VStack>
            </Box>
          </VStack>
          <Toaster />
        </Container>
    </>
  );
}

export default CreatePage;