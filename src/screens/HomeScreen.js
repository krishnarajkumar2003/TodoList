import { useMemo, useRef, useState } from "react";
import {
    SectionList,
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
import { useSelector, useDispatch } from "react-redux";

// FIXED: Cleaned up relative pathing to point accurately to your store directory
import { addTask, deleteTask, markAsRead, updateTask } from '../store/slices/TaskSlice';

export const HomeScreen = () => {
    const todos = useSelector(
        state => state.todo.tasks
    );

    const dispatch = useDispatch();

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

    // Filter & separate tasks into clean section data arrays
    const { activeTasks, completedTasks } = useMemo(() => {
        const query = search.toLowerCase();
        
        const matchedTasks = todos.filter((task) => {
            return (
                task.title?.toLowerCase().includes(query) ||
                task.description?.toLowerCase().includes(query)
            );
        });

        return {
            activeTasks: matchedTasks.filter(task => !task.isRead),
            completedTasks: matchedTasks.filter(task => task.isRead)
        };
    }, [todos, search]);

    const totalFilteredCount = activeTasks.length + completedTasks.length;
    const addMyTask = (task) => {
        if(task.id){
            dispatch(updateTask(task))
        }else{
            dispatch(addTask(task));
        }
    };

    // EDIT
    const editMyTask = (id) => {
        const task = todos.find(item => item.id === id);
        setSelectedTask(task);
        setIsOpen(true);
    };

    // DELETE
    const deleteMyTask = (id) => {
        dispatch(deleteTask(id));
    };

    // TOGGLE READ STATUS
    const toggleMarkAsRead = (id) => {
        dispatch(markAsRead(id));
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
                <TouchableOpacity onPress={() => toggleMarkAsRead(item.id)}>
                    <DoneIcon width={30} height={24} style={item.isRead ? { opacity: 0.4 } : {}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editMyTask(item.id)}>
                    <EditIcon width={30} height={24} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteMyTask(item.id)}>
                    <RemoveIcon width={30} height={24} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <>
            <View style={[styles.screen, todos.length === 0 && styles.noTask]}>
                {todos.length === 0 ? (
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
                            /* FIXED: Replaced nested sub-FlatLists with a unified, high-performance SectionList */
                            <SectionList
                                sections={[
                                    { title: `Active Tasks (${activeTasks.length})`, data: activeTasks },
                                    { title: `Completed Tasks (${completedTasks.length})`, data: completedTasks }
                                ]}
                                keyExtractor={(item) => item.id}
                                renderItem={renderTaskItem}
                                renderSectionHeader={({ section: { title, data } }) => 
                                    data.length > 0 ? (
                                        <Text style={styles.sectionHeader}>{title}</Text>
                                    ) : null
                                }
                                stickySectionHeadersEnabled={false}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.mainListsWrapper}
                            />
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
                addTask={addMyTask}
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
        paddingTop: 15,
        paddingBottom: 40
    },
    sectionHeader: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '700',
        marginTop: 10,
        marginBottom: 15,
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