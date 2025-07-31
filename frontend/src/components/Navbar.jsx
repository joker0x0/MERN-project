import { Button, Container, Flex, HStack, Text, Icon } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode"
import { Link } from "react-router-dom";

import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {

	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Container maxW={"1140px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
                    fontSize={{ base: "22px", sm: "28px" }}
                    fontWeight="bold"
                    textTransform="uppercase"
                    textAlign="center"
                    bgGradient="to-r"
                    gradientFrom="teal.500"
                    gradientTo="blue.600"
                    bgClip="text"
                >
                    <Link to="/">Product Store 🛒</Link>
                </Text>

				<HStack spacing={2} alignItems={"center"}>
					<Link to={"/create"}>
						<Button>
							<PlusSquareIcon fontSize={20} />
						</Button>
					</Link>
					<Button onClick={toggleColorMode} aria-label="Toggle color mode">
                        <Icon as={colorMode === "light" ? IoMoon : LuSun} boxSize={5} />
                    </Button>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;