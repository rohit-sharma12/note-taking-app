import Navbar from '../components/Navbar/Navbar';
import NoteCard from '../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import EditContent from '../components/EditContent';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Home = () => {
    const [openEditModal, setOpenEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    const [userInfo, setUserInfo] = useState(null);
    const [allNotes, setAllNotes] = useState([]);
    const [isSearch, setIsSearch] = useState(false);

    const navigate = useNavigate();

    const handleEdit = (noteDetails) => {
        setOpenEditModal({ isShown: true, data: noteDetails, type: "edit" })
    }

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get('/api/user/get-user');
            if (response.data && response.data.user) {
                setUserInfo(response.data.user)
            }
        } catch (error) {
            if (error.response.status === 401) {
                localStorage.clear();
                navigate("/login")
            }
        }
    };

    const getAllNotes = async () => {
        try {
            const response = await axiosInstance.get("/api/note/get-all-notes")
            if (response.data && response.data.notes) {
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("An unexpected error occurred.Please try again.");

        }
    }

    const deleteNote = async (data) => {
        const noteId = data._id
        try {
            const response = await axiosInstance.delete("/api/note/delete-note/" + noteId);
            if (response.data && !response.data.error) {
                getAllNotes()
            }
        } catch (error) {
            console.log("An unexpected error occurred.Please try again.");
        }
    }

    const onSearchNote = async (query) => {
        try {
            const response = await axiosInstance.get("/api/note/search-notes", {
                params: { query },
            });
            if (response.data && response.data.notes) {
                setIsSearch(true);
                setAllNotes(response.data.notes);
            }
        } catch (error) {
            console.log("An unexpected error occurred.Please try again.");
        }
    }

    const handleClearSearch = () => {
        setIsSearch(false);
        getAllNotes();
    }

    const updateIsPinned = async (noteData) => {
        const noteId = noteData._id;
        try {
            const response = await axiosInstance.put(
                `/api/note/update-note-pinned/${noteId}`,
                {
                    isPinned: !noteData.isPinned,
                }
            );

            if (response.data && response.data.note) {
                getAllNotes();
            }

        } catch (error) {
            console.log("An unexpected error occurred. Please try again.", error);
        }
    }

    useEffect(() => {
        getUserInfo();
        getAllNotes();
        return () => { };
    }, []);

    return (
        <>
            <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />

            <div className="container mx-auto pt-24 px-4">
                {allNotes.length > 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                        {allNotes?.map((item, index) => (
                            <NoteCard key={item._id} title={item.title} date={item.createdAt} content={item.content} tags={item.tag} isPinned={true}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => deleteNote(item)}
                                onPinNote={() => updateIsPinned(item)}
                            />
                        ))}


                    </div> :
                    "Build Cards Here"}
            </div>

            <button className='w-14 h-14 flex items-center justify-center cursor-pointer rounded-2xl bg-blue-500 hover:bg-blue-600 absolute right-10 bottom-10' onClick={() => { }}>
                <MdAdd className='text-[32px] text-white' onClick={() => setOpenEditModal({ isShown: true, type: "add", data: null })} />
            </button>

            <Modal
                isOpen={openEditModal.isShown}
                onRequestClose={() => openEditModal.hide()}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)",
                    },
                }}
                contentLabel="Edit Modal"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] max-h-[80vh] bg-white rounded-md p-5 outline-none shadow-lg"
            >
                <EditContent
                    type={openEditModal.type}
                    noteData={openEditModal.data}
                    onClose={() => {
                        setOpenEditModal({ isShown: false, type: "add", data: null })
                    }}
                    getAllNotes={getAllNotes}
                />
            </Modal>

        </>
    )
}

export default Home
