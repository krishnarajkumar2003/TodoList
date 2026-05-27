import React, { useRef, useState } from 'react';
import { Dimensions } from 'react-native';

import {
    Box,
    FlatList,
    Text,
    Button,
    HStack,
} from 'native-base';

import On1 from '../../assets/on1.svg';
import On2 from '../../assets/on2.svg';
import On3 from '../../assets/on3.svg';

const { width } = Dimensions.get('window');

export const OnboardingScreen = ({ navigation }) => {

    const onboardingData = [
        {
            id: '1',
            ImageComponent: On1,
            title: 'Manage your tasks',
            description: 'You can easily manage all of your daily tasks in DoMe for free',
        },
        {
            id: '2',
            ImageComponent: On2,
            title: 'Create daily routine',
            description: 'In DoMe you can create your personalized routine to stay productive',
        },
        {
            id: '3',
            ImageComponent: On3,
            title: 'Organize your tasks', // Fixed typo 'Orgnaize'
            description: 'You can organize your daily tasks by dividing your tasks into separate categories',
        },
    ];

    const flatListRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        // Changed 'images' to 'onboardingData'
        if (currentIndex < onboardingData.length - 1) {
            const nextIndex = currentIndex + 1;

            flatListRef.current?.scrollToIndex({
                index: nextIndex,
                animated: true,
            });

            setCurrentIndex(nextIndex);
        } else {
            // Optional: Handle what happens when they hit NEXT on the last page
            navigation.navigate('Home');
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;

            flatListRef.current?.scrollToIndex({
                index: prevIndex,
                animated: true,
            });

            setCurrentIndex(prevIndex);
        }
    };

    const handleSkip = () => {
        // Changed 'images' to 'onboardingData'
        if (currentIndex >= 0 && currentIndex <= onboardingData.length - 1) {
            navigation.navigate('Splash');
        }
    };

    return (
        <Box flex={1} bg="#000000" pt={14}>

            {/* Skip */}
            <Text 
                onPress={handleSkip}
                color="gray.400"
                fontSize="lg"
                px={6}
            >
                SKIP
            </Text>

            {/* Slider Wrapper Box to cleanly manage the dynamic map heights layout */}
            <Box flex={1} justifyContent="center">
                <FlatList
                    ref={flatListRef}
                    data={onboardingData}
                    horizontal
                    pagingEnabled
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id} // Cleaned up keyExtractor
                    getItemLayout={(_, index) => ({ // Optimizes scrollToIndex performance
                        length: width,
                        offset: width * index,
                        index,
                    })}
                    renderItem={({ item }) => {
                        // Destructuring your mapped data objects cleanly here
                        const { ImageComponent, title, description } = item;
                        return (
                            <Box
                                width={width}
                                alignItems="center"
                                px={6}
                            >
                                <ImageComponent width={300} height={300} />

                                {/* Dynamic Title */}
                                <Text
                                    color="white"
                                    fontSize="4xl"
                                    fontWeight="bold"
                                    mt={10}
                                    textAlign="center"
                                >
                                    {title}
                                </Text>

                                {/* Dynamic Description */}
                                <Text
                                    color="gray.300"
                                    textAlign="center"
                                    mt={4}
                                    px={4}
                                    fontSize="lg"
                                >
                                    {description}
                                </Text>
                            </Box>
                        );
                    }}
                />
            </Box>

            {/* Indicator */}
            <HStack
                justifyContent="center"
                alignItems="center"
                space={2}
                mt={4} // Tightens the gap visual below your text strings
                mb={10}
            >
                {/* Changed 'images' to 'onboardingData' */}
                {onboardingData.map((_, index) => (
                    <Box
                        key={index}
                        w={currentIndex === index ? 6 : 2}
                        h={2}
                        bg={currentIndex === index ? 'white' : 'gray.500'}
                        rounded="full"
                    />
                ))}
            </HStack>

            {/* Buttons */}
            <Box
                flexDirection="row"
                justifyContent="space-between"
                alignItems="center"
                px={6}
                pb={10}
            >
                <Text
                    color={currentIndex === 0 ? "transparent" : "gray.400"} // Hidden if on page 1
                    fontSize="2xl"
                    onPress={handleBack}
                    disabled={currentIndex === 0}
                >
                    BACK
                </Text>

                <Button
                    bg="#8875FF"
                    px={10}
                    py={3}
                    rounded="lg"
                    onPress={handleNext}
                >
                    {currentIndex === onboardingData.length - 1 ? 'GET STARTED' : 'NEXT'}
                </Button>
            </Box>

        </Box>
    );
};