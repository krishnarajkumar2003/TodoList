import { useMemo, useRef, useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

import NoTask from '../../assets/no_task.svg';
import AddIcon from '../../assets/add.svg';
import RemoveIcon from '../../assets/remove.svg';
import EditIcon from '../../assets/edit.svg';
import DoneIcon from '../../assets/ok.svg';

import { CustomDropdown } from "../component/CustomDropdown";
import { CustomInput } from "../component/CustomInput";

export const HomeScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);

    const searchRef = useRef(null);

    const openTaskSheet = () => {
        setIsOpen((prev) => !prev);
        if (isOpen) {
            setSelectedTask(null);
        }
    };

    // ADD / EDIT TASK
    const addTask = (task) => {
        if (task.id) {
            setTasks((prevTasks) =>
                prevTasks.map((item) =>
                    item.id === task.id ? task : item
                )
            );
        } else {
            const newTask = {
                ...task,
                id: Date.now().toString(),
                isRead: false
            };
            setTasks((prevTasks) => [...prevTasks, newTask]);
        }
    };

    // 1. FIRST FILTER & SPLIT TASKS HERE
    const { activeTasks, completedTasks } = useMemo(() => {
        const query = search.toLowerCase();
        
        // Filter base array by search query first
        const matchedTasks = tasks.filter((task) => {
            return (
                task.title?.toLowerCase().includes(query) ||
                task.description?.toLowerCase().includes(query)
            );
        });

        // Split into separate independent datasets
        return {
            activeTasks: matchedTasks.filter(task => !task.isRead),
            completedTasks: matchedTasks.filter(task => task.isRead)
        };
    }, [tasks, search]);

    const totalFilteredCount = activeTasks.length + completedTasks.length;

    // EDIT
    const editTask = (id) => {
        const task = tasks.find((item) => item.id === id);
        setSelectedTask(task);
        setIsOpen(true);
    };

    // DELETE
    const deleteTask = (id) => {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
        );
    };

    // TOGGLE READ STATUS
    const toggleMarkAsRead = (id, currentStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, isRead: !currentStatus } : task
            )
        );
    };

    // REUSABLE CLEAN ITEM RENDERER
    const renderTaskItem = ({ item }) => (
        <View style={styles.taskCard}>
            <View style={styles.taskInfoContainer}>
                <View style={[styles.checkbox, item.isRead && styles.checkboxCompleted]} />
                <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={[styles.taskTitle, item.isRead && styles.textCompleted]}>
                        {item.title}
                    </Text>
                    <Text numberOfLines={1} style={[styles.taskDescription, item.isRead && styles.textCompleted]}>
                        {item.description}
                    </Text>
                </View>
            </View>

            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity onPress={() => toggleMarkAsRead(item.id, item.isRead)}>
                    <DoneIcon width={30} height={24} style={item.isRead ? { opacity: 0.4 } : {}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editTask(item.id)}>
                    <EditIcon width={30} height={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <RemoveIcon width={30} height={24} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <View style={[styles.screen, tasks.length === 0 && styles.noTask]}>
                {tasks.length === 0 ? (
                    <View style={styles.noTaskContainer}>
                        <NoTask width={300} height={300} />
                        <Text style={[styles.noTaskText, { fontSize: 20 }]}>
                            What do you want to do today?
                        </Text>
                        <Text style={[styles.noTaskText, { paddingTop: 10, fontSize: 16 }]}>
                            Tap + to add your tasks
                        </Text>
                    </View>
                ) : (
                    <>
                        <CustomInput
                            ref={searchRef}
                            onChange={setSearch}
                            placeHolder={"Search task"}
                            value={search}
                        />

                        {totalFilteredCount === 0 && search !== '' ? (
                            <View style={[styles.noTaskContainer, { flex: 1 }]}>
                                <NoTask width={300} height={300} />
                                <Text style={[styles.noTaskText, { fontSize: 20 }]}>
                                    No match found
                                </Text>
                            </View>
                        ) : (
                            <View style={styles.mainListsWrapper}>
                                
                                {/* ACTIVE TASKS LIST */}
                                {activeTasks.length > 0 && (
                                    <View style={styles.listContainer}>
                                        <Text style={styles.sectionHeader}>Active Tasks ({activeTasks.length})</Text>
                                        <FlatList
                                            data={activeTasks}
                                            keyExtractor={(item) => item.id}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={renderTaskItem}
                                        />
                                    </View>
                                )}

                                {/* COMPLETED TASKS LIST */}
                                {completedTasks.length > 0 && (
                                    <View style={styles.listContainer}>
                                        <Text style={styles.sectionHeader}>Completed Tasks ({completedTasks.length})</Text>
                                        <FlatList
                                            data={completedTasks}
                                            keyExtractor={(item) => item.id}
                                            showsVerticalScrollIndicator={false}
                                            renderItem={renderTaskItem}
                                        />
                                    </View>
                                )}
                                
                            </View>
                        )}
                    </>
                )}
            </View>

            <TouchableOpacity style={styles.addButton} onPress={openTaskSheet}>
                <AddIcon width={32} height={32} />
            </TouchableOpacity>

            <CustomDropdown
                isOpen={isOpen}
                onClose={openTaskSheet}
                addTask={addTask}
                selectedTask={selectedTask}
            />
        </>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: 20
    },
    noTask: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noTaskContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    noTaskText: {
        color: '#ffffff'
    },
    mainListsWrapper: {
        flex: 1,
        marginTop: 15,
    },
    listContainer: {
        flexGrow: 0, // Collapses layouts naturally instead of dividing screen 50/50
        marginBottom: 20,
    },
    sectionHeader: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 10,
        textTransform: 'uppercase',
        letterSpacing: 1
    },
    addButton: {
        position: 'absolute',
        height: 64,
        width: 64,
        backgroundColor: '#8687E7',
        bottom: 100,
        right: 20,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    taskCard: {
        minHeight: 72,
        width: '100%',
        backgroundColor: '#363636',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 12,
        marginBottom: 12,
        justifyContent: 'space-between'
    },
    taskInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        flex: 1
    },
    checkbox: {
        height: 16,
        width: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ffffff'
    },
    checkboxCompleted: {
        backgroundColor: '#8687E7',
        borderColor: '#8687E7'
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    taskTitle: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16
    },
    taskDescription: {
        color: '#afacac',
        marginTop: 4
    },
    textCompleted: {
        textDecorationLine: 'line-through',
        opacity: 0.5
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
});