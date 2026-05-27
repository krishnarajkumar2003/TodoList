import { Actionsheet, Box, Circle, HStack, Input, Text, VStack } from "native-base";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, Modal, Pressable } from "react-native";

import NoTask from "../../assets/no_task.svg";
import Search from "../../assets/search.svg";

const TASKS = [
    {
        id: 1,
        title: "Buy Groceries",
        description: "Milk, Bread, Eggs, Fruits",
        status: "Pending",
        category: "Personal",
    },
    {
        id: 2,
        title: "Finish React Native UI",
        description: "Complete Home Screen design",
        status: "In Progress",
        category: "Work",
    },
    {
        id: 3,
        title: "Gym Workout",
        description: "Chest and Shoulder exercises",
        status: "Completed",
        category: "Personal",
    },
    {
        id: 4,
        title: "YouTube Comedy Script",
        description: "Write script for comedy reel",
        status: "Pending",
        category: "Work",
    },
    {
        id: 5,
        title: "Study Redux",
        description: "Learn reducers and actions",
        status: "In Progress",
        category: "Personal",
    },
    {
        id: 6,
        title: "Morning Meditation",
        description: "15 minutes mindfulness session",
        status: "Completed",
        category: "Personal",
    },
    {
        id: 7,
        title: "Client Meeting",
        description: "Discuss app requirements",
        status: "Pending",
        category: "Work",
    },
    {
        id: 8,
        title: "Watch React Tutorial",
        description: "Hooks and navigation concepts",
        status: "Completed",
        category: "Personal",
    },
    {
        id: 9,
        title: "Edit Comedy Video",
        description: "Trim clips and add subtitles",
        status: "In Progress",
        category: "Work",
    },
    {
        id: 10,
        title: "Pay Electricity Bill",
        description: "Due before weekend",
        status: "Pending",
        category: "Personal",
    },
    {
        id: 11,
        title: "Upload YouTube Short",
        description: "Post today's comedy reel",
        status: "Completed",
        category: "Work",
    },
    {
        id: 12,
        title: "Clean Workspace",
        description: "Organize desk and cables",
        status: "Pending",
        category: "Personal",
    },
    {
        id: 13,
        title: "Fix Login Bug",
        description: "Resolve authentication issue",
        status: "In Progress",
        category: "Work",
    },
    {
        id: 14,
        title: "Read Atomic Habits",
        description: "Finish 2 chapters",
        status: "Completed",
        category: "Personal",
    },
    {
        id: 15,
        title: "Record Voice Over",
        description: "Comedy dubbing for next video",
        status: "Pending",
        category: "Work",
    },
    {
        id: 16,
        title: "Go for Evening Walk",
        description: "30 minute walk in park",
        status: "Completed",
        category: "Personal",
    },
    {
        id: 17,
        title: "Design Thumbnail",
        description: "Create YouTube thumbnail",
        status: "In Progress",
        category: "Work",
    },
    {
        id: 18,
        title: "Call Friend",
        description: "Discuss weekend plans",
        status: "Pending",
        category: "Personal",
    },
    {
        id: 19,
        title: "Backup Project Files",
        description: "Upload latest files to drive",
        status: "Completed",
        category: "Work",
    },
    {
        id: 20,
        title: "Practice JavaScript",
        description: "Array methods and hooks",
        status: "In Progress",
        category: "Personal",
    },
];

const TaskCard = ({ task }) => {
    return (
        <HStack
            h={75}
            w={"100%"}
            bg={"#444444"}
            mb={4}
            alignItems={"center"}
            px={5}
            borderRadius={10}
        >
            <Box
                borderRadius={25}
                borderWidth={1}
                borderColor={task.status === "Completed" ? "#809CFF" : "#ffffff"}
                bg={task.status === "Completed" ? "#809CFF" : "#ffffff"}
                justifyContent={"center"}
                alignItems={"center"}
                color={"white"}
                h={5}
                w={5}
            />

            <HStack
                flex={1}
                alignItems={"center"}
                justifyContent={"space-between"}
                ml={4}
            >
                <VStack flex={1}>
                    <Text
                        fontSize={16}
                        fontWeight={"bold"}
                        color={"white"}
                    >
                        {task.title}
                    </Text>

                    <Text color={"gray.200"} fontSize={14}>
                        {task.description}
                    </Text>
                </VStack>

                <Text
                    color={
                        task.category === "Work"
                            ? "#809CFF"
                            : "#FFD43B"
                    }
                    fontSize={14}
                >
                    {task.category}
                </Text>
            </HStack>
        </HStack>
    );
};

export const HomeScreen = () => {
    const [search, setSearch] = useState("");
    const sheetRef = useRef(false);
    const [isOpen, setIsOpen] = useState(false);

    const filteredTasks = useMemo(() => {
        const searchText = search.toLowerCase();

        return TASKS.filter((item) => {
            return (
                item.title.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText)
            );
        });
    }, [search]);

    const pendingTasks = useMemo(() => {
        return filteredTasks.filter(
            (item) => item.status !== "Completed"
        );
    }, [filteredTasks]);

    const completedTasks = useMemo(() => {
        return filteredTasks.filter(
            (item) => item.status === "Completed"
        );
    }, [filteredTasks]);

    useEffect(
        () => {
            setTimeout(() => {
                setIsOpen(false)
            }, 3000);
        }, [isOpen]
    )

    return (
        <>
            {TASKS.length === 0 ? (
                <Box
                    flex={1}
                    alignItems={"center"}
                    justifyContent={"center"}
                    bg={"#000000"}
                    px={5}
                >
                    <NoTask width={300} height={220} />

                    <Text fontSize={20} color={"white"} mt={5}>
                        What do you want to do today?
                    </Text>

                    <Text fontSize={16} color={"gray.400"}>
                        Tap + to add your tasks
                    </Text>
                </Box>
            ) : (
                <Box flex={1} pt={14} px={6} bg={"#000000"}>
                    <Input
                        value={search}
                        onChangeText={setSearch}
                        placeholder="Search for your task..."
                        placeholderTextColor={"#999"}
                        color={"white"}
                        borderWidth={1}
                        borderColor={"#ffffff"}
                        borderRadius={10}
                        fontSize={16}
                        h={50}
                        InputLeftElement={
                            <Box pl={3}>
                                <Search width={22} height={22} />
                            </Box>
                        }
                        _focus={{
                            borderColor: "#809CFF",
                            backgroundColor: "#000000",
                            _stack: {
                                style: {
                                    outlineWidth: 0,
                                    boxShadow: "none",
                                },
                            },
                        }}
                    />

                    <Box flex={1} mt={5}>

                        {/* Pending Tasks */}
                        {pendingTasks.length > 0 && (
                            <Box flex={1}>
                                <Box
                                    h={31}
                                    w={90}
                                    bg={"#444444"}
                                    borderRadius={6}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    mb={4}
                                >
                                    <Text color={"white"} fontSize={12}>
                                        Pending
                                    </Text>
                                </Box>

                                <FlatList
                                    data={pendingTasks}
                                    keyExtractor={(item) =>
                                        item.id.toString()
                                    }
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TaskCard task={item} />
                                    )}
                                />
                            </Box>
                        )}

                        {/* Completed Tasks */}
                        {completedTasks.length > 0 && (
                            <Box flex={1} mt={4}>
                                <Box
                                    h={31}
                                    w={90}
                                    bg={"#444444"}
                                    borderRadius={6}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    mb={4}
                                >
                                    <Text color={"white"} fontSize={12}>
                                        Completed
                                    </Text>
                                </Box>

                                <FlatList
                                    data={completedTasks}
                                    keyExtractor={(item) =>
                                        item.id.toString()
                                    }
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item }) => (
                                        <TaskCard task={item} />
                                    )}
                                />
                            </Box>
                        )}

                        {/* Empty Search Result */}
                        {pendingTasks.length === 0 &&
                            completedTasks.length === 0 && (
                                <Box
                                    flex={1}
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                >
                                    <Text
                                        color={"gray.400"}
                                        fontSize={16}
                                    >
                                        No tasks found
                                    </Text>
                                </Box>
                            )}
                    </Box>
                </Box>
            )}
            {/* <Box h={50} w={50} borderRadius={25} position={'absolute'} bottom={10} right={10} bg={'red.500'} >
                <Text>+</Text>
            </Box> */}
            <Pressable onPress={() => setIsOpen(true)}>
                <Circle
                    h={50}
                    w={50}
                    position={'absolute'}
                    bottom={10}
                    right={10}
                    bg={'#809CFF'}
                >
                    <Text fontSize={30}>+</Text>
                </Circle>
            </Pressable>
            <Modal visible={isOpen} transparent={true} animationType="fade" >
                <Box flex={1} w={'100%'} justifyContent={"center"} alignItems={"center"} bg={'rgba(0,0,0,0.5)'}>
                    <Box h={500} w={'100%'} bg={'yellow.500'}></Box>
                </Box>
            </Modal>
        </>
    );
};