import Navbar from '../components/Navbar/Navbar';
import NoteCard from '../components/Cards/NoteCard';
import { MdAdd } from 'react-icons/md';
import EditContent from '../components/EditContent';
import { useState } from 'react';
import Modal from 'react-modal';

const Home = () => {
    const [openEditModal, setOpenEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    return (
        <>
            <Navbar />

            <div className="container mx-auto pt-24 px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                    <NoteCard title="Submit on 25 Nov" date="25 Nov" content="Meeting on 25 Nov" tags="#Meeting" isPinned={true} />

                </div>
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
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] max-h-[75vh] bg-white rounded-md p-5 outline-none shadow-lg"
            >
                <EditContent
                    type={openEditModal.type}
                    noteData={openEditModal.data}
                    onClose={() => {
                        setOpenEditModal({ isShown: false, type: "add", data: null })
                    }} />
            </Modal>
        </>
    )
}

export default Home
