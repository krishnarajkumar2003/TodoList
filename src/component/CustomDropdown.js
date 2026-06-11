import React, { useEffect, useRef, useState } from "react";
import {
    Modal,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from "react-native";

import { CustomInput } from "./CustomInput";

export const CustomDropdown = ({
    isOpen,
    onClose,
    addTask,
    selectedTask
}) => {
    const titleRef = useRef(null);
    const desRef = useRef(null);

    // Initialized cleanly with empty strings to avoid uncontrolled-to-controlled input errors
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setTitle(selectedTask?.title || '');
            setDescription(selectedTask?.description || '');
            setTitleError('');
            setDescriptionError('');
        }
    }, [selectedTask, isOpen]);

    // Fast-typing safe handlers (removed active conditional state settings during input stream)
    const onChangeTitle = (text) => {
        setTitle(text);
        if (titleError) setTitleError('');
    };

    const onChangeDescription = (text) => {
        setDescription(text);
        if (descriptionError) setDescriptionError('');
    };

    const submitTask = () => {
        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        let hasError = false;

        if (!trimmedTitle) {
            setTitleError('Please enter title');
            hasError = true;
        }
        if (!trimmedDescription) {
            setDescriptionError('Please enter description');
            hasError = true;
        }

        if (hasError) return;

        // Preserve original task structure (like id and isRead) if editing
        const task = {
            ...selectedTask,
            title: trimmedTitle,
            description: trimmedDescription
        };

        addTask(task);
        closeSheet();
    };

    const closeSheet = () => {
        Keyboard.dismiss();
        onClose();
        setTitle('');
        setDescription('');
        setTitleError('');
        setDescriptionError('');
    };

    return (
        <Modal
            visible={isOpen}
            transparent={true}
            animationType="slide"
            onRequestClose={closeSheet}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                    >
                        <View
                            style={{
                                width: "100%",
                                backgroundColor: "#363636",
                                paddingHorizontal: 25,
                                paddingVertical: 25,
                                borderTopLeftRadius: 20,
                                borderTopRightRadius: 20,
                            }}
                        >
                            <Text style={{ color: "white", fontSize: 16, fontWeight: '600' }}>
                                {selectedTask ? "Edit Task" : "Add Task"}
                            </Text>

                            <View style={{ marginTop: 15, gap: 10 }}>
                                <CustomInput
                                    ref={titleRef}
                                    placeHolder={"Title"}
                                    onChange={onChangeTitle}
                                    value={title}
                                />

                                {titleError ? (
                                    <Text style={{ fontSize: 14, color: '#cd5454', marginTop: -4 }}>
                                        {titleError}
                                    </Text>
                                ) : null}

                                <CustomInput
                                    ref={desRef}
                                    placeHolder={"Description"}
                                    onChange={onChangeDescription}
                                    value={description}
                                />

                                {descriptionError ? (
                                    <Text style={{ fontSize: 14, color: '#cd5454', marginTop: -4 }}>
                                        {descriptionError}
                                    </Text>
                                ) : null}

                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        marginTop: 15
                                    }}
                                >
                                    <TouchableOpacity
                                        onPress={closeSheet}
                                        style={{
                                            height: 50,
                                            width: "45%",
                                            backgroundColor: "#cd5454",
                                            borderRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: "white", fontWeight: '500' }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={submitTask}
                                        style={{
                                            height: 50,
                                            width: "45%",
                                            backgroundColor: "#8687E7",
                                            borderRadius: 10,
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text style={{ fontSize: 16, color: "white", fontWeight: '500' }}>
                                            {selectedTask ? "Save changes" : "Add task"}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};